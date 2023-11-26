const express = require("express");
const { verifyToken } = require('../middleware/auth');
const shopRouter = express.Router();

const shopControler = require("../controllers/shop");

shopRouter.get("/getallitems", shopControler.getAllItems);

shopRouter.get("/getitem/:id", shopControler.getItem);

shopRouter.post("/createitem", shopControler.createItem);

shopRouter.put("/updateitem/:id", shopControler.updateItem);

shopRouter.delete("/deleteitem/:id", verifyToken, shopControler.deleteItem);

module.exports = shopRouter;
