// import database
const db = require("../config/database");

// membuat class Model Patient
class Patient {
  /**
   * Membuat method static all.
   */

  static all() {
    // return Promise sebagai solusi Asynchronous
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM patients";
      /**
       * Melakukan query menggunakan method query.
       * Menerima 2 params: query dan callback
       */
      db.query(sql, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  /**
   * TODO 1: Buat fungsi untuk insert data.
   * Method menerima parameter data yang akan diinsert.
   * Method mengembalikan data patient yang baru diinsert.
   */

  static async create(data, callback) {
    // Promise 1: melakukan insert data ke database 
    const id = await new Promise((resolve, reject) => { 
      const sql = "INSERT INTO patients SET ?"; 
      db.query(sql, data, (err, results) => { 
        resolve(results. insertId);
      });
    });

    // Refactor promise 2: get data by id 
    const patient = this.find(id);
    return patient;
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM patients WHERE id = ?";
        db.query(sql, id, (err, results) => {
          // destructing array
          const [patient] = results;
          resolve(patient);
      });
    });
  }

  // mengupdate data patient
  static async update(id, data) {
    await new Promise((resolve, reject) => {
      const sql = "UPDATE patients SET ? WHERE ID = ?";
      db.query(sql, [data, id], (err, results) => {
        resolve(results);
      });
    });

    // mencari data yang baru diupdate
    const patient = await this.find(id);
    return patient;
  }

  // menghapus data dari database 
  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM patients WHERE id = ?";
      db.query(sql, id, (err, results) => { 
        resolve(results);
      });
    });
  }

  // mencari data berdasarkan id
  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM patients WHERE id = ?"; db.query(sql, id, (err, results) => {
      // destructing array
        const [patient] = results; 
        resolve(patient);
      });
    });
  }

  static async search(name) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM patients WHERE name LIKE ?";
      const searchTerm = `%${name}%`;

      db.query(sql, searchTerm, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  static async getByStatus(status) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM patients WHERE status = ?";
      db.query(sql, status, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

}
// export class Patient
module.exports = Patient;
