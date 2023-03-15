
window.comandos_globales.panel_de_autorizaciones_segun_sesiones = { $ejecutar( componente ) {try {
console.log("ejecutar");
} catch(error) {
console.log(error);
throw error;
}

},
$cargar_componente( componente ) {try {
if("PanelDeAutorizacionesSegunSesiones" in vue.options.components) {
return true;
}
Castelog.metodos.un_componente_vue2("PanelDeAutorizacionesSegunSesiones", "<div class=\"PanelDeAutorizacionesSegunSesiones Component\">"
 + "          <div class=\"window\">"
 + "            <div class=\"title-bar\">"
 + "              <div class=\"title-bar-text\">panel de autorizaciones según sesiones</div>"
 + "            </div>"
 + "            <div class=\"window-body\">"
 + "              Por sesiones se vería aquí"
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
componente.visualizar_componente( "PanelDeAutorizacionesSegunSesiones",
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