module.exports = async function(project_path) {
    try {
        const path = require("path");
        const javadoc = require("javadoc");
        const glob = require("glob");
        const readmes_pattern = path.resolve(project_path, "src", "**/README.md");
        const javadocs_json = path.resolve(project_path, "docs", "javadocs.json");
        const documentation_brute = await javadoc.generate({
            include: ["**/*.js"],
            exclude: ["**/node_modules/**"],
            format: "json",
            output: javadocs_json
        });
        let all_javadocs = [];
        Fix_de_javadoc: {
            for(let index = 0; index < documentation_brute.success.length; index++) {
                const javadoc_comments = documentation_brute.success[index];
                all_javadocs = all_javadocs.concat(javadoc_comments);
            }
        }
        const readme_files = glob.sync(readmes_pattern);
        let readme_output = "";
        Agrupar_comentarios_segun_readmes: {
            // @TODO...
            // @TODO...
            // @TODO...
            // @TODO...
            // @TODO...
        }
    } catch (error) {

    }
};