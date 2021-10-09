const {response}= require('express');
const Evento = require('../models/Evento');

const getEventos= async (req,res=response)=>{

    

        
        const eventos= await Evento.find()
        //Para rellenar los datos dle usuario, es casi como si fuera una relación
        //Con esto me traigo la información del usuario
        .populate('user', //Solo quiero el name
         'name');
            
       

        res.json({
            ok: true,
            eventos
        })
        
}


const crearEvento=async (req,res=response)=>{

    //Creamos nuestro modelo, le pasamos la info que viene en el body
    //por la parte del req
    const evento=new Evento(req.body);

    try {

        //En user ponemos el id, ese id viene en el req.uid
        //Es decir, el id del usuario que lo creo
        evento.user= req.uid;

        const eventoGuardado=await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        })
    }

    
    
}

const actualizarEvento=async (req,res=response)=>{


    //Con esto obtenemos el id enviado por el parametro
    const eventoId= req.params.id;
    //Para que el usuario logueado, sea el que edite el evento
    const uid= req.uid;

    try {

        const evento= await  Evento.findById(eventoId);

        if(!evento){
            return res.status(404).json({
                ok: false,
                msg: 'Evento con ese ID no existe'
            })
        }

        //aqui validamos que si un usuario difernte quiere editar el evento no puede ser permitido
        if(evento.user.toString()!==uid){
            return res.status(401).json({
                ok: false,
                msg:'No tiene privilegio de editar este evento'
            })
        }

        //Traemos todo los datos que enviaron por body
        //Y a eso ademas le agregamos el uid del usuario
        const nuevoEvento={
            ...req.body,
            user: uid
        }

       const eventoActualizado= await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new: true})

        res.json({
            ok: true,
            evento: eventoActualizado
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        })
    }

  
   
    
}

const eliminarEvento=async (req,res=response)=>{

    const eventoId= req.params.id;
    const uid= req.uid;

    try {

        const evento= await  Evento.findById(eventoId);


        if(!evento){
            return res.status(404).json({
                ok: false,
                msg: 'Evento con ese ID no existe'
            })
        }

        if(evento.user.toString()!==uid){
            return res.status(401).json({
                ok: false,
                msg:'No tiene privilegio de borrar este evento'
            })
        }

        await Evento.findOneAndDelete(eventoId);

        res.json({
            ok: true,
            msg: "Evento eliminado"
        })

        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        })
    }

   
    
}




module.exports={
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
    
}