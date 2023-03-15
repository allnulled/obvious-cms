const Spinnies = require("spinnies");
const spinnies = new Spinnies({
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
spinnies.add("starting-cms", {
    text: "Starting CMS...",
    color: "greenBright"
});

const start_path = require("path").resolve(__dirname + "/../../../../src/start.js");
require(start_path).then(() => {
    spinnies.succeed("starting-cms");
}).catch((error) => {
    console.log(error);
    spinnies.fail("starting-cms");
});
