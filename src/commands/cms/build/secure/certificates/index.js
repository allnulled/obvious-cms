const { execSync } = require("child_process");
const certificates_folder = require("path").resolve(__dirname + "/../../../../../../src/framework/api/server/https/options/");
if(process.platform === "win32") {
    const command_on_windows = "generate-selfsigned-certificates.bat";
    execSync("bat " + JSON.stringify(command_on_windows), {
        cwd: certificates_folder
    });
} else {
    const command_on_linux = "generate-selfsigned-certificates.sh";
    execSync("sh " + JSON.stringify(command_on_linux), {
        cwd: certificates_folder
    });
}