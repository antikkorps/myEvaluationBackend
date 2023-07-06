const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const {
  generateFakeRole,
  generateFakeUser,
  generateFakeTag,
  generateFakeClient,
  generateFakeContrat,
  generateFakeEvaluation,
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

async function createFakeContrats(numContrats) {
  try {
    for (let i = 0; i < numContrats; i++) {
      const fakeContrat = generateFakeContrat();

      await prisma.contrat.create({
        data: {
          name: fakeContrat.name,
          description: fakeContrat.description,
          published: fakeContrat.published,
          begin_date: fakeContrat.begin_date,
          end_date: fakeContrat.end_date,
          theme: fakeContrat.theme,
          client_id: fakeContrat.client_id,

          // Autres champs du contrat
        },
      });
    }
    console.log(`${numContrats} fake contrats created.`);
  } catch (error) {
    console.error('Error creating fake contrats:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// création de 10 contrats fictifs
createFakeContrats(10);

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

async function createFakeEvaluations(numEvaluations) {
  try {
    for (let i = 0; i < numEvaluations; i++) {
      const fakeEvaluation = generateFakeEvaluation();

      await prisma.evaluation.create({
        data: {
          formateur_id: fakeEvaluation.formateur_id,
          participant_id: fakeEvaluation.participant_id,
          note_globale: fakeEvaluation.note_globale,
          commentaire: fakeEvaluation.commentaire,
          date: fakeEvaluation.date,
          contrat_id: fakeEvaluation.contrat_id,
          // Autres champs de l'évaluation
        },
      });
    }

    console.log(`${numEvaluations} fake evaluations created.`);
  } catch (error) {
    console.error('Error creating fake evaluations:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// création de 10 évaluations fictives
createFakeEvaluations(10);
