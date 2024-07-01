const supertest = require("supertest");
const { app, server } = require("../../src/index");
const request = supertest(app);
const { connectDB, disconnectDB } = require("../database");
const UserLoginInformation = require("../../src/models/UserLoginInformation");
const UserPersonalInformation = require("../../src/models/UserPersonalInformation");
const UserAddressInformation = require("../../src/models/UserAddressInformation");
const {
  EMAIL_ALREADY_EXISTS_ERROR_MESSAGE,
} = require("../../src/constants/email");
const bcrypt = require("bcrypt");
const Bag = require("../../src/models/Bag");
const Wishlist = require("../../src/models/Wishlist");

describe("userLoginInformationController", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
    await new Promise((resolve) => setTimeout(() => resolve(), 1000));
  });

  beforeEach(() => {
    jest.setTimeout(30000);
  });

  const userUUID1 = "user-id1";
  const userUUID2 = "user-id2";
  const email = "test@email.com";
  const wrongEmail = "test2@email.com";
  const updatedEmail = "test3@email.com";
  const password = "123456Bb";
  const wrongPassword = "123456Bc";
  const newPassword = "123456Bt";
  const firstName = "TestName";
  const lastName = "TestName";
  const jewelryId = 1;
  const size = 1;

  afterEach(async () => {
    await UserLoginInformation.findByIdAndDelete(userUUID1);
    await UserPersonalInformation.findByIdAndDelete(userUUID1);
    await UserAddressInformation.findByIdAndDelete(userUUID1);

    await UserLoginInformation.findByIdAndDelete(userUUID2);
    await UserPersonalInformation.findByIdAndDelete(userUUID2);
    await UserAddressInformation.findByIdAndDelete(userUUID2);

    await Bag.findOneAndDelete({ user: userUUID1 });
    await Wishlist.findOneAndDelete({ user: userUUID1 });
    await server.close();
  });

  test("Test user registration; It should populate user models; Expect success", async () => {
    const res = await request
      .post("/user-login-information/register")
      .set("user-uuid", userUUID1)
      .send({ email, password, firstName, lastName });

    expect(res.status).toBe(201);

    const createdUserLoginInformation = await UserLoginInformation.findById(
      userUUID1
    );

    const createdUserPersonalInformation =
      await UserPersonalInformation.findById(userUUID1);

    const createdUserAddressInformation = await UserAddressInformation.findById(
      userUUID1
    );

    expect(createdUserLoginInformation).not.toBeNull();
    expect(createdUserLoginInformation.email).toBe(email);

    expect(createdUserPersonalInformation).not.toBeNull();
    expect(createdUserPersonalInformation.firstName).toBe(firstName);
    expect(createdUserPersonalInformation.lastName).toBe(lastName);

    expect(createdUserAddressInformation).not.toBeNull();
  });

  test("Test user registration; It should not populate user models with duplicate email; Expect error", async () => {
    const res1 = await request
      .post("/user-login-information/register")
      .set("user-uuid", userUUID1)
      .send({ email, password, firstName, lastName });

    expect(res1.status).toBe(201);

    const res2 = await request
      .post("/user-login-information/register")
      .set("user-uuid", userUUID2)
      .send({ email, password, firstName, lastName });

    expect(res2.status).toBe(401);
    expect(res2.body.message).toBe(EMAIL_ALREADY_EXISTS_ERROR_MESSAGE);

    const createdUserLoginInformation = await UserLoginInformation.findById(
      userUUID2
    );
    const createdUserPersonalInformation =
      await UserPersonalInformation.findById(userUUID2);
    const createdUserAddressInformation = await UserAddressInformation.findById(
      userUUID2
    );

    expect(createdUserLoginInformation).toBeNull();
    expect(createdUserPersonalInformation).toBeNull();
    expect(createdUserAddressInformation).toBeNull();
  });

  test("Test user login; It should login user; Expect success", async () => {
    await request
      .post("/user-login-information/register")
      .set("user-uuid", userUUID1)
      .send({ email, password, firstName, lastName });

    const res2 = await request
      .post("/user-login-information/login")
      .set("user-uuid", userUUID1)
      .send({ email, password });

    expect(res2.status).toBe(200);
  });

  test("Test user login with wrong password; It should not login user; Expect error", async () => {
    await request
      .post("/user-login-information/register")
      .set("user-uuid", userUUID1)
      .send({ email, password, firstName, lastName });

    const res2 = await request
      .post("/user-login-information/login")
      .set("user-uuid", userUUID1)
      .send({ email, wrongPassword });

    expect(res2.status).toBe(401);
  });

  test("Test user login with wrong email; It should not login user; Expect error", async () => {
    await request
      .post("/user-login-information/register")
      .set("user-uuid", userUUID1)
      .send({ email, password, firstName, lastName });

    const res2 = await request
      .post("/user-login-information/login")
      .set("user-uuid", userUUID1)
      .send({ wrongEmail, password });

    expect(res2.status).toBe(401);
  });

  test("Test update user email with valid password; Expect success", async () => {
    const res1 = await request
      .post("/user-login-information/register")
      .set("user-uuid", userUUID1)
      .send({ email, password, firstName, lastName });

    expect(res1.status).toBe(201);

    const res2 = await request
      .put(`/user-login-information/update-email/${userUUID1}`)
      .set("user-uuid", userUUID1)
      .send({ email: updatedEmail, password });

    expect(res2.status).toBe(200);

    const updatedUserLoginInformation = await UserLoginInformation.findById(
      userUUID1
    );

    expect(updatedUserLoginInformation.email).toBe(updatedEmail);
  });

  test("Test update user email with invalid password; Expect error", async () => {
    const res1 = await request
      .post("/user-login-information/register")
      .set("user-uuid", userUUID1)
      .send({ email, password, firstName, lastName });

    expect(res1.status).toBe(201);

    const res2 = await request
      .put(`/user-login-information/update-email/${userUUID1}`)
      .set("user-uuid", userUUID1)
      .send({ email: updatedEmail, password: wrongPassword });

    expect(res2.status).toBe(401);

    const updatedUserLoginInformation = await UserLoginInformation.findById(
      userUUID1
    );

    expect(updatedUserLoginInformation.email).not.toBe(updatedEmail);
    expect(updatedUserLoginInformation.email).toBe(email);
  });

  test("Test update user password with valid current password; Expect success", async () => {
    const res1 = await request
      .post("/user-login-information/register")
      .set("user-uuid", userUUID1)
      .send({ email, password, firstName, lastName });

    expect(res1.status).toBe(201);

    const res2 = await request
      .put(`/user-login-information/update-password/${userUUID1}`)
      .set("user-uuid", userUUID1)
      .send({ email, password, newPassword });

    expect(res2.status).toBe(200);

    const updatedUserLoginInformation = await UserLoginInformation.findById(
      userUUID1
    );

    const isChanged = await bcrypt.compare(
      newPassword,
      updatedUserLoginInformation.password
    );

    expect(isChanged).toBe(true);
  });

  test("Test update user password with invalid current password; Expect success", async () => {
    const res1 = await request
      .post("/user-login-information/register")
      .set("user-uuid", userUUID1)
      .send({ email, password, firstName, lastName });

    expect(res1.status).toBe(201);

    const res2 = await request
      .put(`/user-login-information/update-password/${userUUID1}`)
      .set("user-uuid", userUUID1)
      .send({ email, wrongPassword, newPassword });

    expect(res2.status).toBe(401);

    const updatedUserLoginInformation = await UserLoginInformation.findById(
      userUUID1
    );

    const isChanged = await bcrypt.compare(
      wrongPassword,
      updatedUserLoginInformation.password
    );

    expect(isChanged).toBe(false);
  });

  test("Test delete user; Expect success", async () => {
    const res = await request
      .delete(`/user-login-information/${userUUID1}`)
      .set("user-uuid", userUUID1);

    expect(res.status).toBe(200);

    const deletedUserLoginInformation = await UserLoginInformation.findById(
      userUUID1
    );

    const deletedUserPersonalInformation =
      await UserPersonalInformation.findById(userUUID1);

    const deletedUserAddressInformation = await UserAddressInformation.findById(
      userUUID1
    );

    expect(deletedUserLoginInformation).toBeNull();
    expect(deletedUserPersonalInformation).toBeNull();
    expect(deletedUserAddressInformation).toBeNull();
  });

  test("Test transfer shopping bag; Expect success", async () => {
    await request
      .post("/user-login-information/register")
      .set("user-uuid", userUUID1)
      .send({ email, password, firstName, lastName });

    await request.get("/user-login-information/logout");

    await request.get("/").set("user-uuid", userUUID2);

    await request
      .post(`/bag/create/${jewelryId}`)
      .set("user-uuid", userUUID2)
      .send({
        size,
      });

    const res = await request
      .post("/user-login-information/login")
      .set("user-uuid", userUUID2)
      .send({ email, password });

    expect(res.status).toBe(200);

    const transferredBag = await Bag.find({ user: userUUID1 });
    const previousBag = await Bag.find({ user: userUUID2 });

    expect(transferredBag.length).toBe(1);
    expect(previousBag.length).toBe(0);
  });

  test("Test transfer wishlist; Expect success", async () => {
    await request
      .post("/user-login-information/register")
      .set("user-uuid", userUUID1)
      .send({ email, password, firstName, lastName });

    await request.get("/user-login-information/logout");

    await request.get("/").set("user-uuid", userUUID2);

    await request
      .post(`/wishlist/create/${jewelryId}`)
      .set("user-uuid", userUUID2);

    const res = await request
      .post("/user-login-information/login")
      .set("user-uuid", userUUID2)
      .send({ email, password });

    expect(res.status).toBe(200);

    const transferredWishlist = await Wishlist.find({ user: userUUID1 });
    const previousWishlist = await Wishlist.find({ user: userUUID2 });

    expect(transferredWishlist.length).toBe(1);
    expect(previousWishlist.length).toBe(0);
  });
});
