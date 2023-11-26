const mongoose = require("mongoose");

const ShopItemSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    description: String,
    price: String,
  },
  {
    timestamps: true,
    collection: "shopitems",
  }
);

const Item = mongoose.model("ShopItem", ShopItemSchema);
module.exports = Item;
