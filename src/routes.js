module.exports = async function () {
    try {
        const routes = [];
        const routing_json = await this.api.dependencies.fs.promises.readFile(__dirname + "/www/configurations/routing.json", "utf8");
        const routing = JSON.parse(routing_json);
        for(let index_route = 0; index_route < routing.length; index_route++) {
            try {
                const route = routing[index_route];
                const route_adapted = Object.assign({}, route, {
                    middleware: eval(route.middleware_source || "[]"),
                    controller: eval(route.controller_source || "this.api.server.controller.message('Empty endpoint')")
                });
                routes.push(route_adapted);
            } catch (error) {
                this.api.utilities.error.handle("src/www/configurations/routing.json#" + index_route, error);
            }
        }
        return routes;
    } catch (error) {
        this.api.utilities.error.handle("src/routes.js", error);
    }
};