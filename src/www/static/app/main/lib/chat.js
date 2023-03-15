
Castelog.metodos.una_exportacion_de_modulo_universal_estandar("app.main.socket.chat", ( () => {
try {
const socket_io = io( "http://127.0.0.1:9002" );
const socket_io_subscripciones = { 
};
const subscribir_a_socket = function( nombre,
evento_funcion ) {try {
socket_io_subscripciones[ nombre ] = evento_funcion;
} catch(error) {
console.log(error);
throw error;
}

};
const desubscribir_a_socket = function( id ) {try {
delete socket_io_subscripciones[ id ];
} catch(error) {
console.log(error);
throw error;
}

};
socket_io.on( "connect",
function(  ) {try {
console.log("Socket se conectó!");
} catch(error) {
console.log(error);
throw error;
}

} );
socket_io.on( "server to client message",
function( datos ) {try {
console.log("Recibidos datos: " + ( JSON.stringify(datos, null, 2) ));
for(const nombre in socket_io_subscripciones) {
const evento_funcion = socket_io_subscripciones[ nombre ];
evento_funcion( datos );}

} catch(error) {
console.log(error);
throw error;
}

} );
return { socket:socket_io,
subscriptions:socket_io_subscripciones,
on:subscribir_a_socket,
off:desubscribir_a_socket
};
} catch(error) {
console.log(error);
throw error;
}
})(), (typeof __dirname !== 'undefined') ? __dirname : undefined, (typeof process !== 'undefined') ? process.cwd() : undefined);