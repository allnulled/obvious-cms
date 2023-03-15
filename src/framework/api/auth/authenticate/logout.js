module.exports = async function (session_token) {
    try {
        this.api.utilities.trace("src/framework/api/auth/authenticate/logout.js");
        const { path } = this.api.dependencies;
        const authorization_file = path.resolve(process.env.CMS_PROJECT_SRC_PATH, "www/configurations/authorization.json");
        Obtener_y_eliminar_sesion: {
            await this.api.common.api.json.lock.hydrate(authorization_file, {}, {}, async authorization_data => {
                let session_id_matched = undefined;
                Obtener_sesion: {
                    const session_ids = Object.keys(authorization_data.sessions);
                    const session_ids_matched = session_ids.filter(session_id => authorization_data.sessions[session_id].token === session_token);
                    if (session_ids_matched.length === 0) {
                        throw new Error("Parameter «session_token» is not identified as such");
                    } else if (session_ids_matched.length !== 1) {
                        throw new Error("User session is duplicated: notify the administrators about the issue");
                    }
                    session_id_matched = session_ids_matched[0];
                }
                Eliminar_sesion: {
                    delete authorization_data.sessions[session_id_matched];
                    // Modify JSON file:
                    return authorization_data;
                }
            });
        }
        return true;
    } catch (error) {
        this.api.utilities.error.handle("src/framework/api/auth/authenticate/logout.js", error, true);
    }
};