const api_loader = require(`${__dirname}/../framework/api/utilities/api/sync/load.js`);
const common = {};
api_loader(`${__dirname}/api`, common, "api");
module.exports = common;