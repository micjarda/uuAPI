const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    id: String,
    username: { type: String, unique: true },
    userpassword: String,
    profilepicture: String,
    tier: String,
    disk: String
  },
  {
    timestamps: true,
    collection: "users",
  }
);

// Přidáme middleware pro hashování hesla před uložením do databáze
UserSchema.pre("save", async function (next) {
  if (!this.isModified("userpassword")) {
    return next();
  }

  try {
    const saltRounds = 10; // Počet iterací pro vytvoření soli
    const hashedPassword = await bcrypt.hash(this.userpassword, saltRounds);
    this.userpassword = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// Přidáme middleware pro hashování hesla před aktualizací v databázi
UserSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (!update.userpassword) {
    return next();
  }

  try {
    const saltRounds = 10; // Počet iterací pro vytvoření soli
    const hashedPassword = await bcrypt.hash(update.userpassword, saltRounds);
    update.userpassword = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.userpassword);
  } catch (error) {
    throw error;
  }
};

const Item = mongoose.model("PneuwayUser", UserSchema);
module.exports = Item;
