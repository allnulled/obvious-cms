module.exports = () => {
    const seen = new WeakSet();
    return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        } else if (typeof value === "function") {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
            return {
                $type: "function",
                $source: value.toString(),
                $keys: Object.keys(value)
            };
        } else if (typeof value === "undefined") {
            return "null";
        } else {
            return value;
        }
        return value;
    };
};