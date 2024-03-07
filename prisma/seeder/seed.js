const { PrismaClient } = require("@prisma/client")
const { faker } = require("@faker-js/faker")
const bcrypt = require("bcrypt")

const prisma = new PrismaClient()

async function main() {
    // Create an admin user
    let adminUser = await prisma.user.findUnique({
        where: {
            email: "admin@example.com",
        },
    })
    if (!adminUser) {
        adminUser = await prisma.user.create({
            data: {
                email: "admin@example.com",
                password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10),
                role: "ADMIN",
                avatar: faker.image.avatar(),
            },
        })
    }
    // Create a simple user for testing purposes
    let testUser = await prisma.user.findUnique({
        where: {
            email: "user@example.com",
        },
    })

    if (!testUser) {
        testUser = await prisma.user.create({
            data: {
                email: "user@example.com",
                password: await bcrypt.hash(process.env.USER_PASSWORD, 10),
                role: "USER",
                avatar: faker.image.avatar(),
            },
        })
    }

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
    const users = []
    for (let i = 0; i < 10; i++) {
        const user = await prisma.user.create({
            data: {
                email: faker.internet.email(),
                password: await bcrypt.hash(faker.internet.password(), 10),
                avatar: faker.image.avatar(),
                role: "CLIENT_PARTICIPANT",
            },
        })
        users.push(user)
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
                commentaire: faker.lorem.sentences(2),
            },
        })
    }

    // Create 10 forms
    const forms = []
    for (let i = 0; i < 10; i++) {
        const form = await prisma.form.create({
            data: {
                name: faker.lorem.words(3),
                description: faker.lorem.sentences(2),
                published: faker.datatype.boolean(),
                user_id: users[i].id,
                company_id: faker.number.int({ min: 1, max: 10 }),
            },
        })
        forms.push(form)
    }

    // Create 10 fields
    const fields = []
    for (let i = 0; i < 10; i++) {
        const field = await prisma.field.create({
            data: {
                //create  a random type using enum Fieldtype
                type: faker.helpers.arrayElement([
                    "TEXT",
                    "TEXTAREA",
                    "RADIO",
                    "CHECKBOX",
                    "SELECT",
                    "DATE",
                    "DATETIME",
                    "EMAIL",
                    "NUMBER",
                    "PASSWORD",
                    "FILE",
                    "HIDDEN",
                    "COLOR",
                    "RANGE",
                    "TEL",
                    "URL",
                    "SEARCH",
                    "MONTH",
                    "WEEK",
                    "IMAGE",
                    "BUTTON",
                    "SUBMIT",
                    "RESET",
                    "BOOLEAN",
                ]),
                label: faker.lorem.word(),
                form_id: forms[i].id,
            },
        })
        fields.push(field)
    }

    // Create 10 fields value
    const fieldsValues = []
    for (let i = 0; i < 10; i++) {
        const fieldValue = await prisma.field_Value.create({
            data: {
                value: faker.lorem.word(),
                field_id: fields[i].id,
                form_id: forms[i].id,
                evaluation_id: fields[i].id,
            },
        })
        fieldsValues.push(fieldValue)
    }

    // // Create 10 methods
    // for (let i = 0; i < 10; i++) {
    //   await prisma.methode.create({
    //     data: {
    //       name: faker.lorem.words(3),
    //       description: faker.lorem.sentences(2),
    //     },
    //   })
    // }

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
