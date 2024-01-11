const request = require("supertest")
const app = require("../../app")

describe("Test The root path", function () {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/")
    expect(response.statusCode).toBe(200)
  })
}),
  describe("Auth", () => {
    let userToken
    const user = {
      email: "user@example.com",
      password: process.env.USER_PASSWORD,
    }

    test("Signup - should throw an errror if email is not valid", async () => {
      const response = await request(app).post("/auth/signup").send({ email: user.email })
      expect(response.statusCode).toBe(500)
    })
    test("should authenticate a user", async () => {
      const response = await request(app).post("/auth/login").send({
        email: "user@example.com",
        password: process.env.USER_PASSWORD,
      })
      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveProperty("token")

      userToken = response.body.token
    })

    test("should access a protected route", async () => {
      const response = await request(app)
        .get("/api/v1/entreprise")
        .set("Authorization", `Bearer ${userToken}`)

      expect(response.statusCode).toBe(200)
    })
  })
