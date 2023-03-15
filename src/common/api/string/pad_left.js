module.exports = function(text_parameter, len = 2, pad = "0") {
    let text = "" + text_parameter;
    while(text.length < len) {
        text += pad;
    }
    return text;
}