const fs = require("fs");
const path = require("path");
/**
 * 
 * Función que sobrecarga recursivamente una variable raíz con módulos JavaScript desde un directorio dado.
 * 
 * @name api_loader
 * @access this.api.utilities.api.load
 * @type {Function}
 * @async true
 * @param {String} directory | required | Directorio a integrar en la API
 * @param {Any} base | required | Objeto último en el proceso de integración
 * @param {String} property_id | optional | Propiedad inmediata a integrar
 * @param {Any} root_parameter | optional | Objeto raíz de la API
 * @param {Array<String>} property_tracker | Trazo de propiedades hasta el lugar actual
 * @returns {Promise<Object>} base | El objeto inicial llenado con la API
 * 
 */
const api_loader = async function (directory, base, property_id, root_parameter = undefined, property_tracker = []) {
    try {
        root_parameter = root_parameter ? root_parameter : base;
        const files = await fs.promises.readdir(directory);
        if(files.indexOf(".noapi") !== -1) {
            return [];
        }
        base[property_id] = {};
        property_tracker.push(property_id);
        Iterando_carpeta:
        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            const filepath = path.resolve(directory, file);
            const subproperty_id = file.replace(/^[0-9]+\./g, "").replace(/(\.(factory|class|static|promiser|promise))?\.js$/g, "").replace(/\-/g, "_");
            const isDirectory = (await fs.promises.lstat(filepath)).isDirectory();
            Caso_de_carpeta: {
                if (isDirectory) {
                    base[property_id][subproperty_id] = {};
                    await api_loader(filepath, base[property_id], subproperty_id, root_parameter, property_tracker.concat([]));
                    continue Iterando_carpeta;
                }
            }
            Caso_de_factory: {
                if (file.endsWith(".factory.js")) {
                    const modulo = require(filepath);
                    console.log(`Loading «factory» on: «${property_tracker.concat([subproperty_id]).join(".")}»`);
                    if (typeof modulo === "function") {
                        const result = modulo.call(root_parameter);
                        base[property_id][subproperty_id] = result;
                    } else {
                        base[property_id][subproperty_id] = modulo;
                    }
                    continue Iterando_carpeta;
                }
            }
            Caso_de_promiser: {
                if (file.endsWith(".promiser.js")) {
                    console.log(`Loading «promiser» on: «${property_tracker.concat([subproperty_id]).join(".")}»`);
                    const modulo = require(filepath);
                    if (typeof modulo === "function") {
                        const result = modulo.call(root_parameter);
                        base[property_id][subproperty_id] = await result;
                    } else {
                        base[property_id][subproperty_id] = modulo;
                    }
                    continue Iterando_carpeta;
                }
            }
            Caso_de_promise: {
                if (file.endsWith(".promise.js")) {
                    console.log(`Loading «promise» on: «${property_tracker.concat([subproperty_id]).join(".")}»`);
                    base[property_id][subproperty_id] = await require(filepath);
                    continue Iterando_carpeta;
                }
            }
            Caso_de_class: {
                if (file.endsWith(".class.js")) {
                    console.log(`Loading «class» on: «${property_tracker.concat([subproperty_id]).join(".")}»`);
                    base[property_id][subproperty_id] = require(filepath);
                    continue Iterando_carpeta;
                }
            }
            Caso_de_static: {
                if (file.endsWith(".static.js")) {
                    console.log(`Loading «static» on: «${property_tracker.concat([subproperty_id]).join(".")}»`);
                    base[property_id][subproperty_id] = require(filepath);
                    continue Iterando_carpeta;
                }
            }
            Caso_de_fichero_js: {
                if (file.endsWith(".js")) {
                    console.log(`Loading «js» on: «${property_tracker.concat([subproperty_id]).join(".")}»`);
                    let modulo = require(filepath);
                    if (typeof modulo === "function") {
                        modulo = modulo.bind(root_parameter);
                    }
                    base[property_id][subproperty_id] = modulo;
                    continue Iterando_carpeta;
                }
            }
        }
    } catch (error) {
        console.error("Error in «api_loader»", error);
    }
};
module.exports = api_loader;