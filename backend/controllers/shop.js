const ShopItemSchema = require("../models/shopItem");

const getAllShopLists = async () => {
  try {
    const shopItems = await ShopItemSchema.find();
    return shopItems;
  } catch (error) {
    throw error;
  }
};

const getShopList = async (id) => {
  try {
    const shopItem = await ShopItemSchema.find({ _id: id });
    return shopItem;
  } catch (error) {
    throw error;
  }
};

const createShopList = async (body) => {
  const shopItem = new ShopItemSchema(body);
  try {
    await shopItem.save();
    return shopItem;
  } catch (error) {
    throw error;
  }
};

const updateShopList = async (id, body) => {
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

const deleteShopList = async (id) => {
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
  getAllShopLists,
  getShopList,
  createShopList,
  updateShopList,
  deleteShopList,
};
