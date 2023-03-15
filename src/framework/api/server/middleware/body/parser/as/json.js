module.exports = function (request, response, configurations = {}) {
    return new Promise(ok => {
        this.api.dependencies.body_parser.json(configurations)(request, response, ok);
    });
};