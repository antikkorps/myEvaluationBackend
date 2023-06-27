const sql = require('./db.js');
const db = require('../models/db.js');

//constructor
const Evaluation = function (evaluation) {
  this.id = evaluation.id;
  this.name = evaluation.name;
  this.description = evaluation.description;
  // this.date = evaluation.date;
  // this.type = evaluation.type;
  // this.status = evaluation.status;
  // this.user_id = evaluation.user_id;
  // this.published = evaluation.published;
};

//create
Evaluation.create = (newEvaluation, result) => {
  // Sélection de la base de données
  sql
    .query('USE myEvaluations')
    .then(() => {
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
Evaluation.findById = (evaluationId) => {
  const query = `SELECT * FROM evaluations WHERE id = ?`;

  return new Promise((resolve, reject) => {
    sql.query(query, [evaluationId], (error, res) => {
      if (error) {
        console.log('error: ', error);
        reject(error);
      } else {
        if (res.length) {
          console.log('found evaluation: ', res[0]);
          resolve(res[0]);
        } else {
          reject({ kind: 'not_found' });
        }
      }
    });
  });
};

//get all
Evaluation.getAll = () => {
  const query = 'SELECT * FROM evaluations';
  return db
    .query(query)
    .then(([results]) => {
      console.log('evaluations: ', results);
      return results;
    })
    .catch((error) => {
      console.log('error: ', error);
      throw error;
    });
};

//get all published
Evaluation.getAllPublished = () => {
  const query = 'SELECT * FROM evaluations WHERE published = true';
  return db
    .query(query)
    .then(([results]) => {
      console.log('evaluations: ', results);
      return results;
    })
    .catch((error) => {
      console.log('error: ', error);
      throw error;
    });
};

//update by id
Evaluation.updateById = (id, evaluation) => {
  const query = `UPDATE evaluations SET name = ?, description = ?, date = ?, type = ?, status = ?, user_id = ?, published = ? WHERE id = ?`;

  return db
    .query(query, [
      evaluation.name,
      evaluation.description,
      evaluation.date,
      evaluation.type,
      evaluation.status,
      evaluation.user_id,
      evaluation.published,
      id,
    ])
    .then(([results]) => {
      console.log('updated evaluation: ', {
        id: id,
        ...evaluation,
      });
      return { id: id, ...evaluation };
    })
    .catch((error) => {
      console.log('error: ', error);
      throw error;
    });
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
