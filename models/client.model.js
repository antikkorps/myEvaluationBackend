const sql = require('./db.js');
const db = require('../models/db.js');

const Client = {};
//create
Client.create = (newClient, result) => {
  // Sélection de la base de données
  sql
    .query('USE myEvaluations')
    .then(() => {
      // Insertion dans la base de données
      return sql.query('INSERT INTO client SET ?', newClient);
    })
    .then((res) => {
      console.log('created client: ', {
        id: res.insertId,
        ...newClient,
      });
      result(null, { id: res.insertId, ...newClient });
    })
    .catch((error) => {
      console.log('error: ', error);
      result(error, null);
    });
};

//find by id
Client.findById = (clientId) => {
  const query = `SELECT * FROM client WHERE id = ?`;

  return new Promise((resolve, reject) => {
    sql.query(query, [clientId], (error, res) => {
      if (error) {
        console.log('error: ', error);
        reject(error);
      } else {
        if (res.length) {
          console.log('found client: ', res[0]);
          resolve(res[0]);
        } else {
          reject({ kind: 'not_found' });
        }
      }
    });
  });
};

//get all
Client.getAll = () => {
  const query = `SELECT * FROM client`;

  return db
    .query(query)
    .then((res) => {
      console.log('clients: ', res);
      return res;
    })
    .catch((error) => {
      console.log('error: ', error);
      throw error;
    });
};

//update by id
Client.updateById = (id, client) => {
  const query = `UPDATE client SET name = ? WHERE id = ?`;

  return db
    .query(query, [client.name, id])
    .then((res) => {
      console.log('updated client: ', {
        id: id,
        ...client,
      });
      return res;
    })
    .catch((error) => {
      console.log('error: ', error);
      throw error;
    });
};

//remove by id
Client.remove = (id) => {
  return db
    .query('DELETE FROM client WHERE id = ?', id)
    .then((res) => {
      console.log('deleted client with id: ', id);
      return res;
    })
    .catch((error) => {
      console.log('error: ', error);
      throw error;
    });
};

//remove all
Client.removeAll = () => {
  return db
    .query('DELETE FROM client')
    .then((res) => {
      console.log(`deleted ${res.affectedRows} clients`);
      return res;
    })
    .catch((error) => {
      console.log('error: ', error);
      throw error;
    });
};

module.exports = Client;
