module.exports = function() {
    let was_fail = false;
    try {
        this.common.api.error.throw("Un error controlado");
    } catch(error) {
        was_fail = true;
    }
    if(!was_fail) throw new Error("Falló el this.common.api.error.throw")
}