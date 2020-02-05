// Product.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Product
let Product = new Schema({
  ProductName: {
    type: String
  },
  ProductDescription: {
    type: String
  },
  ProductPrice: {
    type: Number
  },
  ProductQuantity: {
    type: Number
  }
},{
    collection: 'Product'
});

module.exports = mongoose.model('Product', Product);