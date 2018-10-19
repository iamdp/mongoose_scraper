// Express & Express-Handlebars
const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config();

// Scraping tools
const axios = require("axios");
const cheerio = require("cheerio");

// Mongoose
const mongoose = require("mongoose");
const db = require("./models");
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true }
);

// Config
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true })); // Parse request body as JSON
app.use(express.json());
app.use(express.static("public")); // Make public a static folder

// --------------------- Routes ---------------------
app.get("/scrape", (req, res) => {
  const url =
    "https://www.kijiji.ca/b-gta-greater-toronto-area/ikea/k0l1700272?dc=true";
  const prefixUrl = "https://www.kijiji.ca";
  let post = [];

  axios.get(url).then(response => {
    const $ = cheerio.load(response.data);

    $(".search-item").each((index, element) => {
      post.push({
        title: $(element)
          .find(".title a")
          .text()
          .trim(),
        url:
          prefixUrl +
          $(element)
            .find(".title a")
            .attr("href"),
        description: $(element)
          .find(".description")
          .text()
          .trim(),
        imgUrl: $(element)
          .find(".image img")
          .attr("src"),
        saved: false
      });
    });

    db.Post.create(post)
      .then(dbPost => {
        console.log(dbPost);
      })
      .catch(error => {
        console.log(error);
      });

    res.send("Scrape Complete");
  });
});

app.get("/getPosts", (req, res) => {
  db.Post.find({})
    .then(dbPost => {
      res.json(dbPost);
    })
    .catch(error => {
      res.json(err);
    });
});

app.get("/getSavedPosts", (req, res) => {
  db.Post.find({ saved: true })
    .then(dbPost => {
      res.json(dbPost);
    })
    .catch(error => {
      res.json(err);
    });
});

app.post("/savePost/:postId", function(req, res) {
  db.Post.findByIdAndUpdate(
    req.params.postId,
    { saved: true },
    { new: true },
    (err, response) => {
      if (err) res.send(err);
      res.send(response);
    }
  );
});

app.get("/getNote/:postId", (req, res) => {
  db.Post.findById(req.params.postId)
    .populate("note")
    .then(dbPost => {
      res.json(dbPost);
    })
    .catch(error => {
      res.json(err);
    });
});

app.post("/saveNote/:postId", function(req, res) {
  console.log("body:", req.body);
  db.Note.create(req.body)
    .then(function(dbNote) {
      return db.Post.findByIdAndUpdate(
        req.params.postId,
        { note: dbNote._id },
        { new: true }
      );
    })
    .then(function(dbPost) {
      // If we were able to successfully update an Article, send it back to the client
      res.json(dbPost);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

app.get("/", (req, res) => {
  db.Post.find({ saved: false })
    .then(dbPost => {
      res.render("scraped", dbPost);
    })
    .catch(error => {
      res.json(err);
    });
});

app.get("/viewSavedPosts", (req, res) => {
  db.Post.find({ saved: true })
    .populate("note")
    .then(dbPost => {
      res.render("saved", dbPost);
    })
    .catch(error => {
      res.json(err);
    });
});
// --------------------- Routes ---------------------

app.listen(port, () => console.log("App started, listening on port " + port));
