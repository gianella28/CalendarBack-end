//const express= require('express'); o 
//destructurado
const {response }= require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const {generarJWT} = require('../helpers/jwt');

const createUser = async(req, res = response) =>{
    const { email, password} = req.body;
    try{
        let usuario = await Usuario.findOne({ email});
        
        if(usuario){
            return res.status(400).json({
                ok:false,
                msg:'El usuario ya existe con ese correo'
            });
        }
        usuario = new Usuario(req.body);
        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();
        //generar JWT Token
        const token = await generarJWT(usuario.id, usuario.name);

        return res.status(201).json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

         //manejo de errores
        /*if(name.length < 3){
            return res.status(400).json({
                ok:false,
                msg:'El nombre debe de ser de 3 letras'
            });
        }*/

    }catch(error){
        return res.status(500).json({
            ok:false,
            msg:'Por favor hable con el administrador'
        });
    }

    
}

const loginUser = async(req, res = response ) =>{
    const { email, password} = req.body;
    //console.log('se requiere /');
   /* res.json({
        ok:true,
        msg: 'login',
        email,
        password
    })*/
    try{

        const usuario = await Usuario.findOne({ email});
        
        if(!usuario){
            return res.status(400).json({
                ok:false,
                msg:'El usuario no existe con ese email'
            });
        }

        //Confirmar las contraseñas
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'Password incorrecto'
            });
        }

        //generar nuestro JWT
        const token = await generarJWT(usuario.id, usuario.name);
        return res.json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Por favor hable con el administrador'
        });
    }

   /* return res.status(201).json({
        ok:true,
        msg:'login',
        email,
        password
    })*/
};

const revalidarToken = async(req, res = response) =>{
     const { uid, name } = req;

    //generar un nuevo  token y retornarlo en esta petición
    const token = await generarJWT(uid, name);
    return res.json({
        ok:true,
        uid,name,
        token
    })
};

module.exports = {
    createUser,
    loginUser,
    revalidarToken
}
