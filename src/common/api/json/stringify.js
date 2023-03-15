module.exports = (data, tabs) => {
    return JSON.stringify(data, this.api.json.get_universal_cyclic_replacer(), tabs);
};
