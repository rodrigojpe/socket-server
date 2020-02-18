
import { Router, Request, Response } from 'express';
import Server from '../classes/server';

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

export default router;
