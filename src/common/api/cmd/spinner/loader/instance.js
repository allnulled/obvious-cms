const Spinnies = require("spinnies");

module.exports = new Spinnies({
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