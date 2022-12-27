/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
const { MongoClient } = require("mongodb");

const CoinAPI = require("../CoinAPI");

class MongoBackend {
  constructor() {
    this.coinAPI = new CoinAPI();
    this.mongoURL = "mongodb://localhost:37017/maxcoin";
    this.client = null;
    this.collection = null;
  }

  async connect() {
    const mongoClient = new MongoClient(this.mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });
    this.client = await mongoClient.connect();
    this.collection = this.client.db("maxcoin").collection("values");
    console.info("Wait");
    return this.client;
  }

  async disconnect() {
    if (this.client) {
      return this.client.close();
    }
    return false;
  }

  async insert() { }

  async getMax() { }

  async max() {
    console.info("Connect to Mongol Horde");
    console.time("mongodb-connect");
    const client = await this.connect();
    if (client) {
      console.info("Hail Genghis Khan");
    } else {
      throw new Error("Genghis Khan failed the Mongol");
    }
    console.timeEnd("mongodb-connect");
    console.info("Leave the Mongol Horde");
    console.time("mongodb-disconnect");
    await this.disconnect();
    console.timeEnd("mongodb-disconnect");
  }
}

module.exports = MongoBackend;
