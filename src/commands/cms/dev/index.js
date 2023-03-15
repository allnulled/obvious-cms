require("child_process").execSync("./node_modules/.bin/nodemon --ignore './node_modules' -w './src' -x './src/commands/command.js start'", {
    cwd: require("path").resolve(__dirname + "/../../../..")
});