const jwt= require('jsonwebtoken');



const generarJWT= (uid, name) =>{

    //La idea es esperar que se genere el JWT, por lo que
    //haremos que sea una promesa-> async await, you know
    return new Promise((resolve, reject)=>{

        const payload= { uid, name};

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token)=>{
            if(err){
                reject('No se pudo generar el token')
            }
            resolve(token)
        })


    })


}

module.exports={
    generarJWT
}