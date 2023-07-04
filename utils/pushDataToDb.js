const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const {
  generateFakeRole,
  generateFakeUser,
  generateFakeTag,
  generateFakeClient,
} = require('./fakeDataGenerator');
const prisma = new PrismaClient();

async function createFakeUsers(numUsers) {
  try {
    for (let i = 0; i < numUsers; i++) {
      const fakeUser = generateFakeUser();

      await prisma.user.create({
        data: {
          firstName: fakeUser.firstName,
          name: fakeUser.name,
          username: fakeUser.username,
          email: fakeUser.email,
          password: fakeUser.password,
          fonction: fakeUser.fonction,
          role_id: 2,
          // Autres champs de l'utilisateur
        },
      });
    }

    console.log(`${numUsers} fake users created.`);
  } catch (error) {
    console.error('Error creating fake users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// création de 10 utilisateurs fictifs
createFakeUsers(10);

async function createFakeRoles(numRoles) {
  try {
    for (let i = 0; i < numRoles; i++) {
      const fakeRole = generateFakeRole();

      await prisma.role.create({
        data: {
          name: fakeRole.name,
          description: fakeRole.description,
          slug: fakeRole.slug,
          // Autres champs du rôle
        },
      });
    }

    console.log(`${numRoles} fake roles created.`);
  } catch (error) {
    console.error('Error creating fake roles:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// création de 10 rôles fictifs
createFakeRoles(10);

async function createFakeTags(numTags) {
  try {
    for (let i = 0; i < numTags; i++) {
      const fakeTag = generateFakeTag();

      await prisma.tag.create({
        data: {
          name: fakeTag.name,
          // Autres champs du tag
        },
      });
    }

    console.log(`${numTags} fake tags created.`);
  } catch (error) {
    console.error('Error creating fake tags:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// création de 10 tags fictifs
createFakeTags(10);

async function createFakeClients(numClients) {
  try {
    for (let i = 0; i < numClients; i++) {
      const fakeClient = generateFakeClient();

      await prisma.client.create({
        data: {
          name: fakeClient.name,
          address: fakeClient.address,
          city: fakeClient.city,
          zipcode: fakeClient.zipcode,
          // Autres champs du client
        },
      });
    }

    console.log(`${numClients} fake clients created.`);
  } catch (error) {
    console.error('Error creating fake clients:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// création de 10 clients fictifs
createFakeClients(10);
