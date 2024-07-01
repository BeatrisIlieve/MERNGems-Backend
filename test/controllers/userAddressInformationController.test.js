const supertest = require("supertest");
const { app, server } = require("../../src/index");
const request = supertest(app);
const { connectDB, disconnectDB } = require("../database");
const UserLoginInformation = require("../../src/models/UserLoginInformation");
const UserPersonalInformation = require("../../src/models/UserPersonalInformation");
const UserAddressInformation = require("../../src/models/UserAddressInformation");

describe("userAddressInformationController", () => {
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

  const userUUID = "user-id";
  const email = "test@email.com";
  const password = "123456Bb";
  const firstName = "TestName";
  const lastName = "TestName";
  const country = "Test";
  const invalidCountry = "Test1";
  const city = "Test";
  const invalidCity = "Test1";
  const street = "Test Test 1";
  const invalidStreet = "$";
  const apartment = "1A";
  const invalidApartment = "$";
  const zipCode = "T 1111";
  const invalidZipCode = "1";
  const phoneNumber = "0123456789";
  const invalidPhoneNumber = "0123456789T";

  afterEach(async () => {
    await UserLoginInformation.findByIdAndDelete(userUUID);
    await UserPersonalInformation.findByIdAndDelete(userUUID);
    await UserAddressInformation.findByIdAndDelete(userUUID);
    await server.close();
  });

  test("Test update user address details with valid data; Expect success", async () => {
    const res1 = await request
      .post("/user-login-information/register")
      .set("user-uuid", userUUID)
      .send({ email, password, firstName, lastName });

    expect(res1.status).toBe(201);

    const res2 = await request
      .put(`/user-address-information/${userUUID}`)
      .set("user-uuid", userUUID)
      .send({
        country,
        city,
        street,
        apartment,
        zipCode,
        phoneNumber,
      });

    expect(res2.status).toBe(200);

    const updatedUserAddressInformation = await UserAddressInformation.findById(
      userUUID
    );

    expect(updatedUserAddressInformation.country).toBe(country);
    expect(updatedUserAddressInformation.city).toBe(city);
    expect(updatedUserAddressInformation.street).toBe(street);
    expect(updatedUserAddressInformation.apartment).toBe(apartment);
    expect(updatedUserAddressInformation.zipCode).toBe(zipCode);
    expect(updatedUserAddressInformation.phoneNumber).toBe(phoneNumber);
  });

  test("Test update user address details with invalid data; Expect errors", async () => {
    const res1 = await request
      .post("/user-login-information/register")
      .set("user-uuid", userUUID)
      .send({ email, password, firstName, lastName });

    expect(res1.status).toBe(201);

    const res2 = await request
      .put(`/user-address-information/${userUUID}`)
      .set("user-uuid", userUUID)
      .send({
        country: invalidCountry,
        city: invalidCity,
        street: invalidStreet,
        apartment: invalidApartment,
        zipCode: invalidZipCode,
        phoneNumber: invalidPhoneNumber,
      });

    expect(res2.status).toBe(401);

    const updatedUserAddressInformation = await UserAddressInformation.findById(
      userUUID
    );

    expect(updatedUserAddressInformation.country).not.toBe(invalidCountry);
    expect(updatedUserAddressInformation.city).not.toBe(invalidCity);
    expect(updatedUserAddressInformation.street).not.toBe(invalidStreet);
    expect(updatedUserAddressInformation.apartment).not.toBe(invalidApartment);
    expect(updatedUserAddressInformation.zipCode).not.toBe(invalidZipCode);
    expect(updatedUserAddressInformation.phoneNumber).not.toBe(
      invalidPhoneNumber
    );
  });

  test("Test fill user address details with valid data then update with invalid country; Expect error", async () => {
    const res1 = await request
      .post("/user-login-information/register")
      .set("user-uuid", userUUID)
      .send({ email, password, firstName, lastName });

    expect(res1.status).toBe(201);

    const res2 = await request
      .put(`/user-address-information/${userUUID}`)
      .set("user-uuid", userUUID)
      .send({
        country,
        city,
        street,
        apartment,
        zipCode,
        phoneNumber,
      });

    expect(res2.status).toBe(200);

    const res3 = await request
      .put(`/user-address-information/${userUUID}`)
      .set("user-uuid", userUUID)
      .send({
        country: invalidCountry,
        city,
        street,
        apartment,
        zipCode,
        phoneNumber,
      });

    expect(res3.status).toBe(401);

    const updatedUserAddressInformation = await UserAddressInformation.findById(
      userUUID
    );

    expect(updatedUserAddressInformation.country).toBe(country);
    expect(updatedUserAddressInformation.city).toBe(city);
    expect(updatedUserAddressInformation.street).toBe(street);
    expect(updatedUserAddressInformation.apartment).toBe(apartment);
    expect(updatedUserAddressInformation.zipCode).toBe(zipCode);
    expect(updatedUserAddressInformation.phoneNumber).toBe(phoneNumber);

    expect(updatedUserAddressInformation.country).not.toBe(invalidCountry);
  });
});
