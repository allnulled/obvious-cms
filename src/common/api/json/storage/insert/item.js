module.exports = function (json_data, data_type, data_item) {
    if (typeof json_data !== "object") {
        throw new Error("Parameter «json_data» must be an object to «common.api.json.storage.insert.item»");
    }
    if (typeof data_type !== "string") {
        throw new Error("Parameter «data_type» must be a string to «common.api.json.storage.insert.item»");
    }
    if (typeof data_item !== "object") {
        throw new Error("Parameter «data_item» must be an object to «common.api.json.storage.insert.item»");
    }
    if(!("#ids" in json_data)) {
        throw new Error("Parameter «json_data» should have an '#ids' property to «common.api.json.storage.insert.item»");
    }
    if(!(data_type in json_data["#ids"])) {
        throw new Error("Parameter «json_data.#ids» should have the «data_type» as property to «common.api.json.storage.insert.item»");
    }
    const next_id = ++json_data["#ids"][data_type];
    data_item._id = next_id;
    json_data[data_type][next_id] = data_item;
    return next_id;
};