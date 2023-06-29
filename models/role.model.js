const sql = require('./db.js');
const db = require('../models/db.js');

//create
Role.create = (newRole, result) => {
    // Sélection de la base de données
    sql
      .query('USE myEvaluations')
      .then(() => {
        // Insertion dans la base de données
        return sql.query('INSERT INTO roles SET ?', newRole);
    })
      .then((res) => {
        console.log('created role: ', {
          id: res.insertId,
          ...newRole,
        });
        result(null, { id: res.insertId, ...newRole });
    })
      .catch((error) => {
        console.log('error: ', error);
        result(error, null);
    });
};

//find by id
Role.findById = (roleId) => {
    const query = `SELECT * FROM roles WHERE id = ?`;
  
    return new Promise((resolve, reject) => {
      sql.query(query, [roleId], (error, res) => {
        if (error) {
          console.log('error: ', error);
          reject(error);
        } else {
          if (res.length) {
            console.log('found role: ', res[0]);
            resolve(res[0]);
          } else {
            reject({ kind: 'not_found' });
          }
        }
      });
    });
};

//get all
Role.getAll = () => {
    const query = `SELECT * FROM roles`;
  
    return db
      .query(query)
      .then((res) => {
        console.log('roles: ', res);
        return res;
      })
      .catch((error) => {
        console.log('error: ', error);
        throw error;
      });
};


//update by id
Role.updateById = (id, role) => {
    const query = `UPDATE roles SET libelle = ?, slug = ? WHERE id = ?`;
    return db
      .query(query, [
        role.name,
        id,
      ])
      .then((res) => {
        console.log('updated role: ', {
          id: id,
          ...role,
        });
        return res;
      })
      .catch((error) => {
        console.log('error: ', error);
        throw error;
      });
};

//remove by id
Role.remove = (id) => {
    return db
      .query('DELETE FROM roles WHERE id = ?', id)
      .then((res) => {
        console.log('deleted role with id: ', id);
        return res;
      })
      .catch((error) => {
        console.log('error: ', error);
        throw error;
      });
};

//remove all
Role.removeAll = () => {
    return db
      .query('DELETE FROM roles')
      .then((res) => {
        console.log(`deleted ${res.affectedRows} roles`);
        return res;
      })
      .catch((error) => {
        console.log('error: ', error);
        throw error;
      });
};
  
  module.exports = Role;