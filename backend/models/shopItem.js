const mongoose = require("mongoose");

const ShopItemSchema = new mongoose.Schema(
  {
    name: String,
    owner: String,
    image: String,
    description: String,
    members: Array,
    items: Array,
    category: String,
    archived: Boolean,
  },
  {
    timestamps: true,
    collection: "shopitems",
  }
);

const Item = mongoose.model("ShopItem", ShopItemSchema);
module.exports = Item;
