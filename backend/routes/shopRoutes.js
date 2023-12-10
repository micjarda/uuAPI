const express = require("express");
const { verifyToken } = require("../middleware/auth");
const { validateId } = require("../middleware/mongo");
const shopRouter = express.Router();

const shopControler = require("../controllers/shop");

shopRouter.get("/getalllists", async (req, res) => {
  try {
    const shopItems = await shopControler.getAllShopItems();
    res.status(200).json(shopItems);
  } catch {
    res.status(500).json({ error: "Can't get items." });
  }
});

shopRouter.get("/getlist/:id", validateId, async (req, res) => {
  try {
    const { id } = req.params;
    const shopItem = await shopControler.getShopItem(id);
    if (!shopItem || shopItem.length === 0)
      return res.status(404).json({ error: "No such item." });
    res.status(200).json(shopItem);
  } catch (error) {
    return res.status(404).json({ error: error });
  }
});

shopRouter.post("/createlist", verifyToken, async (req, res) => {
  console.log(req.body)
  const {
    name,
    owner,
    image,
    description,
    members,
    items,
    category,
    archived,
  } = req.body;
  try {
    const shopItem = await shopControler.createShopItem({
      name,
      owner,
      image,
      description,
      members,
      items,
      category,
      archived,
    });
    res.status(201).json(shopItem);
  } catch (error) {
    res.status(500).json({ error: "chyba" });
  }
});

shopRouter.put(
  "/updatelist/:id",
  verifyToken,
  validateId,
  async (req, res) => {
    const { id } = req.params;
    const {
      name,
      owner,
      image,
      description,
      members,
      items,
      category,
      archived,
    } = req.body;
    try {
      const shopItem = await shopControler.updateShopItem(id, {
        name,
        owner,
        image,
        description,
        members,
        items,
        category,
        archived,
      });
      if (!shopItem) {
        return res.status(400).json({ error: "No such item" });
      }
      res.status(200).json(shopItem);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }
);

shopRouter.delete(
  "/deletelist/:id",
  verifyToken,
  validateId,
  async (req, res) => {
    const { id } = req.params;
    try {
      const shopItem = await shopControler.deleteShopItem(id);
      if (!shopItem)
        return res.status(400).json({ error: "No such item" });
      res.status(200).json(shopItem);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }
);

module.exports = shopRouter;
