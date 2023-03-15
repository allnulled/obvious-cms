module.exports = function(error, details = {}, request = undefined, response = undefined) {
    const { fs } = this.api.dependencies;
    const MAX_FILE_SIZE = 1000 * 1000 * 2;
    let origin = null;
    if(request) {
        origin = {
            url: request.url,
            params: Object.keys(request.params).join(", "),
            query: Object.keys(request.query).join(", "),
            headers: Object.keys(request.headers).join(", "),
            user_agent: request.headers["user-agent"],
            ip_remote: request.socket.remoteAddress,
            host: request.headers.host,
            referer: request.headers["referer"],
            authorization: request.headers["authorization"],
            x_forwarded_for: request.headers["x-forwarded-for"],
        };
    }
    const date_string = this.api.common.api.date.format.to.string(new Date(), "day", "-");
    let error_message = "";
    error_message += `[ERROR] ${error.message}\n`;
    error_message += ` [DATE] ${this.api.common.api.date.format.to.string(new Date(), "full")}\n`;
    if(origin) {
        error_message += " [USER]\n";
        for(let prop in origin) {
            error_message += `  [${prop.toUpperCase()}] ${origin[prop]}\n`;
        }
    }
    if(details && Object.keys(details).length) {
        error_message += " [DETAILS]\n";
        for (let prop in details) {
            error_message += `  [${prop.toUpperCase()}] ${details[prop]}\n`;
        }
    }
    error_message += "--------------\n";
    const current_logs_file = `${__dirname}/files/errors/log.${date_string}.txt`;
    fs.stat(current_logs_file, (error, stats) => {
        if(stats && (stats.size > MAX_FILE_SIZE)) {
            console.log(stats.size);
            const random_string = this.api.common.api.string.random(10);
            fs.rename(current_logs_file, current_logs_file + "." + random_string + ".bkp", () => {
                fs.appendFile(current_logs_file, error_message,  "utf8", this.api.dependencies.noop);
            });
        } else {
            console.log(stats.size);
            fs.appendFile(current_logs_file, error_message, "utf8", this.api.dependencies.noop);
        }
    });
}