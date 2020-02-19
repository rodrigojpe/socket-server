
import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { Socket } from 'socket.io';
import { usuariosConectados } from '../sockets/sockets';

const router = Router();


router.get('/mensaje', (req: Request, res: Response)=>{
    
    const cuerpo =  req.body.cuerpo;
    const de = req.body.de;

    const payload = {
        de,
        cuerpo
    }

    const server = Server.intance;

    server.io.emit( 'mensaje-nuevo', payload);

    res.json({
        ok:true,
        mensaje: 'Hola mundo'
    });
})

router.post('/mensaje/:id', (req: Request, res: Response)=>{

    const cuerpo =  req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;
    
    const payload = {
        de,
        cuerpo
    }
    const server = Server.intance;

    server.io.in( id ).emit( 'mensaje-privado', payload);

    res.json({
        ok:true,
        cuerpo,
        de,
        id
    });
})


// obtener los id de los usuarios //#endregion

router.get('/usuarios', (req: Request, res: Response)=>{

    const cuerpo =  req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;
    
    const server = Server.intance;
    
    server.io.clients((err: any, clientes: string[]) => {
        
            if ( err ) {
                return res.json({
                    ok:false,
                    err
                });
            }

            
                res.json({
                    ok:true,
                    clientes,
                });
    })

    // const payload = {
    //     de,
    //     cuerpo
    // }

    // server.io.in( id ).emit( 'mensaje-privado', payload);
})

// obtener todos los nombres de los usuarios //#endregion
router.get('/usuarios/detalle', (req: Request, res: Response)=>{


    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    })

})

export default router;
