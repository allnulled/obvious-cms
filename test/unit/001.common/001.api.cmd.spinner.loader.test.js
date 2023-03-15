module.exports = async function () {
    this.common.api.cmd.spinner.loader.start("un spinner", { text: "Spinner de test de 1 segundo" });
    await this.common.api.time.wait(1000 * 1);
    this.common.api.cmd.spinner.loader.succeed("un spinner");

}