
const Win7Ventana = Castelog.metodos.un_componente_vue2("Win7Ventana", "<div class=\"window\" :class=\"windowClasses\">"
 + "        <div class=\"title-bar\" :class=\"titleBarClasses\">"
 + "            <div class=\"title-bar-text\" :class=\"titleBarTextClasses\">"
 + "                <slot name=\"titulo\"></slot>"
 + "            </div>"
 + "            <div class=\"title-bar-controls\" :class=\"titleBarControlsClasses\">"
 + "                <slot name=\"controles\"></slot>"
 + "            </div>"
 + "        </div>"
 + "        <div class=\"window-body\" :class=\"windowBodyClasses\">"
 + "            <slot name=\"cuerpo\"></slot>"
 + "        </div>"
 + "        <div class=\"status-bar\" :class=\"statusBarClasses\">"
 + "            <slot name=\"estado\"></slot>"
 + "        </div>"
 + "    </div>", function(component) {return { props:{ windowClasses:{ type:String,
default:function() {try {
return "";
} catch(error) {
console.log(error);
throw error;
}

}
},
titleBarClasses:{ type:String,
default:function() {try {
return "";
} catch(error) {
console.log(error);
throw error;
}

}
},
titleBarTextClasses:{ type:String,
default:function() {try {
return "";
} catch(error) {
console.log(error);
throw error;
}

}
},
titleBarControlsClasses:{ type:String,
default:function() {try {
return "";
} catch(error) {
console.log(error);
throw error;
}

}
},
windowBodyClasses:{ type:String,
default:function() {try {
return "";
} catch(error) {
console.log(error);
throw error;
}

}
},
statusBarClasses:{ type:String,
default:function() {try {
return "";
} catch(error) {
console.log(error);
throw error;
}

}
}
},
data(  ) {try {
return { 
};
} catch(error) {
console.log(error);
throw error;
}

}
};}, null);