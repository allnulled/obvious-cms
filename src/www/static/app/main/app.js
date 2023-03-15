
// [castelog:html5izable] ACTIVADO con: {"autor":"allnulled","nombre":"index","version":"1","contenido":{"head":"<head>\n    <title>Office</title>\n    <meta charset=\"utf8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <script src=\"/static/js/calo.js\"></script>\n    <script src=\"/static/vue/vue.draggable/vuedraggable.js\"></script>\n    <script src=\"/static/vue/win7/win7ventana.js\"></script>\n    <script src=\"./lib/comandos/comandos_globales.js\"></script>\n    <script src=\"./lib/comandos/panel_de_autorizaciones.js\"></script>\n    <script src=\"./lib/comandos/panel_de_autorizaciones_segun_usuarios.js\"></script>\n    <script src=\"./lib/comandos/panel_de_autorizaciones_segun_permisos.js\"></script>\n    <script src=\"./lib/comandos/panel_de_autorizaciones_segun_grupos.js\"></script>\n    <script src=\"./lib/comandos/panel_de_autorizaciones_segun_sesiones.js\"></script>\n    <style>\n    .landscape_layer_container {\n        position: absolute;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        background-color: #180d22;\n        background-image: url('/static/img/landscape-blured.png');\n        background-position: 50% 100%;\n        background-size: auto auto;\n        background-origin: border-box;\n        background-repeat: no-repeat;\n        z-index: 1;\n    }\n    .landscape_layer {\n        \n    }\n    .win7 .status-bar,\n    .win7 ul.tree-view.has-container,\n    .win7 .window-body {\n      background: rgba(255,255,255,0.5) !important;\n    }\n    .win7 .window {\n      box-shadow: none;\n    }\n\n    .display_none {\n      display: none !important;\n    }\n    .window-body > ul,\n    .window-body > ul > li {\n      margin: 0px;\n      padding: 0px;\n      list-style-type: none;\n    }\n    ul.sugerencias {\n      text-align: right;\n    }\n    ul.sugerencias li {\n      display: inline-block;\n      padding: 3px;\n      text-align: right;\n      border-bottom: 1px solid #CCC;\n      cursor: pointer;\n    }\n    .win7 .window-body {\n      background: #f0f0f0 !important;\n    }\n    .no_break_line {\n      white-space: nowrap;\n    }\n    button.small {\n      min-width: 15px;\n      min-height: 15px;\n      padding: 2px;\n      margin: 0px;\n      font-size: 9px;\n    }\n    button.parte_de_ruta {\n      margin-bottom: 3px;\n    }\n    .small_text {\n      font-size: 10px;\n    }\n    .no_outline {\n      outline: none !important;\n    }\n    .barra_bordeada {\n       border-bottom-left-radius:2pt;\n       border-bottom-right-radius:2pt;\n    }\n    .link {\n      color: blue;\n      cursor: pointer;\n    }\n    .simple_list {\n      list-style-type: none;\n      padding: 0px;\n      margin: 0px;\n    }\n    .simple_list li {\n      list-style-type: none;\n      padding: 0px;\n      margin: 0px;\n    }\n    </style>\n</head>","body":"<body class=\"win7\"><div id=\"app\"></div></body>"}}

