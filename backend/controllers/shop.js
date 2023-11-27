const ShopItemSchema = require("../models/shopItem");
checkForHexRegExp = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i

exports.getAllItems = async (req, res) => {
  try {
    const items = await ShopItemSchema.find().sort({createdAt: -1});
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: "pešek xd" });
  }
};

exports.getItem = async (req, res) => {
  const { id } = req.params;
  if(checkForHexRegExp.test(id)) {
      const item = await ShopItemSchema.find({ _id: id }).exec();

      if (!item || item.length === 0) {
        return res.status(404).json({ error: "No such item" });
      }

      res.status(200).json(item);
  }
  else {
    res.status(404).json({error: "Unvalid ID"});
  }
};

exports.createItem = async (req, res) => {
  const item = new ShopItemSchema(req.body);
  try {
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: "chyba" });
  }
};

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  if(checkForHexRegExp.test(id)) {
    console.log(req.body);
    const item = await ShopItemSchema.findOneAndUpdate(
      { _id: id },
      {
        ...req.body
      }
    );

    if (!item) {
      return res.status(400).json({ error: "No such item" });
    }

    res.status(200).json(item);
  }
  else {
    res.status(404).json({error: "Unvalid ID"});
  }
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  if(checkForHexRegExp.test(id)) {
      const item = await ShopItemSchema.findOneAndDelete({ _id: id });

      if (!item) {
        return res.status(400).json({ error: "No such item" });
      }

      res.status(200).json(item);
  }
  else {
    res.status(404).json({error: "Unvalid ID"});
  }
};
