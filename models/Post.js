const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  url: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String
  },
  saved: {
    type: Boolean
  },
  note: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Note"
  }
});

// This creates our model from the above schema, using mongoose's model method
var Post = mongoose.model("Post", PostSchema);

// Export the Article model
module.exports = Post;
