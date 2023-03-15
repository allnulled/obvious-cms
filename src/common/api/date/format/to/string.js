module.exports = function(date, mode = "full", separator_1 = "/", separator_2 = " ", separator_3 = ":", separator_4 = ".") {
    const year = this.api.string.pad_left(date.getFullYear(), 4);
    const month = this.api.string.pad_left(date.getMonth() + 1, 2);
    const day = this.api.string.pad_left(date.getDate(), 2);
    const hour = this.api.string.pad_left(date.getHours(), 2);
    const minute = this.api.string.pad_left(date.getMinutes(), 2);
    const second = this.api.string.pad_left(date.getSeconds(), 2);
    const millisecond = this.api.string.pad_left(date.getMilliseconds(), 3);
    if(mode === "day") {
        return `${year}${separator_1}${month}${separator_1}${day}`;
    }
    return `${year}${separator_1}${month}${separator_1}${day}${separator_2}${hour}${separator_3}${minute}${separator_3}${second}${separator_4}${millisecond}`;
}