const _caracteres_interesantes = { refrescar:"↻",
cruz:"⨯",
flecha:"▸",
menu:"☰"
};
const filtros = { filtro_para_ignorar_propiedades_con_$:function( item ) {try {
return (!(item.startsWith( "$" )));
} catch(error) {
console.log(error);
throw error;
}

},
mapeo_para_obtener_todo_el_string:function( coincidentes,
componente ) {try {
return function( item ) {try {
const busqueda_resultante = ( ( coincidentes.length ? ( coincidentes.join( " " ) + " " ) : "" ) ) + item;
return { text:item,
onClick:function() {try {
componente.cambiar_texto_de_busqueda( busqueda_resultante );
} catch(error) {
console.log(error);
throw error;
}

}
};
} catch(error) {
console.log(error);
throw error;
}

};
} catch(error) {
console.log(error);
throw error;
}

}
};
const Win7AplicacionUniversal = Castelog.metodos.un_componente_vue2("Win7AplicacionUniversal", "<div class=\"Win7AplicacionUniversal Component\">"
 + "    <div>"
 + "        <div class=\"window\">"
 + "          <table>"
 + "            <tr>"
 + "              <td style=\"width:100%;\">"
 + "                <input class=\"small_text\" style=\"width:100%; font-size:10px;\" type=\"text\" v-model=\"texto_de_busqueda\" placeholder=\"ayuda\" />"
 + "              </td>"
 + "              <td style=\"width:auto;\">"
 + "                <button class=\"no_outline\" style=\"min-width: 35px;\" v-if=\"!esta_mostrando_sugerencias\" v-on:click=\"() => alternar_mostrar_sugerencias()\"> ☰ </button>"
 + "                <button class=\"no_outline active\" style=\"min-width: 35px;\" v-else v-on:click=\"() => alternar_mostrar_sugerencias()\"> ☰ </button>"
 + "              </td>"
 + "            </tr>"
 + "          </table>"
 + "          <template v-if=\"esta_mostrando_sugerencias\">"
 + "            <div class=\"window-body\" style=\"margin-top: 5px; padding-top: 3px; padding-right: 3px; padding-left: 3px;\">"
 + "              <div class=\"\" style=\"display: inline-block; width: 100%; text-align: right; padding-bottom: 0px;\">"
 + "                <button class=\"small parte_de_ruta\" data-busqueda=\"\" v-on:click=\"() => cambiar_texto_de_busqueda('')\"> @ </button>"
 + "                <span v-for=\"(parte_de_ruta, parte_de_ruta_index) in ruta_de_busqueda\" v-bind:key=\"'ruta_de_busqueda_' + parte_de_ruta_index\">"
 + "                  <span class=\"small_text\"> » </span>"
 + "                  <button class=\"small no_outline parte_de_ruta\" :data-busqueda=\"parte_de_ruta.link\" v-on:click=\"() => cambiar_texto_de_busqueda(parte_de_ruta.link)\">{{ parte_de_ruta.text }}</button>"
 + "                </span>"
 + "              </div>"
 + "            </div>"
 + "            <div class=\"window-body\" style=\"margin-top: 5px;\">"
 + "              <ul class=\"sugerencias\">"
 + "                <template v-for=\"(sugerencia, sugerencia_index) in sugerencias\">"
 + "                  <template v-if=\"typeof sugerencia === 'string'\">"
 + "                    <li v-bind:key=\"'sugerencia-' + sugerencia_index\">"
 + "                      <button class=\"small no_outline\" v-on:click=\"() => cambiar_texto_de_busqueda(sugerencia)\">{{ sugerencia }}</button>"
 + "                    </li>"
 + "                  </template>"
 + "                  <template v-else-if=\"typeof sugerencia === 'object'\">"
 + "                    <li v-bind:key=\"'sugerencia-' + sugerencia_index\">"
 + "                      <button class=\"small no_outline\" :class=\"{default: sugerencia.especial}\" v-on:click=\"sugerencia.onClick\">{{ sugerencia.text }}</button>"
 + "                    </li>"
 + "                  </template>"
 + "                </template>"
 + "              </ul>"
 + "            </div>"
 + "          </template>"
 + "        </div>"
 + "        <div v-if=\"esta_visualizando && typeof visualizando_componente_name !== 'undefined'\" style=\"margin-top:6px;\">"
 + "          <component :is=\"visualizando_componente_name\" v-bind=\"visualizando_componente_props\" v-on=\"visualizando_componente_events\"></component>"
 + "        </div>"
 + "    </div>"
 + "  </div>", function(component) {return { props:{ aplicacion:{ type:Object,
default:function() {try {
return { 
};
} catch(error) {
console.log(error);
throw error;
}

}
}
},
data() {try {
return { ruta:"/",
esta_visualizando:false,
visualizando_componente_name:undefined,
visualizando_componente_props:{ 
},
visualizando_componente_events:{ 
},
texto_de_busqueda:"",
ruta_de_busqueda:"",
esta_mostrando_sugerencias:false,
sugerencias:Object.keys( this.aplicacion )
};
} catch(error) {
console.log(error);
throw error;
}

},
methods:{ visualizar_componente( name,
bind_args = { 
},
on_args = { 
} ) {try {
this.esta_visualizando = false;
this.visualizando_componente_name = name;
this.visualizando_componente_props = bind_args;
this.visualizando_componente_events = on_args;
this.esta_visualizando = true;
} catch(error) {
console.log(error);
throw error;
}

},
alternar_mostrar_sugerencias() {try {
this.esta_mostrando_sugerencias = (!(this.esta_mostrando_sugerencias));
} catch(error) {
console.log(error);
throw error;
}

},
cambiar_texto_de_busqueda( otro_texto ) {try {
this.texto_de_busqueda = otro_texto;
} catch(error) {
console.log(error);
throw error;
}

}
},
watch:{ texto_de_busqueda( nuevo_valor ) {try {
this.esta_mostrando_sugerencias = false;
const partes = nuevo_valor.split( new RegExp( "\\.| ",
"g" ) ).filter( function( item ) {try {
return (!(item === ""));
} catch(error) {
console.log(error);
throw error;
}

} );
const coincidentes = [  ];
let ultimo_valor = this.aplicacion;
try {
for(let index = 0; index < partes.length; index++) {const parte = partes[ index ];
if((!(parte in ultimo_valor))) {
throw new Error( "No hay más coincidencias" );
}
ultimo_valor = ultimo_valor[ parte ];
coincidentes.push(parte)}
} catch(error) {
}
this.sugerencias_pivote = ultimo_valor;
actualizando_sugerencias: {
if((!("$ejecutar" in ultimo_valor))) {
this.sugerencias = Object.keys( ultimo_valor ).map( filtros.mapeo_para_obtener_todo_el_string( coincidentes,
this ) );
}
else {
let opciones_disponibles = [  ];
if(typeof ultimo_valor.$ejecutar === 'function') {
opciones_disponibles.push({ text:" ▸ ejecutar",
especial:true,
onClick:() => {try {
return ultimo_valor.$ejecutar( this );
} catch(error) {
console.log(error);
throw error;
}

}
})
}
if(typeof ultimo_valor.$visualizar === 'function') {
opciones_disponibles.push({ text:" ↻ visualizar",
especial:true,
onClick:() => {try {
if(typeof ultimo_valor.$cargar_componente === 'function') {
ultimo_valor.$cargar_componente( this );
}
return ultimo_valor.$visualizar( this );
} catch(error) {
console.log(error);
throw error;
}

}
})
}
opciones_disponibles = (opciones_disponibles).concat(Object.keys( ultimo_valor ).filter( filtros.filtro_para_ignorar_propiedades_con_$ ).map( filtros.mapeo_para_obtener_todo_el_string( coincidentes,
this ) ) );
this.sugerencias = opciones_disponibles;
}}

actualizando_estado: {
const elementos_en_texto = partes;
const elementos_de_ruta = [  ];
for(let index = 0; index < elementos_en_texto.length; index++) {const elemento = elementos_en_texto[ index ];
elementos_de_ruta.push({ text:elemento,
link:( ([  ]).concat(elementos_en_texto ) ).slice( 0,
index + 1 ).join( " " )
})}
this.ruta_de_busqueda = elementos_de_ruta;}

this.esta_mostrando_sugerencias = true;
} catch(error) {
console.log(error);
throw error;
}

}
}
};}, null);
window.comandos_globales.ops = { listar_usuarios:{ $ejecutar( componente ) {try {
console.log("ejecutar");
} catch(error) {
console.log(error);
throw error;
}

},
$cargar_componente( componente ) {
},
$visualizar( componente ) {
}
},
crear_usuarios:{ $ejecutar( componente ) {try {
console.log("ejecutar");
} catch(error) {
console.log(error);
throw error;
}

},
$cargar_componente( componente ) {
},
$visualizar( componente ) {
}
},
actualizar_usuarios:{ $ejecutar( componente ) {try {
console.log("ejecutar");
} catch(error) {
console.log(error);
throw error;
}

},
$cargar_componente( componente ) {
},
$visualizar( componente ) {
}
},
eliminar_usuarios:{ $ejecutar( componente ) {try {
console.log("ejecutar");
} catch(error) {
console.log(error);
throw error;
}

},
$cargar_componente( componente ) {
},
$visualizar( componente ) {
}
}
};
const app_universal_1 = Castelog.metodos.una_aplicacion_sintactica_universal({ os:{ ficheros:{ leer:{ carpeta:window.comandos_globales.ops.eliminar_usuario,
fichero:window.comandos_globales.ops.eliminar_usuario
},
escribir:{ carpeta:window.comandos_globales.ops.eliminar_usuario,
fichero:window.comandos_globales.ops.eliminar_usuario
}
}
},
cms:{ panel:{ de:{ autorizaciones:Object.assign({ 
}, window.comandos_globales.panel_de_autorizaciones, { segun:{ usuarios:Object.assign({ 
}, window.comandos_globales.panel_de_autorizaciones_segun_usuarios, { listar:window.comandos_globales.ops.listar_usuarios,
crear:{ usuario:window.comandos_globales.ops.crear_usuario
},
actualizar:{ usuario:window.comandos_globales.ops.actualizar_usuario
},
eliminar:{ usuario:window.comandos_globales.ops.eliminar_usuario
},
agrupar:{ usuario:window.comandos_globales.ops.eliminar_usuario
},
desagrupar:{ usuario:window.comandos_globales.ops.eliminar_usuario
},
permitir:{ usuario:window.comandos_globales.ops.eliminar_usuario
},
despermitir:{ usuario:window.comandos_globales.ops.eliminar_usuario
}
} ),
grupos:Object.assign({ 
}, window.comandos_globales.panel_de_autorizaciones_segun_grupos, { listar:window.comandos_globales.ops.listar_usuarios,
crear:{ grupo:window.comandos_globales.ops.crear_grupo
},
actualizar:{ grupo:window.comandos_globales.ops.actualizar_grupo
},
eliminar:{ grupo:window.comandos_globales.ops.eliminar_grupo
},
agrupar:{ grupo:window.comandos_globales.ops.eliminar_grupo
},
desagrupar:{ grupo:window.comandos_globales.ops.eliminar_grupo
},
permitir:{ grupo:window.comandos_globales.ops.eliminar_grupo
},
despermitir:{ grupo:window.comandos_globales.ops.eliminar_grupo
}
} ),
permisos:Object.assign({ 
}, window.comandos_globales.panel_de_autorizaciones_segun_permisos, { listar:window.comandos_globales.ops.listar_usuarios,
crear:{ permiso:window.comandos_globales.ops.crear_permiso
},
actualizar:{ permiso:window.comandos_globales.ops.actualizar_permiso
},
eliminar:{ permiso:window.comandos_globales.ops.eliminar_permiso
},
agrupar:{ permiso:window.comandos_globales.ops.eliminar_permiso
},
desagrupar:{ permiso:window.comandos_globales.ops.eliminar_permiso
},
permitir:{ permiso:window.comandos_globales.ops.eliminar_permiso
},
despermitir:{ permiso:window.comandos_globales.ops.eliminar_permiso
}
} ),
sesiones:Object.assign({ 
}, window.comandos_globales.panel_de_autorizaciones_segun_sesiones, { listar:window.comandos_globales.ops.listar_usuarios,
crear:{ sesion:window.comandos_globales.ops.crear_sesion
},
actualizar:{ sesion:window.comandos_globales.ops.actualizar_sesion
},
eliminar:{ sesion:window.comandos_globales.ops.eliminar_sesion
},
agrupar:{ sesion:window.comandos_globales.ops.eliminar_sesion
},
desagrupar:{ sesion:window.comandos_globales.ops.eliminar_sesion
},
permitir:{ sesion:window.comandos_globales.ops.eliminar_sesion
},
despermitir:{ sesion:window.comandos_globales.ops.eliminar_sesion
}
} )
}
} )
}
}
},
ayuda:Castelog.metodos.un_punto_sintactico_universal(function() {try {
return { $id:"ayuda",
$componente:"PanelDeAyuda"
};
} catch(error) {
console.log(error);
throw error;
}

})
}, null);
const PaginaDeInicio = Castelog.metodos.un_componente_vue2("PaginaDeInicio", "<div class=\"PaginaDeInicio Component\">"
 + "    <div style=\"padding: 2px; z-index:9999;\">"
 + "      <Win7AplicacionUniversal :aplicacion=\"aplicacion\" />"
 + "    </div>"
 + "  </div>", function(component) {return { data() {try {
return { aplicacion:app_universal_1.comandos
};
} catch(error) {
console.log(error);
throw error;
}

},
methods:{ 
},
watch:{ 
},
beforeMount() {
},
mounted() {
}
};}, null);
const App = Castelog.metodos.una_aplicacion_vue2(
  "App",
  "<div class=\"App Component Castelog-app\">"
 + "    <router-view></router-view>"
 + "  </div>",
  function(component) {return { data() {try {
return { 
};
} catch(error) {
console.log(error);
throw error;
}

},
methods:{ 
},
watch:{ 
},
beforeMount() {
},
mounted() {
}
};},
  "\"html {}\\n    body {}\\n    .Component {}\\n    .App {}\\n\", null", {},
  [ { path:"/",
name:"Home",
component:PaginaDeInicio,
props:{ 
}
} ],
  { es:{ 
},
en:{ 
},
ca:{ 
}
},
  "#app");