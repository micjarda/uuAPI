const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

// Vytvoření nového uživatele
router.post("/create", async (req, res) => {
  try {
    const { username, userpassword } = req.body;
    const newUser = await userController.createUser(
      username,
      userpassword
    );
    res.status(201).json({
      message: "Nový uživatel byl vytvořen.",
      user: newUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Nastala chyba při vytváření uživatele." });
  }
});

// Získání všech uživatelů
router.get("/", async (req, res) => {
  try {
    const users = await userController.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Nastala chyba při získávání uživatelů." });
  }
});

// Úprava uživatele
router.put("/:id/edit", async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, userpassword } = req.body;
    const updatedUser = await userController.updateUser(
      userId,
      username,
      userpassword
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Nastala chyba při úpravě uživatele." });
  }
});

// Smazání uživatele
router.delete("/:id/delete", async (req, res) => {
  try {
    const userId = req.params.id;
    await userController.deleteUser(userId);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: "Nastala chyba při mazání uživatele." });
  }
});

module.exports = router;
