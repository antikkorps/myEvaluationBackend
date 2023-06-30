const { faker } = require('@faker-js/faker');

function generateFakeUser() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email();
  // ...

  return {
    firstName,
    lastName,
    email,
    // ...
  };
}

function generateFakeRole() {
  const name = faker.person.jobTitle();
  const description = faker.hacker.phrase();
}

module.exports = {
  generateFakeUser,
  generateFakeRole,
  // ...
};
