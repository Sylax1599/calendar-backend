
const mongoose= require('mongoose');

const {Schema, model}=mongoose;



const EventoSchema= Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end:{
        type: Date,
        required: true
    },

    user: {
        //Esto le va a decir a mongoose que va hacer una referencia

        type: Schema.Types.ObjectId,
        //Aquí se pone la referencia
        ref: 'Usuario',
        required: true
    }
    

})

EventoSchema.method('toJSON', function(){
    //Esto es para quitarle el __v que pone a cada documento que guarda
    //y para quitarle el nombre del id "_id" por "id"
    
   const {__v, _id,...object}= this.toObject();
   object.id=_id;
   return object;
})

module.exports=model('Evento', EventoSchema);