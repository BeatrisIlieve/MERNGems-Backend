const supertest = require("supertest");
const { app, server } = require("../../src/index");
const request = supertest(app);
const { connectDB, disconnectDB } = require("../database");
const UserLoginInformation = require("../../src/models/UserLoginInformation");
const UserPersonalInformation = require("../../src/models/UserPersonalInformation");
const UserAddressInformation = require("../../src/models/UserAddressInformation");
const Wishlist = require("../../src/models/Wishlist");

describe("wishlistController", () => {
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

  afterEach(async () => {
    await UserLoginInformation.findByIdAndDelete(userUUID);
    await UserPersonalInformation.findByIdAndDelete(userUUID);
    await UserAddressInformation.findByIdAndDelete(userUUID);
    await Wishlist.findOneAndDelete({ user: userUUID });

    await server.close();
  });

  test("Test add to wishlist, not registered user; Expect success", async () => {
    await request.get("/").set("user-uuid", userUUID);

    const res2 = await request
      .post(`/wishlist/create/${jewelryId}`)
      .set("user-uuid", userUUID);

    expect(res2.status).toBe(201);

    const wishlist = await Wishlist.find({ user: userUUID });

    expect(wishlist.length).toBe(1);
  });

  test("Test add to wishlist, registered user; Expect success", async () => {
    const res1 = await request
      .post("/user-login-information/register")
      .set("user-uuid", userUUID)
      .send({ email, password, firstName, lastName });

    expect(res1.status).toBe(201);

    const res2 = await request
      .post(`/wishlist/create/${jewelryId}`)
      .set("user-uuid", userUUID);

    expect(res2.status).toBe(201);

    const wishlist = await Wishlist.find({ user: userUUID });

    expect(wishlist.length).toBe(1);
  });

  test("Test remove from wishlist; Expect success", async () => {
    await request
      .post("/user-login-information/register")
      .set("user-uuid", userUUID)
      .send({ email, password, firstName, lastName });

    await request
      .post(`/wishlist/create/${jewelryId}`)
      .set("user-uuid", userUUID);

    const res = await request
      .delete(`/wishlist/delete/${jewelryId}`)
      .set("user-uuid", userUUID);

    expect(res.status).toBe(200);

    const wishlist = await Wishlist.find({ user: userUUID });

    expect(wishlist.length).toBe(0);
  });

  test("Test find wishlist; Expect wishlist count to be one", async () => {
    await request
      .post("/user-login-information/register")
      .set("user-uuid", userUUID)
      .send({ email, password, firstName, lastName });

    await request
      .post(`/wishlist/create/${jewelryId}`)
      .set("user-uuid", userUUID);

    const res = await request
      .get("/wishlist/find-all")
      .set("user-uuid", userUUID);

    expect(res.status).toBe(200);

    expect(res.body).toHaveProperty("totalCount");

    expect(res.body.totalCount).toBe(1);
  });

  test("Test find count; Expect wishlist count to be one", async () => {
    await request
      .post("/user-login-information/register")
      .set("user-uuid", userUUID)
      .send({ email, password, firstName, lastName });

    await request
      .post(`/wishlist/create/${jewelryId}`)
      .set("user-uuid", userUUID);

    const res = await request
      .get("/wishlist/find-count")
      .set("user-uuid", userUUID);

    expect(res.status).toBe(200);
  });
});
