# myEvaluationBackend

This is the backend of the project myEvaluation. It is a GraphQL API that allows to create, read, update and delete users, evaluations and related.

```bash
npm install
```

And so especially during the development process every time you make a pull

Do not forget to create a .env file with the following variables:

```bash
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

During all the creation process of this project, I have been using the following technologies:

- Prisma
- Faker
- Express
- CORS
- Nodemon
- bcrypt

Table à prévoir:
Table : User

- user_id (Primary Key)
- role_id (Foreign Key vers la table Role)
- nom
- prénom
- email
- ...

Table : Role

- role_id (Primary Key)
- nom
- description
- ...

Table : Méthode

- méthode_id (Primary Key)
- nom
- description
- ...

Table : Item

- item_id (Primary Key)
- nom
- description
- ...

Table : Méthode_Item

- méthode_item_id (Primary Key)
- méthode_id (Foreign Key vers la table Méthode)
- item_id (Foreign Key vers la table Item)
- ...

Table : Contrat

- contrat_id (Primary Key)
- client_id (Foreign Key vers la table ClientEntreprise)
- thématique
- ...

Table : Contrat_Méthode

- contrat_méthode_id (Primary Key)
- contrat_id (Foreign Key vers la table Contrat)
- méthode_id (Foreign Key vers la table Méthode)
- ...

Table : Évaluation

- évaluation_id (Primary Key)
- formateur_id (Foreign Key vers la table User)
- participant_id (Foreign Key vers la table User)
- note_totale
- commentaire
- date
- contrat_id (Foreign Key vers la table Contrat)
- ...

Table : Évaluation_Item

- évaluation_item_id (Primary Key)
- évaluation_id (Foreign Key vers la table Évaluation)
- méthode_item_id (Foreign Key vers la table Méthode_Item)
- note
- commentaire
- ...

Table : ClientEntreprise

- client_id (Primary Key)
- nom
- adresse
- ...

Table : Tag

- tag_id (Primary Key)
- nom
- description
- ...

Table : Méthode_Tag

- méthode_tag_id (Primary Key)
- méthode_id (Foreign Key vers la table Méthode)
- tag_id (Foreign Key vers la table Tag)
- ...
