'use strict';

const mysql = require('mysql2/promise');

const config = require('./config');

const sqlPromise = mysql.createConnection(config.mysql);

// checks to see if database can be connected to
(async () => {
  const sql = await sqlPromise;
  console.log('Database connected.');
  // log errors
  sql.on('error', (err) => {
    console.error(err);
    sql.end();
  });
})();

// returns all rows for table week in the database
module.exports.getWeeks = async () => {
  const sql = await sqlPromise;
  const query = 'SELECT * FROM week;';
  const [rows] = await sql.query(query);

  return rows.map((row) => {
    return {
      weekNo: row.weekNo,
      lecTopic: row.lecTopic,
      labTopic: row.labTopic,
      semTopic: row.semTopic,
      resources: row.resources,
    };
  });
};

const GONE = { status: 'gone' };

// deletes a row in the week table with the given id
module.exports.deleteWeek = async (id) => {
  const sql = await sqlPromise;

  const [rows] = await sql.query(sql.format('SELECT * FROM week WHERE weekNo = ?', [id]));
  if (rows.length < 1) {
    throw GONE;
  }

  await sql.query(sql.format('DELETE FROM week WHERE weekNo=?', [id]));
};

// updates existing row to the week table with new data provided by the user
module.exports.updateWeek = async (weekNo, lecTopic, labTopic, semTopic, resources, old) => {
  const sql = await sqlPromise;

  const [rows] = await sql.query(sql.format(
    'UPDATE week SET weekNo = ?, lecTopic = ?,  labTopic = ?, semTopic = ?, resources = ? WHERE weekNo = ?',
    [weekNo, lecTopic, labTopic, semTopic, resources, old],
  ));
  return rows;
};

// adds a new row to the week table with data provided by the user
module.exports.uploadWeek = async (weekNo, lecTopic, labTopic, semTopic, resources) => {
  const sql = await sqlPromise;

  const dbRecord = {
    weekNo,
    lecTopic,
    labTopic,
    semTopic,
    resources,
  };

  const [rows] = await sql.query(sql.format('INSERT INTO week SET ?', dbRecord));

  return rows;
};
