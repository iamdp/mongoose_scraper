# MongoDB Scraper

## Application Name: **MongoDB Scraper**

### https://rocky-woodland-72637.herokuapp.com/

### App Overview

This app scrapes Kijiji for posts with the term "Ikea". From this list, you can select which posts interest you and save them. Once saved, you can add a note to the saved post.

### App Usage

- To scape/add posts of ads from Kijiji with the term "Ikea", click on "scrape"
- A list of posts will appear.
- Clicking on scrape again will update the posts with recent Kijiji ads.
- Navigate through the posts and click the save button to save posts.
- Click on "View Saved" to see a list of your saved posts.
- When viewing saved posts, you can click the note button to add a note to that post.

### **App Parts**

#### Express Handlebars

##### saved.handlebars

Generates cards for saved posts with option to view/edit notes in the form of a modal.

#### scraped.handlebars

Generates cards for scraped posts with the option to save posts.

#### Mongoose Models

##### Note

One-to-one relationship with post. A note is applied against a post and is a great way to add comments about a post.

##### Post

A post is the apps representation of a Kijiji post.

#### server.js

Contains the server, routes and app logic.

## Built Using

- [NodeJS](https://nodejs.org/en/)
- [Materialize CSS](https://materializecss.com/)
- Node Packages
  - [express](https://www.npmjs.com/package/express)
  - [express-handlebars](https://www.npmjs.com/package/express-handlebars)
  - [mongoose](https://mongoosejs.com/)
  - [axios](https://www.npmjs.com/package/axios/)
  - [cheerio](https://www.npmjs.com/package/cheerio)
  - [dotenv](https://www.npmjs.com/package/dotenv)

## Author

David Pham - email@davidpham.ca
