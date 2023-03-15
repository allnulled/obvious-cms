module.exports = async function () {
    try {
        const dummy_session = {
            dummy_session_1: {
                token: "un.token.dummy",
                user: "dummy_user_1"
            },
            dummy_session_2: {
                token: "un.token.dummy.2",
                user: "dummy_user_2"
            }
        };
        const dummy_user = {
            dummy_user_1: {
                name: "dummy_user_1",
                password: "dummy_user_1",
                profile_picture: null,
                permissions: ["dummy_permission_1"],
                groups: ["dummy_group_2"]
            },
            dummy_user_2: {
                name: "dummy_user_2",
                password: "dummy_user_2",
                profile_picture: null,
                permissions: ["dummy_permission_7"],
                groups: []
            }
        };
        const dummy_groups = {
            dummy_group_1: {
                name: "dummy_group_1",
                permissions: ["dummy_permission_2", "dummy_permission_3"]
            },
            dummy_group_2: {
                name: "dummy_group_2",
                permissions: ["dummy_permission_5", "dummy_permission_6"]
            }
        };
        const dummy_permissions = {
            dummy_permission_1: {
                name: "dummy_permission_1",
                description: "dummy_permission_1",
            },
            dummy_permission_2: {
                name: "dummy_permission_2",
                description: "dummy_permission_2",
            },
            dummy_permission_3: {
                name: "dummy_permission_3",
                description: "dummy_permission_3",
            },
            dummy_permission_4: {
                name: "dummy_permission_4",
                description: "dummy_permission_4",
            },
            dummy_permission_5: {
                name: "dummy_permission_5",
                description: "dummy_permission_5",
            },
            dummy_permission_6: {
                name: "dummy_permission_6",
                description: "dummy_permission_6",
            },
            dummy_permission_7: {
                name: "dummy_permission_7",
                description: "dummy_permission_7",
            }
        };
        const authorization_file = this.framework_all.api.dependencies.path.resolve(process.env.CMS_PROJECT_SRC_PATH, "www/configurations/authorization.json");
        const authorization_data = await this.framework_all.api.common.api.json.hydrate(authorization_file);
        Falsear_authorization_json: {
            Object.assign(authorization_data.users, dummy_user);
            Object.assign(authorization_data.sessions, dummy_session);
            Object.assign(authorization_data.groups, dummy_groups);
            Object.assign(authorization_data.permissions, dummy_permissions);
            await this.framework_all.api.common.api.json.dehydrate(authorization_file, authorization_data);
        }
        Testear_funcion: {
            await this.framework_all.api.auth.authenticate.logout("un.token.dummy");
            await this.framework_all.api.auth.authenticate.logout("un.token.dummy.2");
            const authorization_data_3 = await this.framework_all.api.common.api.json.hydrate(authorization_file);
            if ("dummy_session_1" in authorization_data_3.sessions) throw new Error("Logout failing (1)");
            if ("dummy_session_2" in authorization_data_3.sessions) throw new Error("Logout failing (2)");
        }
        Defalsear_authorization_json: {
            const authorization_data_2 = await this.framework_all.api.common.api.json.hydrate(authorization_file);
            Object.keys(dummy_session).forEach(session_id => delete authorization_data_2.sessions[session_id]);
            Object.keys(dummy_user).forEach(user_id => delete authorization_data_2.users[user_id]);
            Object.keys(dummy_groups).forEach(group_id => delete authorization_data_2.groups[group_id]);
            Object.keys(dummy_permissions).forEach(permission_id => delete authorization_data_2.permissions[permission_id]);
            await this.framework_all.api.common.api.json.dehydrate(authorization_file, authorization_data_2, null, 2);
        }
    } catch (error) {
        throw error;
    }
}