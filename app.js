const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect('mongodb+srv://triloki35:triloki35@cluster0.1fz6j.mongodb.net/blogDB');

const  postSchema= new mongoose.Schema({
    title: String,
    post : String
});

const  Post = mongoose.model('Post', postSchema);

const homeContent = "Welcome to DairyBook.";
const aboutContent = "This is a daily journal web app . Techonolgy used for creating this web app are HTML , CSS , Bootstrap , Node.js and mongoDB cloud services(Atlas).";
const contactContent = "";


app.get("/", function (req, res) {
    Post.find({},function(err,foundPost){
        if(err)
        console.log(err);
        else
        res.render("home", { HOMECONTENT: homeContent, POSTS: foundPost});
    })
});


app.get("/about", function (req, res) {
    res.render("about", { ABOUTCONTENT: aboutContent });
});


app.get("/contact", function (req, res) {
    res.render("contact", { CONTACTCONTENT: contactContent });
});


app.get("/compose", function (req, res) {
    res.render("compose");
});


app.post("/compose", function (req, res) {
    const newpost = new Post({ 
        title: _.capitalize(req.body.title),
        post: _.capitalize(req.body.post)
    });

    console.log(req.body.post);
    console.log(_.capitalize(req.body.post))

    newpost.save(function(err){
        if(!err)
        res.redirect("/");
    });
})


app.get("/posts/:postname", function (req, res) {

    var titleTobesearched = _.capitalize(req.params.postname);
    // console.log(titleTobesearched);
    Post.find({title:titleTobesearched},function(err,foundPost){
        if(err)
        {
            // res.render("oops",{});
            console.log(err);
        }
        else
        {
            // console.log(foundPost[0].post);
            res.render("posts", { title: foundPost[0].title, post: foundPost[0].post });
        }
    })
})

app.post("/search", function (req, res) {
    // console.log(req);
    var searchTitle = _.capitalize(req.body.searchTitle);
    console.log(searchTitle);
    Post.find({title:searchTitle},function(err,foundPost){
        if(err)
        {
            // res.render("oops",{});
            console.log(err);
        }
        else
        {
            res.render("posts", { title: foundPost[0].title, post: foundPost[0].post });
        }
        
    })
})


app.listen(process.env.PORT||3000, function () {
    console.log("server is running at 3000 port");
});