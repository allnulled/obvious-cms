module.exports = function (group_names, authenticate_data, operation_id = undefined) {
    this.api.utilities.trace("src/framework/api/auth/authorize/only/groups.js");
    if(!Array.isArray(group_names)) {
        throw new Error("Parameter «group_names» must be an array");
    }
    if (typeof authenticate_data !== "object") {
        throw new Error("Parameter «authentication_data» must be an object");
    }
    if (typeof authenticate_data.groups !== "object") {
        throw new Error("Parameter «authentication_data.groups» must be an object");
    }
    const matched_groups = authenticate_data.groups.filter(group_data => group_names.indexOf(group_data.name) !== -1);
    if(matched_groups.length === 0) {
        throw new Error("Required authorization for the operation: " + (operation_id || "undefined"));
    }
    return matched_groups;
};