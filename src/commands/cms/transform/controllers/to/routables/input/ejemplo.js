module.exports = {
    name: "Some random controller",
    method: "USE",
    path: "^/some/random/path",
    middleware: function () {
        return []
    },
    controller: function () {
        return function (request, response, next) {
            response.json({ message: "OK!" });
        }
    },
}