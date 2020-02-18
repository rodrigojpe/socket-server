import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  texto = '';
  mensajesSubcription = new Subscription();
  mensajes: any[] = [];
  elemento: HTMLElement;

  constructor(
    public chatService: ChatService
  ) { }

  ngOnInit() {
     this.elemento = document.getElementById('chat-mensajes');
     this.mensajesSubcription = this.chatService.getMessage().subscribe( msg => {
        setTimeout(() => {
            this.elemento.scrollTop = this.elemento.scrollHeight;
        }, 50);
        this.mensajes.push( msg );
    });
  }

  enviar() {

    if ( this.texto.trim().length === 0 ) {
      return;
    }


    console.log( this.texto);
    this.chatService.sendMessage(this.texto);

    this.texto = '';
  }

}
