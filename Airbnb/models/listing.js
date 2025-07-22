
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  
    image:{
      type:String,
      default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQanXq215lFRh1jgS0NGyJsSrdT7UjUBTzXpQaXPnuPYiyRUVYF78NwLQGolT1AeIG4YLg&usqp=CAU",
       set: (v) =>
      v === ""
        ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQanXq215lFRh1jgS0NGyJsSrdT7UjUBTzXpQaXPnuPYiyRUVYF78NwLQGolT1AeIG4YLg&usqp=CAU"
        : v,
     },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
