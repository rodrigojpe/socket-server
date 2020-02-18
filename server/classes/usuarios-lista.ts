import { Usuario } from "./usuario";



export class UsuariosLista {
    
    private lista: Usuario[] = [];


    public agregar(usuario: Usuario ) {
        this.lista.push(usuario);
        console.log(this.lista);
    }

    public actualizarNombre(id: string, nombre: string) {

        for( let usuario of this.lista) {

            if(usuario.id === id){
                usuario.nombre = nombre 
            } break;
        }
        console.log("=======USUARIO ACTUALIZADO========");
        console.log( this.lista);
    }

    public getLista() {
        return this.lista;
    }

    public getUsuario(id: string) {
        return this.lista.find( usuario => usuario.id === id);
    }

    public getUsuarioSala( sala: string ) {

        return this.lista.filter( usuario => usuario.sala === sala );

    }

    public borrarUsusario( id: string ) {
        
        const tempUsuario = this.getUsuario( id );

        this.lista = this.lista.filter(usuario => usuario.id !== id);

        console.log( this.lista );

        return tempUsuario;

    }


}