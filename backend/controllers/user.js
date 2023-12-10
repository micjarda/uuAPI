const User = require("../models/user");

// Vytvoření nového uživatele
const createUser = async (username, userpassword) => {
  try {
    const newUser = new User({ username, userpassword });
    await newUser.save();
    return newUser;
  } catch (error) {
    throw error;
  }
};

// Získání všech uživatelů
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw error;
  }
};

// Úprava uživatele
const updateUser = async (userId, username, userpassword) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, userpassword },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

// Smazání uživatele
const deleteUser = async (userId) => {
  try {
    await User.findByIdAndRemove(userId);
  } catch (error) {
    throw error;
  }
};

module.exports = { createUser, getAllUsers, updateUser, deleteUser };
