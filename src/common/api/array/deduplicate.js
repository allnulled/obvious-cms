module.exports = function(list) {
    const uniques = [];
    for(let index = 0; index < list.length; index++) {
        const item = list[index];
        if(uniques.indexOf(item) === -1) {
            uniques.push(item);
        }
    }
    return uniques;
};