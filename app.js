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

const homeContent = "home Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum reprehenderit ipsum officia a nemo, ratione in sed, tempore molestias atque labore eaque fugit fugiat, repellendus consectetur obcaecati accusamus nihil voluptate.";
const aboutContent = "about Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum reprehenderit ipsum officia a nemo, ratione in sed, tempore molestias atque labore eaque fugit fugiat, repellendus consectetur obcaecati accusamus nihil voluptate.";
const contactContent = "contact Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum reprehenderit ipsum officia a nemo, ratione in sed, tempore molestias atque labore eaque fugit fugiat, repellendus consectetur obcaecati accusamus nihil voluptate.";

let posts = [];

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
    // var obj = {
    //     title: req.body.title,
    //     post: req.body.post
    // }
    // posts.push(obj);
    // adding in db 
    const newpost = new Post({ 
        title: req.body.title,
        post:req.body.post
    });

    newpost.save(function(err){
        if(!err)
        res.redirect("/");
    });
    // Post.find(function(err,res){
    //     if(err)
    //     console.log(err);
    //     else
    //     console.log(res);
    // })
})


app.get("/posts/:postname", function (req, res) {

    // for (var i = 0; i < posts.length; i++) {

    //     if (_.lowerCase(req.params.postname) === _.lowerCase(posts[i].title)) {
    //         res.render("posts", { title: posts[i].title, post: posts[i].post });
    //     }
    // }

    Post.find({title:req.params.postname},function(err,foundPost){
        if(err)
        {
            // res.render("oops",{});
            // res.redirect("/");
            console.log(err);
        }
        else
        {
            // console.log(foundPost[0].post);
            res.render("posts", { title: foundPost[0].title, post: foundPost[0].post });
        }
    })
})


app.post("/posts/:postname", function (req, res) {

    Post.find({title:req.params.postname},function(err,foundPost){
        if(err)
        {
            // res.render("oops",{});
            // res.redirect("/");
            console.log(err);
        }
        else
        {
            // console.log(foundPost[0].post);
            res.render("posts", { title: foundPost[0].title, post: foundPost[0].post });
        }
    })

})


app.listen(3000, function () {
    console.log("server is running at 3000 port");
});