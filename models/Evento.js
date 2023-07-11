const { Schema, model} = require('mongoose');


const EventoSchema = Schema({

    title:{
        type:String,
        required:true
    },
    notes:{
        type:String,
    },
    dateStart:{
        type:String,
        required:true,
    },
    dateEnd:{
        type:String,
        required:true,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref: 'Usuario',
        required:true,
    },

});

//sirve para modificar el json en vista (verlo como yo quiero)
EventoSchema.method('toJSON', function(){
   const { __v, _id, ...object }  =  this.toObject();
   object.id = _id;
   return object;

})

module.exports = model('Evento', EventoSchema );