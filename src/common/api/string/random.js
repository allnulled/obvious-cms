module.exports = function (len = 10, alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789") {
    let out = "";
    while(out.length < len) {
        out += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return out;
}