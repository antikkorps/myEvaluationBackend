const sql = require('./db.js');
const db = require('../models/db.js');

//create
Contrat.create = (newContrat, result) => {
  // Sélection de la base de données
  sql
    .query('USE myEvaluations')
    .then(() => {
      // Insertion dans la base de données
      return sql.query('INSERT INTO contrats SET ?', newContrat);
    })
    .then((res) => {
      console.log('created contrat: ', {
        id: res.insertId,
        ...newContrat,
      });
      result(null, { id: res.insertId, ...newContrat });
    })
    .catch((error) => {
      console.log('error: ', error);
      result(error, null);
    });
};

//find by id
Contrat.findById = (contratId) => {
  const query = `SELECT * FROM contrats WHERE id = ?`;

  return new Promise((resolve, reject) => {
    sql.query(query, [contratId], (error, res) => {
      if (error) {
        console.log('error: ', error);
        reject(error);
      } else {
        if (res.length) {
          console.log('found contrat: ', res[0]);
          resolve(res[0]);
        } else {
          reject({ kind: 'not_found' });
        }
      }
    });
  });
};

//get all
Contrat.getAll = () => {
  const query = `SELECT * FROM contrats`;

  return db
    .query(query)
    .then((res) => {
      console.log('contrats: ', res);
      return res;
    })
    .catch((error) => {
      console.log('error: ', error);
      throw error;
    });
};

//update by id
Contrat.updateById = (id, contrat) => {
  const query = `UPDATE contrats SET name = ?, description = ?, status = ?, begin_date = ?, end_date = ? WHERE id = ?`;

  return db
    .query(query, [
      contrat.name,
      contrat.description,
      contrat.status,
      contrat.begin_date,
      contrat.end_date,
      id,
    ])
    .then((res) => {
      console.log('updated contrat: ', {
        id: id,
        ...contrat,
      });
      return res;
    })
    .catch((error) => {
      console.log('error: ', error);
      throw error;
    });
};

//remove by id
Contrat.remove = (id) => {
  return new Promise((resolve, reject) => {
    sql.query('DELETE FROM contrats WHERE id = ?', id, (error, res) => {
      if (error) {
        console.log('error: ', error);
        reject(error);
      } else {
        if (res.affectedRows == 0) {
          reject({ kind: 'not_found' });
        } else {
          console.log('deleted contrat with id: ', id);
          resolve(res);
        }
      }
    });
  });
};

//remove all
Contrat.removeAll = () => {
  return new Promise((resolve, reject) => {
    sql.query('DELETE FROM contrats', (error, res) => {
      if (error) {
        console.log('error: ', error);
        reject(error);
      } else {
        console.log(`deleted ${res.affectedRows} contrats`);
        resolve(res);
      }
    });
  });
};

module.exports = Contrat;
