const ShopItemSchema = require("../models/shopItem");

const getAllShopItems = async () => {
  try {
    const shopItems = await ShopItemSchema.find().sort({
      createdAt: -1,
    });
    return shopItems;
  } catch (error) {
    throw error;
  }
};

const getShopItem = async (id) => {
  try {
    const shopItem = await ShopItemSchema.find({ _id: id }).exec();
    return shopItem;
  } catch (error) {
    throw error;
  }
};

const createShopItem = async (body) => {
  const shopItem = new ShopItemSchema(body);
  try {
    await shopItem.save();
    return shopItem;
  } catch (error) {
    throw error;
  }
};

const updateShopItem = async (id, body) => {
  try {
    const shopItem = await ShopItemSchema.findOneAndUpdate(
      { _id: id },
      {
        ...body,
      }
    );
    return shopItem;
  } catch (error) {
    throw error;
  }
};

const deleteShopItem = async (id) => {
  try {
    const shopItem = await ShopItemSchema.findOneAndDelete({
      _id: id,
    });
    return shopItem;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllShopItems,
  getShopItem,
  createShopItem,
  updateShopItem,
  deleteShopItem,
};
