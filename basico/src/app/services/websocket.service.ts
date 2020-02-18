import { Injectable } from '@angular/core';

import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService  {

  public socketStatus = false;
  public usuario: Usuario = null;

  constructor(private socket: Socket) {
      this.cargarStorage();
      this.checkStatus();
   }

  checkStatus() {
      this.socket.on('connect', () => {
          console.log('Conectado al Servidor');
          this.socketStatus = true;
      });

      this.socket.on('disconnect', () => {
        console.log('Deconectado del Servidor');
        this.socketStatus = true;
      });
  }

  emit(evento: string, payload?: any, callback?: Function ) {
    this.socket.emit( evento, payload, callback);
}

  listen( evento: string) {
    return this.socket.fromEvent( evento );
  }

  loginWs( nombre: string ) {

    return new Promise((resolve, reject ) => {

      this.emit('configurar-usuario', {nombre}, resp => {

        this.usuario = new Usuario( nombre );
        this.guardarStorage();

        resolve();

      });

    });

  }

  getUsusario() {
    return this.usuario;
  }

  guardarStorage() {
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  cargarStorage() {
    if ( localStorage.getItem('usuario') ) {
        this.usuario = JSON.parse(localStorage.getItem('usuario')).toString();
        this.loginWs( this. usuario.nombre);
    }
  }

 

}
