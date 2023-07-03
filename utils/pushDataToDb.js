const { PrismaClient } = require('@prisma/client');
const { generateFakeUser, generateFakeRole } = require('./faker');

const prisma = new PrismaClient();

async function createFakeUsers(numUsers) {
  try {
    for (let i = 0; i < numUsers; i++) {
      const fakeUser = generateFakeUser();

      await prisma.user.create({
        data: {
          firstName: fakeUser.firstName,
          Name: fakeUser.Name,
          email: fakeUser.email,
          password: fakeUser.password,
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
