//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "I enjoy recommending a lessor known movie and have people enjoy it. That is why I will spend more space and time on this blog describing the movies that slipped through the theatre system without much fanfare or publicity.";
const aboutContent = "THIS IS A MOVIE BLOG WEBSITE DEVELOPED BY S.REVANTH OF ST.JOSEPH'S COLLEGE OF ENGINEERING AS A PROJECT WITH NODE.JS AND EXPRESS.JS "<br>"(YEAR 2021)";
const contactContent = "S.REVANTH "<br>" This project code is posted in Github : https://github.com/Revanth-7 " <br> " Linkedin Profile:https://www.linkedin.com/in/revanth-s-b48ab7209/";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://test:test123@cluster0.m8x65.mongodb.net/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});
const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("Server started on port");
});
