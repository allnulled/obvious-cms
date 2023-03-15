module.exports = function (user_names, authenticate_data, operation_id = undefined) {
    this.api.utilities.trace("src/framework/api/auth/authorize/except/users.js");
    if(!Array.isArray(user_names)) {
        throw new Error("Parameter «user_names» must be an array");
    }
    if (typeof authenticate_data !== "object") {
        throw new Error("Parameter «authentication_data» must be an object");
    }
    if (typeof authenticate_data.user !== "object") {
        throw new Error("Parameter «authentication_data.user» must be an object");
    }
    const is_matched_user = user_names.indexOf(authenticate_data.user.name) !== -1;
    if (is_matched_user) {
        throw new Error("Denied authorization for the operation: " + (operation_id || "undefined"));
    }
    return true;
};