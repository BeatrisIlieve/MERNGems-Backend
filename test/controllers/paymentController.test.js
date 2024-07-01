const supertest = require("supertest");
const { app, server } = require("../../src/index");
const request = supertest(app);
const { connectDB, disconnectDB } = require("../database");
const UserLoginInformation = require("../../src/models/UserLoginInformation");
const UserPersonalInformation = require("../../src/models/UserPersonalInformation");
const UserAddressInformation = require("../../src/models/UserAddressInformation");
const Order = require("../../src/models/Order");

describe("paymentController", () => {
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

  const userUUID = "user-id3";
  const email = "test@email.com";
  const password = "123456Bb";
  const firstName = "TestName";
  const lastName = "TestName";
  const jewelryId = 1;
  const size = 1;
  const country = "Test";
  const city = "Test";
  const street = "Test Test 1";
  const apartment = "1A";
  const zipCode = "T 1111";
  const phoneNumber = "0123456789";
  const longCardNumber = "1234567890123456";
  const invalidLongCardNumber = "123456789012345";
  const cardHolder = "Test Test";
  const cvvCode = "123";
  const invalidCvvCode = "12";
  const expirationMonth = "11";
  const invalidExpirationMonth = "T";
  const expirationYear = "2030";
  const invalidExpirationYear = "2000";

  afterEach(async () => {
    await UserLoginInformation.findByIdAndDelete(userUUID);
    await UserPersonalInformation.findByIdAndDelete(userUUID);
    await UserAddressInformation.findByIdAndDelete(userUUID);
    await Order.findOneAndDelete({ user: userUUID });

    await server.close();
  });

  test("Test complete payment with valid data; Expect success", async () => {
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

    await request
      .put(`/checkout/update/${userUUID}`)
      .set("user-uuid", userUUID)
      .send({
        country,
        city,
        street,
        apartment,
        zipCode,
        phoneNumber,
      });

    const res = await request
      .post(`/payment/${userUUID}`)
      .set("user-uuid", userUUID)
      .send({
        longCardNumber,
        cardHolder,
        cvvCode,
        expirationMonth,
        expirationYear,
      });

    expect(res.status).toBe(201);

    const order = await Order.find({ user: userUUID });

    expect(order.length).toBe(1);
  });

  test("Test complete payment with invalid card number; Expect error", async () => {
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

    await request
      .put(`/checkout/update/${userUUID}`)
      .set("user-uuid", userUUID)
      .send({
        country,
        city,
        street,
        apartment,
        zipCode,
        phoneNumber,
      });

    const res = await request
      .post(`/payment/${userUUID}`)
      .set("user-uuid", userUUID)
      .send({
        invalidLongCardNumber,
        cardHolder,
        cvvCode,
        expirationMonth,
        expirationYear,
      });

    expect(res.status).toBe(401);

    const order = await Order.find({ user: userUUID });

    expect(order.length).toBe(0);
  });

  test("Test complete payment with invalid CVV code; Expect error", async () => {
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

    await request
      .put(`/checkout/update/${userUUID}`)
      .set("user-uuid", userUUID)
      .send({
        country,
        city,
        street,
        apartment,
        zipCode,
        phoneNumber,
      });

    const res = await request
      .post(`/payment/${userUUID}`)
      .set("user-uuid", userUUID)
      .send({
        longCardNumber,
        cardHolder,
        invalidCvvCode,
        expirationMonth,
        expirationYear,
      });

    expect(res.status).toBe(401);

    const order = await Order.find({ user: userUUID });

    expect(order.length).toBe(0);
  });

  test("Test complete payment with invalid expiration month; Expect error", async () => {
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

    await request
      .put(`/checkout/update/${userUUID}`)
      .set("user-uuid", userUUID)
      .send({
        country,
        city,
        street,
        apartment,
        zipCode,
        phoneNumber,
      });

    const res = await request
      .post(`/payment/${userUUID}`)
      .set("user-uuid", userUUID)
      .send({
        longCardNumber,
        cardHolder,
        cvvCode,
        invalidExpirationMonth,
        expirationYear,
      });

    expect(res.status).toBe(401);

    const order = await Order.find({ user: userUUID });

    expect(order.length).toBe(0);
  });

  test("Test complete payment with invalid expiration year; Expect error", async () => {
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

    await request
      .put(`/checkout/update/${userUUID}`)
      .set("user-uuid", userUUID)
      .send({
        country,
        city,
        street,
        apartment,
        zipCode,
        phoneNumber,
      });

    const res = await request
      .post(`/payment/${userUUID}`)
      .set("user-uuid", userUUID)
      .send({
        longCardNumber,
        cardHolder,
        cvvCode,
        expirationMonth,
        invalidExpirationYear,
      });

    expect(res.status).toBe(401);

    const order = await Order.find({ user: userUUID });

    expect(order.length).toBe(0);
  });
});
