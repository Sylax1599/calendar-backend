
const {Router}=require('express');
const { 
    getEventos, 
    crearEvento, 
    actualizarEvento, 
    eliminarEvento } = require('../controllers/eventsController');
const router= Router();
const {validarJWT}= require('../middlewares/validar-jwt');
const {check}= require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {isDate}= require('../helpers/isDate');

//Se puede hacer la parte del middleware del JWT así también
//router.use(validarJWT);

//En vez de 
// router.get('/',poner siempre el argumento aqui -> validarJWT, getEventos );

// Todas tienen que pasar por la validación del JWT
// Obtener eventos



router.get('/',validarJWT , getEventos );


//Crear un nuevo evento

router.post('/', [
    //Middlewares
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha inicio es required').custom(isDate),
    check('end','Fecha de finalización es obligatoria').custom(isDate),
    validarCampos,
    validarJWT 
], crearEvento);

//Actualizar evento

router.put('/:id', [
    //Middlewares
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha inicio es required').custom(isDate),
    check('end','Fecha de finalización es obligatoria').custom(isDate),
    validarCampos,
    validarJWT 
], actualizarEvento);

//Borrar evento

router.delete('/:id',validarJWT, eliminarEvento);


module.exports= router;
