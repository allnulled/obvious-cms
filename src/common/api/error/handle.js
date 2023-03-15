module.exports = function (signature, error, propagate = false, killer = false) {
    console.log("[ERROR]", signature, error);
    if (killer) {
        process.exit(0);
    }
    if (propagate) {
        throw error;
    }
}