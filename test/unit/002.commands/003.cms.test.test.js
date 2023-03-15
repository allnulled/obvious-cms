module.exports = function () {
    return new Promise((ok, fail) => {
        setTimeout(() => ok(), this.config.empty_test_interval);
    });
}