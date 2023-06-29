const sql = require('./db.js');
const db = require('../models/db.js');

const Evaluation = {};

//create
Evaluation.create = (newEvaluation, result) => {
  // Sélection de la base de données
  sql
    .query('USE myEvaluations')
    .then(() => {
      // Insertion dans la base de données
      return sql.query('INSERT INTO evaluation SET ?', newEvaluation);
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
  const query = `SELECT * FROM evaluation WHERE id = ?`;

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
  const query = 'SELECT * FROM evaluation';
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
  const query = 'SELECT * FROM evaluation WHERE published = true';
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
  const query = `UPDATE evaluation SET name = ?, description = ?, date = ?, type = ?, status = ?, user_id = ?, published = ? WHERE id = ?`;

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
  return db
    .query('DELETE FROM evaluation WHERE id = ?', id)
    .then(([results]) => {
      console.log('deleted evaluation with id: ', id);
      return results.affectedRows;
    })
    .catch((error) => {
      console.log('error: ', error);
      throw error;
    });
};

//remove all
Evaluation.removeAll = (result) => {
  return db
    .query('DELETE FROM evaluation')
    .then(([results]) => {
      console.log(`deleted ${results.affectedRows} evaluations`);
      return results.affectedRows;
    })
    .catch((error) => {
      console.log('error: ', error);
      throw error;
    });
};

module.exports = Evaluation;
