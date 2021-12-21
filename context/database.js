const {Client, Pool} = require('pg')
const dbConfig = require('./db-config')

class Database {
    constructor() {
        this.connected = false
        this.client = new Client({
            user: dbConfig.user,
            password: dbConfig.password,
            database: dbConfig.database,
            host: dbConfig.host,
            port: dbConfig.port
        })

        this.client.on("disconnect", function (ended) {
            this.connected = false
            console.log("client disconnected")
        })
        this.client.on("connect", function (ended) {
            this.connected = true
            console.log("client connected")
        })
    }

    async all(text, values = []) {
        await this.reconnect()
        return await this.client.query(text, values);
    }

    async get(text, values = []) {
        await this.reconnect()
        return await this.client.query(text, values);
    }

    async reconnect() {
        if (!this.connected){
            this.connected = true
            await this.client.connect()
        }
    }
}

module.exports = Database
