module.exports = async function() {
    try {
        this.api.utilities.trace("src/framework/api/database/schema/reverse.js");
        await require("mysql-schema").getSchema({
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            host: process.env.DATABASE_HOST,
            port: process.env.DATABASE_PORT,
            database: process.env.DATABASE_NAME,
            configurations: false,
            extensions: __dirname + "/extensions.js",
            asJson: true,
            output: __dirname + "/reversed.json"
        });
    } catch (error) {
        this.api.utilities.error.handle("src/framework/api/database/schema/reverse.js", error);
        console.log("Take into account that this command requires the database user to have privileges on INFORMATION_SCHEMA database to work.");
    }
}