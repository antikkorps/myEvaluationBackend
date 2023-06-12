const sql = require('./db.js');

//constructor
const Evaluation = function (evaluation) {
  this.id = evaluation.id;
  this.name = evaluation.name;
  this.description = evaluation.description;
  //   this.date = evaluation.date;
  //   this.type = evaluation.type;
  //   this.status = evaluation.status;
  //   this.user_id = evaluation.user_id;
  //   this.published = evaluation.published;
};

//create
Evaluation.create = (newEvaluation, result) => {
  // Sélection de la base de données
  sql
    .query('USE myEvaluations')
    .then(() => {
      // Afficher les valeurs de newEvaluation
      console.log('newEvaluation: ', newEvaluation);
      // Afficher les valeurs de newEvaluation
      console.log('newEvaluation: ', newEvaluation);
      // Insertion dans la base de données
      return sql.query('INSERT INTO evaluations SET ?', newEvaluation);
    })
    .then((res) => {
      console.log('created evaluation: ', {
        id: res.insertId,
        ...newEvaluation,
      });
      result(null, { id: res.insertId, ...newEvaluation });
    })
    .catch((error) => {
      console.log('error: ', error);
      result(error, null);
    });
};

//find by id
Evaluation.findById = (evaluationId, result) => {
  sql.query(
    `SELECT * FROM evaluations WHERE id = ${evaluationId}`,
    (error, res) => {
      if (error) {
        console.log('error: ', error);
        result(error, null);
        return;
      }
      if (res.length) {
        console.log('found evaluation: ', res[0]);
        result(null, res[0]);
        return;
      }
      //not found evaluation with the id
      result({ kind: 'not_found' }, null);
    }
  );
};

//get all
Evaluation.getAll = (result) => {
  sql.query('SELECT * FROM evaluations', (error, res) => {
    if (error) {
      console.log('error: ', error);
      result(null, error);
      return;
    }
    console.log('evaluations: ', res);
    result(null, res);
  });
};

//get all published
Evaluation.getAllPublished = (result) => {
  sql.query(
    'SELECT * FROM evaluations WHERE published = true',
    (error, res) => {
      if (error) {
        console.log('error: ', error);
        result(null, error);
        return;
      }
      console.log('evaluations: ', res);
      result(null, res);
    }
  );
};

//update by id
Evaluation.updateById = (id, evaluation, result) => {
  sql.query(
    'UPDATE evaluations SET name = ?, description = ?, date = ?, type = ?, status = ?, user_id = ?, published = ? WHERE id = ?',
    [
      evaluation.name,
      evaluation.description,
      evaluation.date,
      evaluation.type,
      evaluation.status,
      evaluation.user_id,
      evaluation.published,
      id,
    ],
    (error, res) => {
      if (error) {
        console.log('error: ', error);
        result(null, error);
        return;
      }
      if (res.affectedRows == 0) {
        //not found evaluation with the id
        result({ kind: 'not_found' }, null);
        return;
      }
      console.log('updated evaluation: ', { id: id, ...evaluation });
      result(null, { id: id, ...evaluation });
    }
  );
};

//remove by id
Evaluation.remove = (id, result) => {
  sql.query('DELETE FROM evaluations WHERE id = ?', id, (error, res) => {
    if (error) {
      console.log('error: ', error);
      result(null, error);
      return;
    }
    if (res.affectedRows == 0) {
      //not found evaluation with the id
      result({ kind: 'not_found' }, null);
      return;
    }
    console.log('deleted evaluation with id: ', id);
    result(null, res);
  });
};

//remove all
Evaluation.removeAll = (result) => {
  sql.query('DELETE FROM evaluations', (error, res) => {
    if (error) {
      console.log('error: ', error);
      result(null, error);
      return;
    }
    console.log(`deleted ${res.affectedRows} evaluations`);
    result(null, res);
  });
};

module.exports = Evaluation;
