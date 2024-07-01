const supertest = require("supertest");
const { app, server } = require("../../src/index");
const request = supertest(app);
const { connectDB, disconnectDB } = require("../database");
const UserLoginInformation = require("../../src/models/UserLoginInformation");
const UserPersonalInformation = require("../../src/models/UserPersonalInformation");
const UserAddressInformation = require("../../src/models/UserAddressInformation");
const Bag = require("../../src/models/Bag");
const { DEFAULT_ADD_QUANTITY } = require("../../src/constants/bag");

describe("bagController", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
    await new Promise((resolve) => setTimeout(() => resolve(), 1000));
  });

  beforeEach(async () => {
    jest.setTimeout(30000);
  });

  const userUUID = "user-id";
  const email = "test@email.com";
  const password = "123456Bb";
  const firstName = "TestName";
  const lastName = "TestName";
  const jewelryId = 1;
  const size = 1;

  afterEach(async () => {
    await UserLoginInformation.findByIdAndDelete(userUUID);
    await UserPersonalInformation.findByIdAndDelete(userUUID);
    await UserAddressInformation.findByIdAndDelete(userUUID);
    await Bag.findOneAndDelete({ user: userUUID });

    await server.close();
  });

  test("Test add to shopping bag, not registered user; Expect success", async () => {
    await request.get("/").set("user-uuid", userUUID);

    const res2 = await request
      .post(`/bag/create/${jewelryId}`)
      .set("user-uuid", userUUID)
      .send({
        size,
      });

    expect(res2.status).toBe(200);

    const bag = await Bag.find({ user: userUUID });

    expect(bag[0].quantity).toBe(DEFAULT_ADD_QUANTITY);
  });

  test("Test add to shopping bag, registered user; Expect success", async () => {
    const res1 = await request
      .post("/user-login-information/register")
      .set("user-uuid", userUUID)
      .send({ email, password, firstName, lastName });

    expect(res1.status).toBe(201);

    const res2 = await request
      .post(`/bag/create/${jewelryId}`)
      .set("user-uuid", userUUID)
      .send({
        size,
      });

    expect(res2.status).toBe(200);

    const bag = await Bag.find({ user: userUUID });

    expect(bag[0].quantity).toBe(DEFAULT_ADD_QUANTITY);
  });

  test("Test remove from shopping bag; Expect success", async () => {
    await request
      .post("/user-login-information/register")
      .set("user-uuid", userUUID)
      .send({ email, password, firstName, lastName });

    await request
      .post(`/bag/create/${jewelryId}`)
      .set("user-uuid", userUUID)
      .send({
        size,
      });

    const createdBag = await Bag.find({ user: userUUID });

    const bagId = createdBag[0]._id;

    const res = await request
      .delete(`/bag/delete/${bagId}`)
      .set("user-uuid", userUUID);

    expect(res.status).toBe(200);

    const bag = await Bag.find({ user: userUUID });

    expect(bag.length).toBe(0);
  });

  test("Test decrease quantity; Expect success", async () => {
    await request
      .post("/user-login-information/register")
      .set("user-uuid", userUUID)
      .send({ email, password, firstName, lastName });

    await request
      .post(`/bag/create/${jewelryId}`)
      .set("user-uuid", userUUID)
      .send({
        size,
      });

    const createdBag = await Bag.find({ user: userUUID });

    const bagId = createdBag[0]._id;

    const res = await request
      .put(`/bag/decrease/${bagId}`)
      .set("user-uuid", userUUID);

    expect(res.status).toBe(200);

    const bag = await Bag.find({ user: userUUID });

    expect(bag.length).toBe(0);
  });

  test("Test decrease quantity higher than in bag; Expect error", async () => {
    await request
      .post("/user-login-information/register")
      .set("user-uuid", userUUID)
      .send({ email, password, firstName, lastName });

    await request
      .post(`/bag/create/${jewelryId}`)
      .set("user-uuid", userUUID)
      .send({
        size,
      });

    const createdBag = await Bag.find({ user: userUUID });

    const bagId = createdBag[0]._id;

    await request.put(`/bag/decrease/${bagId}`).set("user-uuid", userUUID);

    const res = await request
      .put(`/bag/decrease/${bagId}`)
      .set("user-uuid", userUUID);

    expect(res.status).toBe(401);

    const bag = await Bag.find({ user: userUUID });

    expect(bag.length).toBe(0);
  });

  test("Test increase quantity; Expect success", async () => {
    await request
      .post("/user-login-information/register")
      .set("user-uuid", userUUID)
      .send({ email, password, firstName, lastName });

    await request
      .post(`/bag/create/${jewelryId}`)
      .set("user-uuid", userUUID)
      .send({
        size,
      });

    const createdBag = await Bag.find({ user: userUUID });

    const bagId = createdBag[0]._id;

    const res = await request
      .put(`/bag/increase/${bagId}`)
      .set("user-uuid", userUUID);

    expect(res.status).toBe(200);

    const bag = await Bag.find({ user: userUUID });

    const bagQuantity = bag[0].quantity;

    expect(bagQuantity).toBe(2);
  });

  test("Test find shopping bag; Expect success", async () => {
    await request
      .post("/user-login-information/register")
      .set("user-uuid", userUUID)
      .send({ email, password, firstName, lastName });

    await request
      .post(`/bag/create/${jewelryId}`)
      .set("user-uuid", userUUID)
      .send({
        size,
      });

    const res = await request
      .get(`/bag/find-all/${userUUID}`)
      .set("user-uuid", userUUID);

    expect(res.status).toBe(200);

    const bag = await Bag.find({ user: userUUID });

    expect(bag).not.toBeNull();
  });
});
