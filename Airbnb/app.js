const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");


app.set("view engine" ,"ejs");
app.set("views" , path.join(__dirname,"views"));
app.use(express.urlencoded({extended :true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")))

main().then(()=>{
  console.log("Connected to MongoDB");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


app.get("/" , (req , res) => {
  res.send("Hello World!");
});
 //index route
app.get("/listing",async(req,res) => {
 const allListings = await Listing.find({});
 res.render("../views/listings/index.ejs",{allListings});
})
//New Route
app.get("/listing/new" ,(req,res)=>{
  res.render("../views/listings/new.ejs")
})

//Show route
app.get("/listing/:id" , async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("../views/listings/show.ejs",{listing})
});

//create Route

app.post("/listing",async(req,res)=>{
  // let{tittle,description,image,price,location} = req.body;

  const newListing =new Listing(req.body.listing);
  await newListing.save();
  // console.log(listing);
res.redirect("/listing")
})

//Edit & update 
app.get("/listing/:id/edit" , async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("../views/listings/edit.ejs",{listing})
});

//Update Route
app.put("/listing/:id",async(req,res)=>{
  let {id} = req.params;
 await Listing.findByIdAndUpdate(id,{...req.body.listing});
 res.redirect(`/listing/${id}`);
})

// Delete route
app.delete("/listing/:id",async(req,res)=>{
let {id} = req.params;
let deletelisting = await Listing.findByIdAndDelete(id);
console.log(deletelisting);
res.redirect("/listing");
})
// app.get("/testListing" ,async (req,res)=>{
//      let samplelisting =new Listing({
//       title: "My New Villa",
//       description:"by the beach",
//       price:1200,
//       location:"calanute , goa",
//       country:"India"
//      });

//      await samplelisting.save();
//      console.log("sample was saved")
//      res.send("successful testing")
// })

app.listen(8080 ,() => {
  console.log("server is running on port 8080");
})