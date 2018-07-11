const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Product Schema
const ProductSchema = new Schema({
  pname: {
    type: String
  },
  category: {
    type: String
  },
  price: {
    type: String
  },
  quantity: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Product = mongoose.model("products", ProductSchema);
