
window.comandos_globales.panel_de_autorizaciones = { $ejecutar( componente ) {try {
console.log("ejecutar");
} catch(error) {
console.log(error);
throw error;
}

},
$cargar_componente( componente ) {try {
console.log("cargar componente");
if("PanelDeAutorizaciones" in vue.options.components) {
return true;
}
Castelog.metodos.un_componente_vue2("PanelDeAutorizaciones", "<div class=\"PanelDeAutorizaciones Component\">"
 + "          <div class=\"window\">"
 + "            <div class=\"title-bar\">"
 + "              <div class=\"title-bar-text\">panel de autorizaciones</div>"
 + "            </div>"
 + "            <div class=\"window-body\">"
 + "              <p>"
 + "                <ul class=\"simple_list\">"
 + "                  <li>"
 + "                    <span class=\"link\" v-on:click=\"() => app.visualizar_componente('usuarios')\">usuarios</span>"
 + "                  </li>"
 + "                  <li>"
 + "                    <span class=\"link\" v-on:click=\"() => app.visualizar_componente('grupos')\">grupos</span>"
 + "                  </li>"
 + "                  <li>"
 + "                    <span class=\"link\" v-on:click=\"() => app.visualizar_componente('permisos')\">permisos</span>"
 + "                  </li>"
 + "                  <li>"
 + "                    <span class=\"link\" v-on:click=\"() => app.visualizar_componente('sesiones')\">sesiones</span>"
 + "                  </li>"
 + "                </ul>"
 + "              </p>"
 + "            </div>"
 + "          </div>"
 + "        </div>", null, null);
return false;
} catch(error) {
console.log(error);
throw error;
}

},
$visualizar( componente ) {try {
console.log("visualizar");
componente.visualizar_componente( "PanelDeAutorizaciones",
{ app:componente
},
{ 
} );
} catch(error) {
console.log(error);
throw error;
}

}
};