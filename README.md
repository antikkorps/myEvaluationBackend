# myEvaluationBackend

This is the backend of the project myEvaluation. It is a GraphQL API that allows to create, read, update and delete users, evaluations and related.

## work in progress...

```bash
npm install
```

And so especially during the development process every time you make a pull

Do not forget to create a .env file with the following variables:

```bash
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

or make a copy of the .env.example file.

You can make

```bash
npm run seed
```

To seed data into the database

During all the creation process of this project, I have been using the following technologies:

- Prisma
- Faker
- Express
- CORS
- Nodemon
- bcrypt
