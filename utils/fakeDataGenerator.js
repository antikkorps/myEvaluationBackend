const { faker } = require('@faker-js/faker');

function generateFakeUser() {
  const firstName = faker.person.firstName();
  const name = faker.person.lastName();
  const email = faker.internet.email();
  const password = faker.internet.password();
  const username = faker.internet.userName();
  const role = faker.person.jobTitle();
  const fonction = faker.person.jobDescriptor();
  // ...

  return {
    firstName,
    name,
    email,
    password,
    username,
    fonction,
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

module.exports = {
  generateFakeUser,
  generateFakeRole,
  generateFakeTag,
  // ...
};
