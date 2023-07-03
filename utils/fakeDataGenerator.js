const { faker } = require('@faker-js/faker');

function generateFakeUser() {
  const firstName = faker.person.firstName();
  const Name = faker.person.lastName();
  const email = faker.internet.email();
  const password = faker.internet.password();
  const role = faker.person.jobTitle();
  const fonction = faker.person.jobDescriptor();
  // ...

  return {
    firstName,
    Name,
    email,
    password,
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

module.exports = {
  generateFakeUser,
  generateFakeRole,
  // ...
};
