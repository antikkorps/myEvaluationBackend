const { faker } = require('@faker-js/faker');

function generateFakeUser() {
  const firstName = faker.person.firstName();
  const name = faker.person.lastName();
  const email = faker.internet.email();
  const password = faker.internet.password();
  const username = faker.internet.userName();
  const role_id = faker.number.int();
  const fonction = faker.person.jobDescriptor();
  // ...

  return {
    firstName,
    name,
    email,
    password,
    username,
    fonction,
    role_id,
    // ...
  };
}

function generateFakeRole() {
  const name = faker.person.jobTitle();
  const description = faker.hacker.phrase();
  const slug = faker.lorem.slug();
  //...
  return {
    name,
    description,
    slug,
    //...
  };
}

function generateFakeTag() {
  const name = faker.lorem.word();
  //...
  return {
    name,
    //...
  };
}

function generateFakeClient() {
  const name = faker.company.name();
  const address = faker.location.streetAddress();
  const city = faker.location.city();
  const zipcode = faker.location.zipCode();
  //...
  return {
    name,
    address,
    city,
    zipcode,
    //...
  };
}

function generateFakeContrat() {
  const name = faker.lorem.word();
  const description = faker.lorem.sentence();
  const published = faker.datatype.boolean();
  const begin_date = faker.date.future();
  const end_date = faker.date.future();
  const theme = faker.lorem.word();
  const client_id = Math.floor(Math.random() * 11);

  //...
  return {
    name,
    description,
    published,
    begin_date,
    end_date,
    theme,
    client_id,
    //...
  };
}

function generateFakeEvaluation() {
  const formateur_id = Math.floor(Math.random() * 20);
  const participant_id = Math.floor(Math.random() * 20);
  const note_globale = Math.floor(Math.random() * 11);
  const commentaire = faker.lorem.word();
  const date = faker.date.future();
  const contrat_id = Math.floor(Math.random() * 20);
  //...
  return {
    formateur_id,
    participant_id,
    note_globale,
    commentaire,
    date,
    contrat_id,
    //...
  };
}
module.exports = {
  generateFakeUser,
  generateFakeRole,
  generateFakeTag,
  generateFakeClient,
  generateFakeContrat,
  generateFakeEvaluation,
  // ...
};
