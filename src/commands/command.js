#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const parameters = [].concat(process.argv);
const node_binary = parameters.shift();
const command_binary = parameters.shift();
let command_parameter = [];
let no_parameters_yet = true;
let command_parameter_path = "";

Extract_parameters: {
    while (no_parameters_yet) {
        if (parameters.length === 0) {
            no_parameters_yet = false;
        } else if (!parameters[0].startsWith("-")) {
            command_parameter.push(parameters.shift());
        } else {
            no_parameters_yet = false;
        }
    }
    if (command_parameter.length === 0) {
        command_parameter.push("help");
    }
    command_parameter_path = path.resolve(__dirname, "cms", ...command_parameter, "index.js");
}

Print_context: {
    console.log(chalk.blueBright.bold(` [ CMS | Command line interface ]`));
    console.log(chalk.blueBright.bold(` · Node.js:        `) + " " + chalk.greenBright.bold(`${node_binary}`));
    console.log(chalk.blueBright.bold(` · Command.js:     `) + " " + chalk.greenBright.bold(`${command_binary}`));
    if (command_parameter.length) {
        console.log(chalk.blueBright.bold(` · Subcommand path:`) + " " + chalk.greenBright.bold(`${command_parameter_path}`));
        console.log(chalk.blueBright.bold(` · Subcommand:     `) + " " + chalk.greenBright.bold(`cms ${command_parameter.join(" ")}`));
    }
    if (parameters.length) {
        console.log(chalk.blueBright.bold(` · Parameters:`));
        console.log(chalk.greenBright.bold(`   · ${parameters.join("\n   · ")}`));
    }
}

Execute_command: {
    const file_exists = fs.existsSync(command_parameter_path);
    if (!file_exists) {
        console.log(chalk.redBright.bold.underline("ERROR: the subcommand path has no corresponding file."));
    } else {
        let cmd_result = require(command_parameter_path);
        if (typeof cmd_result === "function") {
            cmd_result = cmd_result(path.resolve(__dirname, "..", ".."));
        }
    }
}