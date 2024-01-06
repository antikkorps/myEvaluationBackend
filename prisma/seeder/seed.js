const { PrismaClient } = require("@prisma/client")
const { faker } = require("@faker-js/faker")
const bcrypt = require("bcrypt")

const prisma = new PrismaClient()

async function main() {
  // Create an admin user
  const admin = await prisma.user.create({
    data: {
      email: "admin@example.com",
      password: await bcrypt.hash("admin", 10),
      role: "ADMIN",
    },
  })
  // Create a simple user for testing purposes
  const testUser = await prisma.user.create({
    data: {
      email: "user@example.com",
      password: await bcrypt.hash("user", 10),
      role: "USER",
    },
  })

  // Create 10 regular users
  for (let i = 0; i < 10; i++) {
    await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: await bcrypt.hash(faker.internet.password(), 10),
      },
    })
  }

  // Create 10 companies
  for (let i = 0; i < 10; i++) {
    await prisma.entreprise.create({
      data: {
        name: faker.company.companyName(),
      },
    })
  }

  // // Create 10 evaluations
  // for (let i = 0; i < 10; i++) {
  //   await prisma.evaluation.create({
  //     data: {
  //       score: faker.random.number({ min: 1, max: 5 }),
  //     },
  //   })
  // }

  // // Create 10 methods
  // for (let i = 0; i < 10; i++) {
  //   await prisma.methode.create({
  //     data: {
  //       name: faker.lorem.words(3),
  //     },
  //   })
  // }

  // // Create 10 tags
  // for (let i = 0; i < 10; i++) {
  //   await prisma.tag.create({
  //     data: {
  //       name: faker.lorem.word(),
  //     },
  //   })
  // }

  //message during seed process
  console.log("Seeding finished.")
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
