const express=require("express");
const app=express();
const path=require("path");

const { v4 : uuidv4 }= require('uuid');

const methodOverride=require("method-override");
app.use(methodOverride("_method"));

app.use(express.urlencoded({extended: true}));


app.set("view engine","ejs");
app.set("views",path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts=[
   {
     username: "rishav",
     content:  "this is about mahanta",
     id: uuidv4()
   },
   {
     username: "raghav",
     content:  "this is about bachpana",
     id: uuidv4()
   },
   {
     username: "ritik",
     content:  "this is about bodmaash",
     id: uuidv4()
   }
];

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.redirect("/posts"); 
});


app.get("/posts",(req,res)=>{
  res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
  res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
  let {username,content}=req.body;
  let id=uuidv4();
  posts.push({username,content,id});
  res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
  let {id}=req.params;
  let post=posts.find((f)=> id === f.id);
  res.render("show.ejs",{post});
})

app.patch("/posts/:id",(req,res)=>{
  let {id}=req.params;
  let newcontent=req.body.content;

  let post=posts.find((f)=> id === f.id);
  post.content=newcontent;
  console.log(post);
  res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
  let {id}=req.params;
  let post=posts.find((f)=> id === f.id);
  res.render("edit.ejs",{post});
})

app.delete("/posts/:id",(req,res)=>{
  let {id}=req.params;
  posts=posts.filter((f)=> id !== f.id);
  res.redirect("/posts");
})

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
