module.exports = async function (session_token) {
    try {
        this.api.utilities.trace("src/framework/api/auth/authenticate/token.js");
        const { path } = this.api.dependencies;
        const authorization_file = path.resolve(process.env.CMS_PROJECT_SRC_PATH, "www/configurations/authorization.json");
        const authorization_data = await this.api.common.api.json.hydrate(authorization_file);
        const session_ids = Object.keys(authorization_data.sessions);
        const session_ids_matched = session_ids.filter(session_id => authorization_data.sessions[session_id].token === session_token);
        if (session_ids_matched.length === 0) {
            throw new Error("Parameter «session_token» is not identified as such");
        } else if (session_ids_matched.length !== 1) {
            throw new Error("Session token is duplicated: notify the administrators about the issue");
        }
        const session_id_matched = session_ids_matched[0];
        const session_data = authorization_data.sessions[session_id_matched];
        const user_id = session_data.user;
        const user_data = Object.assign({}, authorization_data.users[user_id], { _id: user_id });
        const group_ids = user_data.groups;
        const groups_data = Object.keys(authorization_data.groups).filter(group_id => group_ids.indexOf(group_id) !== -1).map(group_id => Object.assign({}, authorization_data.groups[group_id], { _id: group_id }));
        const permission_ids_by_user = user_data.permissions;
        const permission_ids_by_group = Object.values(groups_data).map(group_data => group_data.permissions).flat(2);
        const permission_ids_unique = this.api.common.api.array.deduplicate([].concat(permission_ids_by_user).concat(permission_ids_by_group));
        const permissions_data_unique = permission_ids_unique.map(permission_id => Object.assign({}, authorization_data.permissions[permission_id], { _id: permission_id }));
        return {
            session: session_data,
            user: user_data,
            groups: groups_data,
            permissions: permissions_data_unique
        };
    } catch (error) {
        this.api.utilities.error.handle("src/framework/api/auth/authenticate/token.js", error, true);
    }
};