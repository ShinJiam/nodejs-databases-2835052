/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
const MySQL = require("mysql2/promise");
const user = require("../../../shopper/server/routes/admin/user");
const CoinAPI = require('../CoinAPI');

class MySQLBackend {

  constructor() {
    this.coinAPI = new CoinAPI();
    this.connection = null;
  }

  async connect() {
    this.connection = await MySQL.createConnection({
      host: 'localhost',
      port: 3406,
      user: "root",
      password: "mypassword",
      database: 'maxcoin'
    });
    return this.connnection;
  }

  async disconnect() {
    return this.connection.end();
  }

  async insert() {
    const data = await this.coinAPI.fetch();
    const sql = "Insert into coinvalues (valuedate,coinvalue) values ?";
    const values = [];
    Object.entries(data.bpi).forEach((entry) => {
      values.push([entry[0], entry[1]]);
    });
    return this.connection.query(sql, [values]);
  }

  async getMax() {
    return this.connection.query('select * from coinvalues order by coinvalue desc limit 1');
  }

  async max() {
    console.info("Connection to Mysql");
    console.time("mysql-connect");
    const connection = this.connect();
    if (connection) {
      console.info("Successfully connected to Mysql");
    } else {
      throw new Error("Connecting to Mysql failed");
    }
    console.timeEnd("mysql-connect");

    console.info("Inserting into Mysql");
    console.time("mysql-insert");
    const insertResult = await this.insert();
    console.timeEnd("mysql-insert");

    console.info(`Inserted ${insertResult[0].affectedRows} documents into Mysql`);

    console.info("Querying Mysql");
    console.time("mysql-find");
    const result = await this.getMax();
    const row = result[0][0];
    console.timeEnd("mysql-find");

    console.info("Disconnecting from Mysql");
    console.time("mysql-disconnect");
    await this.disconnect();
    console.timeEnd("mysql-disconnect");
    return row;
  }
}

module.exports = MySQLBackend;