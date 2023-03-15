const config = {
    empty_test_interval: 1000 * 0
};
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const Spinnies = require("spinnies");
const test_spinner = new Spinnies({
    color: "blue",
    succeedColor: "green",
    spinner: {
        interval: 80,
        frames: [
            '⡿',
            '⣟',
            '⣯',
            '⣷',
            '⣾',
            '⣽',
            '⣻',
            '⢿'
        ].reverse()
    }
});

let index_tests = 0;
const test_errors = [];
const test_api = { config, test_spinner };
const test_recursively = async function(directory_or_file, subpath = []) {
    const is_directory = fs.lstatSync(directory_or_file).isDirectory();
    if(is_directory) {
        const subfiles = fs.readdirSync(directory_or_file).sort();
        for(let index_files = 0; index_files < subfiles.length; index_files++) {
            const subfile = subfiles[index_files];
            const subfile_path = path.resolve(directory_or_file, subfile);
            await test_recursively(subfile_path, subpath.concat(subfile));
        }
    } else if(directory_or_file.endsWith(".test.js")) {
        const test_id = `Testing-file-${index_tests}`;
        try {
            await test_api.test_spinner.add(test_id, {
                text: `Testing file ${index_tests+1} on: ${subpath.join("/")}`,
                color: "greenBright"
            });
            let test_module = require(directory_or_file);
            if(typeof test_module === "function") {
                test_module = test_module.call(test_api);
            }
            await test_module;
            await test_api.test_spinner.succeed(test_id);
        } catch(error) {
            console.log(" · " + chalk.red.bold.underline(`Error name:`) + " " + error.name);
            console.log(" · " + chalk.red.bold.underline(`Error message:`) + " " + error.message);
            console.log(" · " + chalk.red.bold.underline(`Error stack:`),  error.stack);
            try {
                await test_api.test_spinner.fail(test_id);
            } catch(error) {}
            test_errors.push({
                id: test_id,
                order: index_tests+1,
                file: subpath.join("/"),
                error
            });
        } finally {
            index_tests++;
        }
    }
};

test_recursively(`${__dirname}/unit`, [".","test","unit"]).then(() => {
    if(test_errors.length) {
        console.log(chalk.redBright.bold("Unit tests finished with errors:"));
        console.log(test_errors);
    } else {
        console.log(chalk.greenBright.bold("✓✓✓ All test were finished successfully"))
    }
    test_api.test_spinner.stopAll();
    for(let index = 0; index < 999999; index++) {
        clearInterval(index);
        clearTimeout(index);
    }
});
