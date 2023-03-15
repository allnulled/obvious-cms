module.exports = async function () {
    try {
        const common = require(`${__dirname}/common/index.js`);
        const framework_loader = require(`${__dirname}/framework/index.js`);
        const framework = await framework_loader();
        await framework.api.settings.load();
        await framework.api.dependencies.load();
        await framework.api.database.load();
        await framework.api.server.app.load();
        await framework.api.server.http.load();
        await framework.api.server.https.load();
        await framework.api.server.sockets.load();
        return { common, framework };
    } catch (error) {
        console.log("Error on «src/load.js»", error);
    }
};