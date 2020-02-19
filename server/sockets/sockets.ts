

import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';


export const usuariosConectados = new UsuariosLista();



export const ConectarCliente = (cliente: Socket, io:socketIO.Server ) => {

    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar( usuario );
}


export const desconectar = (cliente: Socket, io: socketIO.Server ) => {

    cliente.on('disconnect', () => {
        console.log('cliente Desconectado');
    
        usuariosConectados.borrarUsuario(cliente.id);
        
        io.emit('usuarios-activos', usuariosConectados.getLista()  );

    });   

}

// Escuchar mensaje //#endregion
export const mensaje = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('mensaje', (payload: {de: string, cuerpo: string}) =>{

        console.log('mensaje recibido', payload);

        io.emit('mensaje-nuevo', payload)

    });
}

//Configurar usuario
export const configurarUsario =  (cliente: Socket, io: socketIO.Server) => {

    cliente.on('configurar-usuario',(payload: {nombre: string}, callback: Function) =>{
    console.log('nombre :', payload.nombre);

        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);

        io.emit('usuarios-activos', usuariosConectados.getLista());
    
        callback({
            ok: true,
            mensaje: `usuario ${ payload.nombre} Configurado`
        });
        // io.emit('mensaje-nuevo', payload)
    });
}


// Obtener Usuarios
export const obtenerUsuarios = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on('obtener-usuarios', () => {

        io.to( cliente.id ).emit('usuarios-activos', usuariosConectados.getLista()  );
        
    });

}