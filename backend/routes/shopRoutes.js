const express = require("express");
const { verifyToken } = require("../middleware/auth");
const { validateId } = require("../middleware/mongo");
const shopRouter = express.Router();

const shopControler = require("../controllers/shop");

shopRouter.get("/getalllists", async (req, res) => {
  try {
    const shopLists = await shopControler.getAllShopLists();
    res.status(200).json(shopLists);
  } catch {
    res.status(500).json({ error: "Can't get lists." });
  }
});

shopRouter.get("/getlist/:id", validateId, async (req, res) => {
  try {
    const { id } = req.params;
    const shopList = await shopControler.getShopList(id);
    if (!shopList || shopList.length === 0)
      return res.status(404).json({ error: "No such list." });
    res.status(200).json(shopList);
  } catch (error) {
    return res.status(404).json({ error: error });
  }
});

shopRouter.post("/createlist", verifyToken, async (req, res) => {
  console.log(req.body);
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
    const shopList = await shopControler.createShopList({
      name,
      owner,
      image,
      description,
      members,
      items,
      category,
      archived,
    });
    res.status(201).json(shopList);
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
      const shopList = await shopControler.updateShopList(id, {
        name,
        owner,
        image,
        description,
        members,
        items,
        category,
        archived,
      });
      if (!shopList) {
        return res.status(400).json({ error: "No such list" });
      }
      res.status(200).json(shopList);
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
      const shopList = await shopControler.deleteShopList(id);
      if (!shopList)
        return res.status(400).json({ error: "No such list" });
      res.status(200).json(shopList);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }
);

module.exports = shopRouter;
