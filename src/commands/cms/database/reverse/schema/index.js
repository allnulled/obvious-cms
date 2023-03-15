(async function() {
    try {
        const load_path = require("path").resolve(__dirname + "/../../../../../../src/load.js");
        const load_app = require(load_path);
        const { framework } = await load_app();
        await framework.api.database.schema.reverse();
        await framework.api.utilities.shutdown();
        const schema_path = require("path").resolve(__dirname + "/../../../../../../src/framework/api/database/schema/reversed.json");
        console.log("✓ The database schema was successfully exported to:\n  ✓ " + schema_path);
    } catch(error) {
        console.log("Error reversing database schema:", error);
        console.log("Take into account that this command requires the database user to have privileges on INFORMATION_SCHEMA database to work.");
    }
})();