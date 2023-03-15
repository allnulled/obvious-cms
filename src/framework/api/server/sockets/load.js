module.exports = async function () {
    try {
        this.api.utilities.trace("src/framework/api/server/sockets/load.js");
        const socket_io = this.api.dependencies.socket_io;
        const socket_io_server = new socket_io.Server(this.api.server.http.instance);
        socket_io_server.on("connection", (socket) => {
            this.api.utilities.trace(`Connected new socket#${socket.id}`);
            socket.emit("server to client message", {
                user: "server",
                message: `Someone new was connected.`
            });
            socket.on("client to server message", (data) => {
                this.api.utilities.trace("Message from client to server: " + data.message);
                socket_io_server.emit("server to client message", {
                    ...data,
                    user: socket.id,
                });
            });
            socket.on("disconnect", () => {
                this.api.utilities.trace(`Disconnected someone.`);
            });
        });
    } catch (error) {
        this.api.utilities.error.handle("src/framework/api/server/sockets/load.js", error);
    }
};