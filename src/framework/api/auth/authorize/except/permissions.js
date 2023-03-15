module.exports = function (permission_names, authenticate_data, operation_id = undefined) {
    this.api.utilities.trace("src/framework/api/auth/authorize/except/permissions.js");
    if(!Array.isArray(permission_names)) {
        throw new Error("Parameter «permission_names» must be an array");
    }
    if (typeof authenticate_data !== "object") {
        throw new Error("Parameter «authentication_data» must be an object");
    }
    if (typeof authenticate_data.permissions !== "object") {
        throw new Error("Parameter «authentication_data.permissions» must be an object");
    }
    const matched_permissions = authenticate_data.permissions.filter(permission_data => permission_names.indexOf(permission_data.name) !== -1);
    if (matched_permissions.length !== 0) {
        throw new Error("Denied authorization for the operation: " + (operation_id || "undefined"));
    }
    return true;
};