module.exports = async function () {
    try {
        this.api.utilities.trace("src/framework/api/database/connect.js");
        if(typeof this.api.database.connection !== "string") {
            return this.api.database.connection;
        }
        this.api.database.connection = await this.api.dependencies.mysql2promise.createPool({
            host: process.env.DATABASE_HOST,
            port: process.env.DATABASE_PORT,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            /////////////////////////////////////////////
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
            idleTimeout: 10 * 1000, // idle connections timeout, in milliseconds, the default value 60000
            queueLimit: 0
            /////////////////////////////////////////////
        });
        const result = await this.api.database.connection.query("SELECT 5 AS 'total';");
        const [[{ total }]] = result;
        if(total !== 5) {
            throw new Error("Database connection was not successfully stablished");
        }
    } catch (error) {
        this.api.utilities.error.handle("src/framework/api/database/connect.js", error, true, true); // killer error here: database must be connectable
    }
};