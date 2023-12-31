const auth = require("./login");

// Function successfully logs in user with valid credentials and returns a token.
it("should log in user and return token when valid credentials are provided", async () => {
  const req = {
    body: {
      username: "testuser",
      password: "testpassword",
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const User = require("../models/user");
  const jwt = require("jsonwebtoken");

  User.findOne = jest.fn().mockResolvedValue({
    username: "testuser",
    comparePassword: jest.fn().mockResolvedValue(true),
  });
  jwt.sign = jest.fn().mockReturnValue("testtoken");

  await auth.login(req, res);

  expect(User.findOne).toHaveBeenCalledWith({ username: "testuser" });
  expect(jwt.sign).toHaveBeenCalledWith(
    { name: "testuser" },
    process.env.ACSSES_TOKEN_SECRET,
    { expiresIn: "600s" }
  );
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    username: "testuser",
    token: "testtoken",
  });
});
