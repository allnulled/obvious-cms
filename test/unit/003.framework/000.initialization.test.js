module.exports = async function() {
    this.framework_all = await require(`${__dirname}/../../../src/start.js`);
}