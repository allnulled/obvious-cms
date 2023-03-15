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
                pass: "dummy_user_1",
                profile_picture: null,
                permissions: ["dummy_permission_1"],
                groups: ["dummy_group_2"]
            },
            dummy_user_2: {
                name: "dummy_user_2",
                pass: "dummy_user_2",
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
            const Check = require("@allnulled/check-that");
            const authentication_data_for_user_1 = await this.framework_all.api.auth.authenticate.token("un.token.dummy");
            const authentication_data_for_user_2 = await this.framework_all.api.auth.authenticate.token("un.token.dummy.2");
            Testear_authorize_only: {
                Testear_authorize_only_user: {
                    // User 1:
                    Check.that(authentication_data_for_user_1).throwsOn(x => this.framework_all.api.auth.authorize.only.users(["dummy_user_2"], x));
                    Check.that(authentication_data_for_user_1).doesNotThrowOn(x => this.framework_all.api.auth.authorize.only.users(["dummy_user_1"], x));
                    // User 21:
                    Check.that(authentication_data_for_user_2).throwsOn(x => this.framework_all.api.auth.authorize.only.users(["dummy_user_1"], x));
                    Check.that(authentication_data_for_user_2).doesNotThrowOn(x => this.framework_all.api.auth.authorize.only.users(["dummy_user_2"], x));
                }
                Testear_authorize_only_group: {
                    // User 1:
                    Check.that(authentication_data_for_user_1).throwsOn(x => this.framework_all.api.auth.authorize.only.groups(["dummy_group_1"], x));
                    Check.that(authentication_data_for_user_1).doesNotThrowOn(x => this.framework_all.api.auth.authorize.only.groups(["dummy_group_2"], x));
                    // User 2:
                    Check.that(authentication_data_for_user_2).throwsOn(x => this.framework_all.api.auth.authorize.only.groups(["dummy_group_1"], x));
                    Check.that(authentication_data_for_user_2).throwsOn(x => this.framework_all.api.auth.authorize.only.groups(["dummy_group_2"], x));
                }
                Testear_authorize_only_permission: {
                    // User 1:
                    Check.that(authentication_data_for_user_1).doesNotThrowOn(x => this.framework_all.api.auth.authorize.only.permissions(["dummy_permission_1"], x));
                    Check.that(authentication_data_for_user_1).throwsOn(x => this.framework_all.api.auth.authorize.only.permissions(["dummy_permission_2"], x));
                    Check.that(authentication_data_for_user_1).throwsOn(x => this.framework_all.api.auth.authorize.only.permissions(["dummy_permission_3"], x));
                    Check.that(authentication_data_for_user_1).throwsOn(x => this.framework_all.api.auth.authorize.only.permissions(["dummy_permission_4"], x));
                    Check.that(authentication_data_for_user_1).doesNotThrowOn(x => this.framework_all.api.auth.authorize.only.permissions(["dummy_permission_5"], x));
                    Check.that(authentication_data_for_user_1).doesNotThrowOn(x => this.framework_all.api.auth.authorize.only.permissions(["dummy_permission_6"], x));
                    Check.that(authentication_data_for_user_1).throwsOn(x => this.framework_all.api.auth.authorize.only.permissions(["dummy_permission_7"], x));
                    // User 2:
                    Check.that(authentication_data_for_user_2).throwsOn(x => this.framework_all.api.auth.authorize.only.permissions(["dummy_permission_1"], x));
                    Check.that(authentication_data_for_user_2).throwsOn(x => this.framework_all.api.auth.authorize.only.permissions(["dummy_permission_2"], x));
                    Check.that(authentication_data_for_user_2).throwsOn(x => this.framework_all.api.auth.authorize.only.permissions(["dummy_permission_3"], x));
                    Check.that(authentication_data_for_user_2).throwsOn(x => this.framework_all.api.auth.authorize.only.permissions(["dummy_permission_4"], x));
                    Check.that(authentication_data_for_user_2).throwsOn(x => this.framework_all.api.auth.authorize.only.permissions(["dummy_permission_5"], x));
                    Check.that(authentication_data_for_user_2).throwsOn(x => this.framework_all.api.auth.authorize.only.permissions(["dummy_permission_6"], x));
                    Check.that(authentication_data_for_user_2).doesNotThrowOn(x => this.framework_all.api.auth.authorize.only.permissions(["dummy_permission_7"], x));
                }
            }
            Testear_authorize_except: {
                Testear_authorize_except_user: {
                    // User 1:
                    Check.that(authentication_data_for_user_1).doesNotThrowOn(x => this.framework_all.api.auth.authorize.except.users(["dummy_user_2"], x));
                    Check.that(authentication_data_for_user_1).throwsOn(x => this.framework_all.api.auth.authorize.except.users(["dummy_user_1"], x));
                    // User 21:
                    Check.that(authentication_data_for_user_2).doesNotThrowOn(x => this.framework_all.api.auth.authorize.except.users(["dummy_user_1"], x));
                    Check.that(authentication_data_for_user_2).throwsOn(x => this.framework_all.api.auth.authorize.except.users(["dummy_user_2"], x));
                }
                Testear_authorize_except_group: {
                    // User 1:
                    Check.that(authentication_data_for_user_1).doesNotThrowOn(x => this.framework_all.api.auth.authorize.except.groups(["dummy_group_1"], x));
                    Check.that(authentication_data_for_user_1).throwsOn(x => this.framework_all.api.auth.authorize.except.groups(["dummy_group_2"], x));
                    // User 2:
                    Check.that(authentication_data_for_user_2).doesNotThrowOn(x => this.framework_all.api.auth.authorize.except.groups(["dummy_group_1"], x));
                    Check.that(authentication_data_for_user_2).doesNotThrowOn(x => this.framework_all.api.auth.authorize.except.groups(["dummy_group_2"], x));
                }
                Testear_authorize_except_permission: {
                    // User 1:
                    Check.that(authentication_data_for_user_1).throwsOn(x => this.framework_all.api.auth.authorize.except.permissions(["dummy_permission_1"], x));
                    Check.that(authentication_data_for_user_1).doesNotThrowOn(x => this.framework_all.api.auth.authorize.except.permissions(["dummy_permission_2"], x));
                    Check.that(authentication_data_for_user_1).doesNotThrowOn(x => this.framework_all.api.auth.authorize.except.permissions(["dummy_permission_3"], x));
                    Check.that(authentication_data_for_user_1).doesNotThrowOn(x => this.framework_all.api.auth.authorize.except.permissions(["dummy_permission_4"], x));
                    Check.that(authentication_data_for_user_1).throwsOn(x => this.framework_all.api.auth.authorize.except.permissions(["dummy_permission_5"], x));
                    Check.that(authentication_data_for_user_1).throwsOn(x => this.framework_all.api.auth.authorize.except.permissions(["dummy_permission_6"], x));
                    Check.that(authentication_data_for_user_1).doesNotThrowOn(x => this.framework_all.api.auth.authorize.except.permissions(["dummy_permission_7"], x));
                    // User 2:
                    Check.that(authentication_data_for_user_2).doesNotThrowOn(x => this.framework_all.api.auth.authorize.except.permissions(["dummy_permission_1"], x));
                    Check.that(authentication_data_for_user_2).doesNotThrowOn(x => this.framework_all.api.auth.authorize.except.permissions(["dummy_permission_2"], x));
                    Check.that(authentication_data_for_user_2).doesNotThrowOn(x => this.framework_all.api.auth.authorize.except.permissions(["dummy_permission_3"], x));
                    Check.that(authentication_data_for_user_2).doesNotThrowOn(x => this.framework_all.api.auth.authorize.except.permissions(["dummy_permission_4"], x));
                    Check.that(authentication_data_for_user_2).doesNotThrowOn(x => this.framework_all.api.auth.authorize.except.permissions(["dummy_permission_5"], x));
                    Check.that(authentication_data_for_user_2).doesNotThrowOn(x => this.framework_all.api.auth.authorize.except.permissions(["dummy_permission_6"], x));
                    Check.that(authentication_data_for_user_2).throwsOn(x => this.framework_all.api.auth.authorize.except.permissions(["dummy_permission_7"], x));
                }
            }
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