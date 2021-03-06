


import express from 'express';
import { SERVER_PORT } from '../global/enviroment';

import socketIO from 'socket.io';
import  http  from 'http';

import * as socket from '../sockets/sockets';
import { UsuariosLista } from './usuarios-lista';

export default class Server {

    private static _intance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server; 



   private constructor() {

        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server( this.app );
        this.io = socketIO(this.httpServer);

        this.escucharSockets();

    }

    public static get intance() {
        return this._intance ||  (this._intance = new this() )
    }

    private escucharSockets() {

        console.log('Escuchando conecciones - sockets');

        this.io.on('connection', (cliente:any) => {
            // console.log(cliente.id);

            //conectar Cliente
            socket.ConectarCliente( cliente, this.io );
           
            // configurar Usuario
            socket.configurarUsario( cliente, this.io);

            // obtener usuarios
            socket.obtenerUsuarios( cliente, this.io );

            //mensajes
            socket.mensaje( cliente, this.io );
            
            // desconectar
            socket.desconectar(cliente, this.io);
            

        });
    } 

    start( callback: Function ) {
        this.httpServer.listen( this.port, callback );
    }
}