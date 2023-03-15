module.exports = function (project_path) {
    const fs = require("fs");
    const path = require("path");
    const glob = require("glob");
    const chalk = require("chalk");
    console.log(chalk.blueBright.bold(` · Available commands:`));
    const commands_folder = path.resolve(project_path, "src", "commands");
    const indexes_pattern = path.resolve(commands_folder, "**/index.js");
    const indexed_commands = glob.sync(indexes_pattern).map(index_file => {
        const help_text = (() => {
            try {
                const readme_txt_file = index_file.replace(/\/index\.js$/g, "") + "/readme.txt";
                return fs.readFileSync(readme_txt_file).toString().split("\n")[0];
            } catch(error) {
                return "-";
            }
        })();
        return {
            id: index_file.replace(commands_folder, "").replace(/\/index\.js$/g, "").split("/").join(" ").trim(),
            help: help_text
        };
    });
    for(let index = 0; index < indexed_commands.length; index++) {
        const indexed_command = indexed_commands[index];
        const { id, help } = indexed_command;
        console.log(`   · ${chalk.greenBright.bold.underline(id)}: ${chalk.cyan(help)}`);
    }
};