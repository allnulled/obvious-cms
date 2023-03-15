const fs = require("fs");
const path = require("path");
const carpeta_input = __dirname + "/input";
const carpeta_output = __dirname + "/output";
const ficheros_input = fs.readdirSync(carpeta_input);

for(let index_fichero = 0; index_fichero < ficheros_input.length; index_fichero++) {
    const fichero_input = path.resolve(carpeta_input, ficheros_input[index_fichero]);
    const fichero_output = path.resolve(carpeta_output, ficheros_input[index_fichero] + "on");
    console.log(` · Transforming file ${index_fichero+1} (${path.basename(fichero_input)})`);
    const controlador_js = require(fichero_input);
    const controlador_json = (() => {
        const controlador_js_2 = {};
        for (let prop in controlador_js) {
            const val = controlador_js[prop];
            if (typeof val === "function") {
                const val_source = val.toString();
                controlador_js_2[prop + "_source"] = `(${val_source})()`
            } else {
                controlador_js_2[prop] = val;
            }
        }
        const output_json = JSON.stringify(controlador_js_2, null, 2);
        return output_json;
    })();
    fs.writeFileSync(fichero_output, controlador_json, "utf8");
}