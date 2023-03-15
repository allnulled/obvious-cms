module.exports = async function() {
    try {
        await this.framework_all.api.utilities.shutdown();
    } catch(error) {
        console.log(error);
        throw error;
    }
}