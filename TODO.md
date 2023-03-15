[ ] Documentador
    [ ] commands/cms/build/docs/index.js
        [x] Que coja automáticamente comentarios javadoc
        [ ] Que combine automáticamente README.md
            [x] actualizar javadoc para que incorpore en el JSON el nombre del fichero.
        [ ] Que lo anterior genere un ./README.md
        [ ] Que el ./README.md genere un docs/index.html
[ ] Server
    [x] Que funcione el HTTPS también (DESHABILITABLE)
    [ ] Que funcionen los sockets también (DESHABILITABLE)
[ ] Auth
    [x] login y logout como funciones
    [x] authenticate token como funcion
    [x] authorize only user/group/permission como funcion
    9 ficheros {
        [x] login y logout como controladores nativos
        [x] authenticate token como middleware
        [x] authorize only/except user/group/permission como middleware
    }
[ ] Storages
    [x] json stores como controlador configurable
    [x] json stores securizables via authorization middlewares
[ ] Socket.io server
    [ ] for http 
    [ ] for https

[ ] Database
    [x] Schema: método de ingeniería inversa (ampliado por la definición en JSON, vía extensions)
    [x] Schema: una definición en JSON (paralela casi-completamente) del schema
    [ ] Schema:
        [ ] add table
        [ ] add column
        [ ] update table
        [ ] update column
        [ ] delete table
        [ ] delete column
        [ ] alter schema extensions (por otro lado, aparte)
[ ] Hooks
[ ] Plugins
[ ] Markets
[ ] Markets


[ ] TODOS FRESCOSISISISMISIMOS DEL PANELITO:

[ ] eL EXPLORADOR simplemente, to currao
    [ ] respetando el orden de " " / "." / {propiedad}
    [ ] dejando claro el esquema del parseo recursivo
        [ ] que debe coincidir con el que las aplicaciones sintácticas universales
        [ ] y entonces, ampliarlo
    [ ] botón para listar SÓLO FUNCIONES
        [ ] en el panel rápido
        [ ] al clicar mira recursivamente todo el árbol
        [ ] en busca de funciones
        [ ] y las muestra
    [ ] con algunas features:
        [ ] sección de función
            [ ] si la tienes seleccionada
        [ ] te muestra el nombre de acceso a la función
        [ ] te muestra un botón para ver el código fuente de la función
        [ ] te muestra un texto con el código fuente de la función
        [ ] te muestra una barra de estado sobre el código fuente
        [ ] te muestra la url del recurso si la tiene (que puede llenar el código fuente de la función)
        [ ] te muestra un botón de actualización (si hay url)
        [ ] te muestra la descripción de la función (si la tiene) (debería poderse hacer extrayendo el javadoc de la función)
    [ ] con algunos comandos de base:
        [ ] consola de javascript para navegador (basado en componente)
        [ ] consola de castelog para navegador (basado en componente)
        [x] consola de os para navgador NO HAY QUE HACERLA
        [ ] consola de javascript para shellver (basado en componente)
        [ ] consola de castelog para shellver (basado en componente)
        [ ] explorar scripts: los scripts deben llevar su propio prefijo ej: org.panelito.utils
            [ ] así el usuario puede encontrarlos por: org panelito utils
            [ ] así el usuario puede usarlos por: org panelito utils date formatear fecha a string: new Date(), "dia"
            [ ] así el usuario puede navegar por el árbol de ficheros: org/panelito/utils/formatear/fecha:"ok","okok"
        [ ] crear script
        [ ] editar script
        [ ] eliminar script
        [ ] importar scripts
        [ ] compilar script castelog
        [ ] ejecutar script castelog
        [ ] ejecutar script js
