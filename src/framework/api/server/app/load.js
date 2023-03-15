module.exports = async function () {
    try {
        this.api.utilities.trace("src/framework/api/server/app/load.js");
        this.api.server.app.instance = this.api.dependencies.express();
        const routes_file = this.api.dependencies.path.resolve(__dirname + "/../../../../routes.js");
        this.api.server.app.routes = require(routes_file);
        Inyeccion_de_dependencias: {
            this.api.server.app.instance.use((request, response, next) => {
                request.fw = this;
                response.fw = this;
                request.fw_data = {};
                return next();
            });
        }
        Dinamizacion_de_rutas: {
            this.api.server.app.router_callback = async (request, response, next, ...others) => {
                try {
                    this.api.server.app.router = new this.api.dependencies.express.Router();
                    delete require.cache[routes_file];
                    const routes_factory = require(routes_file);
                    this.api.server.app.routes = await routes_factory.call(this);
                    const all_routes = this.api.server.app.routes;
                    for (let index_route = 0; index_route < all_routes.length; index_route++) {
                        const route = all_routes[index_route];
                        try {
                            this.api.server.app.router[route.method.toLowerCase()](route.path, route.middleware, route.controller);
                        } catch(error) {
                            console.log(`Error mounting dynamic route #${index_route} named: ${route.name}`);
                            throw error;
                        }
                    }
                    return this.api.server.app.router(request, response, next, ...others);
                } catch (error) {
                    return next(error);
                }
            };
            this.api.server.app.instance.use(this.api.server.app.router_callback);
        }
    } catch (error) {
        this.api.utilities.error.handle("src/framework/api/server/app/load.js", error);
    }
};