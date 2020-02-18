

import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';


export const usuarioConectados = new UsuariosLista();



export const ConectarCliente = (cliente: Socket ) => {

    const usuario = new Usuario( cliente.id );
    usuarioConectados.agregar( usuario );
}


export const desconectar = (cliente: Socket ) => {

    cliente.on('disconnect', () => {
    
    usuarioConectados.borrarUsusario(cliente.id);
        
        console.log('cliente Desconectado');
    });   

}

// recibiendo mensaje //#endregion
export const mensaje = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('mensaje', (payload: {de: string, cuerpo: string}) =>{

        console.log('mensaje recibido', payload);

        io.emit('mensaje-nuevo', payload)

    });

   

}

export const configurarUsario =  (cliente: Socket, io: socketIO.Server) => {
                    cliente.on('configurar-usuario',(payload: {nombre: string}, callback: Function) =>{
    console.log('nombre :', payload.nombre);

        usuarioConectados.actualizarNombre(cliente.id, payload.nombre);
    
        callback({
            ok: true,
            mensaje: `usuario ${ payload.nombre} Configurado`
        });
        // io.emit('mensaje-nuevo', payload)
    });
}