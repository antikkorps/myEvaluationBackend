const { PrismaClient } = require("@prisma/client")
const { faker } = require("@faker-js/faker")
const bcrypt = require("bcrypt")

const prisma = new PrismaClient()

async function main() {
  // Create an admin user
  const admin = await prisma.user.create({
    data: {
      email: "admin@example.com",
      password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10),
      role: "ADMIN",
    },
  })
  // Create a simple user for testing purposes
  const testUser = await prisma.user.create({
    data: {
      email: "user@example.com",
      password: await bcrypt.hash(process.env.USER_PASSWORD, 10),
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

  // Create 10 PARTICIPANTS users
  for (let i = 0; i < 10; i++) {
    await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: await bcrypt.hash(faker.internet.password(), 10),
        avatar: faker.internet.avatar(),
        role: "PARTICIPANT",
      },
    })
  }

  // Create 10 companies
  for (let i = 0; i < 10; i++) {
    await prisma.company.create({
      data: {
        name: faker.company.name(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        zipcode: faker.location.zipCode(),
        country: faker.location.country(),
        logo: faker.image.urlPlaceholder({ width: 128, height: 128 }),
      },
    })
  }

  // Create 10 evaluations
  for (let i = 0; i < 10; i++) {
    await prisma.evaluation.create({
      data: {
        date: faker.date.recent(),
        note_globale: faker.number.int({ min: 0, max: 5 }),
        commentaire: faker.lorem.sentences(3),
      },
    })
  }

  // Create 10 methods
  for (let i = 0; i < 10; i++) {
    await prisma.methode.create({
      data: {
        name: faker.lorem.words(3),
        description: faker.lorem.sentences(2),
      },
    })
  }

  // Create 10 tags
  for (let i = 0; i < 10; i++) {
    await prisma.tag.create({
      data: {
        name: faker.lorem.word(),
      },
    })
  }

  //message during seed process
  console.log("Seeding finished. It's all good!")
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
