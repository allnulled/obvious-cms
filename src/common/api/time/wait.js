module.exports = function(time) {
    return new Promise(ok => {
        setTimeout(ok, time);
    });
}