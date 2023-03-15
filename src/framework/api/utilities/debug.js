module.exports = function (data, depth = 10) {
    console.log("[DEBUG]", require("util").inspect(data, true, depth, true));
}