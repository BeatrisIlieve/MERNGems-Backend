const supertest = require("supertest");
const { app, server } = require("../../src/index");
const request = supertest(app);
const { connectDB, disconnectDB } = require("../database");
const UserLoginInformation = require("../../src/models/UserLoginInformation");
const UserPersonalInformation = require("../../src/models/UserPersonalInformation");
const UserAddressInformation = require("../../src/models/UserAddressInformation");
const Bag = require("../../src/models/Bag");

describe("orderConfirmationController", () => {
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

  const userUUID = "user-id5";
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
  const cardHolder = "Test Test";
  const cvvCode = "123";
  const expirationMonth = "11";
  const expirationYear = "2030";

  afterEach(async () => {
    await UserLoginInformation.findByIdAndDelete(userUUID);
    await UserPersonalInformation.findByIdAndDelete(userUUID);
    await UserAddressInformation.findByIdAndDelete(userUUID);

    await server.close();
  });

  test("Test delete bag after completing purchase; Expect success", async () => {
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

    await request.post(`/payment/${userUUID}`).set("user-uuid", userUUID).send({
      longCardNumber,
      cardHolder,
      cvvCode,
      expirationMonth,
      expirationYear,
    });

    const res = await request
      .get(`/order-confirmation/display/${userUUID}`)
      .set("user-uuid", userUUID);

    expect(res.status).toBe(200);

    const bag = await Bag.find({ user: userUUID });

    expect(bag.length).toBe(0);
  });
});
