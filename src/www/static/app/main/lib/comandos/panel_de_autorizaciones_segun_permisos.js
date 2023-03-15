
window.comandos_globales.panel_de_autorizaciones_segun_permisos = { $ejecutar( componente ) {try {
console.log("ejecutar");
} catch(error) {
console.log(error);
throw error;
}

},
$cargar_componente( componente ) {try {
if("PanelDeAutorizacionesSegunPermisos" in vue.options.components) {
return true;
}
Castelog.metodos.un_componente_vue2("PanelDeAutorizacionesSegunPermisos", "<div class=\"PanelDeAutorizacionesSegunPermisos Component\">"
 + "          <div class=\"window\">"
 + "            <div class=\"title-bar\">"
 + "              <div class=\"title-bar-text\">panel de autorizaciones según permisos</div>"
 + "            </div>"
 + "            <div class=\"window-body\">"
 + "              Por permisos se vería aquí"
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
componente.visualizar_componente( "PanelDeAutorizacionesSegunPermisos",
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