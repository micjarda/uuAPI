const mongoose = require("mongoose");
const ShopListSchema = require("../models/shopItem");
const {
  getAllShopLists,
  getShopList,
  createShopList,
  updateShopList,
  deleteShopList
} = require("./shop");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

const list1 = {
  name: "Student",
  owner: "student",
  image: "Base64",
  description: "Basic info abot this list.",
  members: ["Student", "oth"],
  items: [
    ["Energy drink", true],
    ["Auto", false],
    ["Notebook", true],
  ],
  category: "Potřebné věci",
  archived: false,
};

const list2 = {
  name: "Student",
  owner: "student",
  image: "Base64",
  description: "Basic info abot this list.",
  members: ["Student", "oth"],
  items: [
    ["Energy drink", true],
    ["Auto", false],
    ["Notebook", true],
  ],
  category: "Potřebné věci",
  archived: false,
};

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("getAllShopLists", () => {
  // Returns all shop lists when database is not empty
  it("should return all shop lists when database is not empty", async () => {
    const shopLists = [list1, list2];
    ShopListSchema.find = jest.fn().mockResolvedValue(shopLists);

    const result = await getAllShopLists();

    expect(result).toEqual(shopLists);
    expect(ShopListSchema.find).toHaveBeenCalledTimes(1);
  });
});

describe("getShopList", () => {
  // Returns a shop list when given a valid id
  it("should return a shop list when given a valid id", async () => {
    const validId = "658e92edf467a9f78b7d9dd5";
    const expectedShopList = { _id: validId, ...list1 };
    ShopListSchema.find = jest.fn().mockResolvedValue(expectedShopList);

    const result = await getShopList(validId);

    expect(result).toEqual(expectedShopList);
    expect(ShopListSchema.find).toHaveBeenCalledWith({ _id: validId });
  });
});

describe("createShopList function", () => {
  it("should create a new shop list and return it", async () => {
    const createdShopList = await createShopList(list1);

    expect(createdShopList).toBeDefined(); // Ověří, že vytvořený objekt existuje
    expect(createdShopList instanceof ShopListSchema).toBeTruthy(); // Ověří, že je instancí očekávaného typu
  });
});

describe("updateShopList", () => {
  // Updates a shop list with valid id and body
  it("should update a shop list with valid id and body", async () => {
    const id = "658e92edf467a9f78b7d9dd5";
    const body = { name: "newName", archived: false };
    const updatedShopList = { _id: id, name: "newName", price: 10 };

    ShopListSchema.findOneAndUpdate = jest
      .fn()
      .mockResolvedValue(updatedShopList);

    const result = await updateShopList(id, body);

    expect(ShopListSchema.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: id },
      { ...body }
    );
    expect(result).toEqual(updatedShopList);
  });
});

describe("deleteShopList", () => {
    // Deletes a shop list with a valid id
    it('should delete a shop list with a valid id', async () => {
      const id = 'validId';
      const deletedShopList = { _id: id, ...list1};
      jest.spyOn(ShopListSchema, 'findOneAndDelete').mockImplementation(() => Promise.resolve(deletedShopList));

      const result = await deleteShopList(id);

      expect(ShopListSchema.findOneAndDelete).toHaveBeenCalledWith({ _id: id });
      expect(result).toEqual(deletedShopList);
    });
});
