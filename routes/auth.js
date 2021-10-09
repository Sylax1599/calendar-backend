/*

Rutas de Usuarios /Auth

host + /api/auth

*/

const {Router}=require('express');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/authController');
const {validarCampos}=require('../middlewares/validar-campos');
const {validarJWT}=require('../middlewares/validar-jwt');

const {check}= require('express-validator');

const router= Router();



router.post('/new', 
[
    //Middlewares
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Ingrese una direccion email correcta').isEmail(),
    check('password', 'El password debe tener mas de 6 caracteres').isLength({min: 6}),
    validarCampos
], 
crearUsuario);


router.post('/', 
[
        //Middlewares
        check('email', 'Ingrese una direccion email correcta').isEmail(),
        check('password', 'El password debe tener mas de 6 caracteres').isLength({min: 6}),
        validarCampos

],
loginUsuario);


router.get('/renew', validarJWT, revalidarToken);


module.exports= router;