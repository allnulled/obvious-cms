module.exports = async function (user_name, user_password) {
    try {
        this.api.utilities.trace("src/framework/api/auth/authenticate/login.js");
        const { path } = this.api.dependencies;
        const authorization_file = path.resolve(process.env.CMS_PROJECT_SRC_PATH, "www/configurations/authorization.json");
        let session_token = undefined;
        let session_data = undefined;
        let authentication_data = undefined;
        Obtener_token_de_sesion: {
            await this.api.common.api.json.lock.hydrate(authorization_file, {}, {}, async authorization_data => {
                let user_id_matched = undefined;
                let user_data = undefined;
                Identificar_usuario: {
                    console.log(authorization_data);
                    const user_ids = Object.keys(authorization_data.users);
                    const user_ids_matched = user_ids.filter(user_id => authorization_data.users[user_id].name === user_name);
                    if (user_ids_matched.length === 0) {
                        throw new Error("Parameter «user_name» is not identified as such");
                    } else if (user_ids_matched.length !== 1) {
                        throw new Error("User name is duplicated: notify the administrators about the issue");
                    }
                    user_id_matched = user_ids_matched[0];
                    user_data = authorization_data.users[user_id_matched];
                    if (user_data.password !== user_password) {
                        throw new Error("User password is not correct");
                    }
                }
                Obtener_o_registrar_sesion: {
                    const session_ids = Object.keys(authorization_data.sessions);
                    const session_ids_matched = session_ids.filter(session_id => authorization_data.sessions[session_id].user === user_id_matched);
                    if (session_ids_matched.length === 0) {
                        Registrar_sesion: {
                            session_token = this.api.common.api.string.random(20);
                            session_data = {
                                user: user_id_matched,
                                token: session_token
                            };
                            this.api.common.api.json.storage.insert.item(authorization_data, "sessions", session_data);
                            // Modify JSON file:
                            return authorization_data;
                        }
                    } else if(session_ids_matched.length !== 1) {
                        throw new Error("User session is duplicated: notify the administrators about the issue");
                    }
                    const session_id_matched = session_ids_matched[0];
                    session_data = authorization_data.sessions[session_id_matched];
                    // Do NOT modify JSON file:
                    return undefined;
                }
            });
        }
        Autentificar_token_de_sesion: {
            authentication_data = await this.api.auth.authenticate.token(session_data.token);
        }
        return authentication_data;
    } catch (error) {
        this.api.utilities.error.handle("src/framework/api/auth/authenticate/login.js", error, true);
    }
};