//me permite generar el router
const {Router} = require('express');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();
const { validarJWT} = require('../middlewares/validar-jwt');

const {getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');


//todas tienen que estar validadas
//todos tienen que pasar por la validacion JWT
router.use(validarJWT);
//obtener eventos

router.get('/', getEventos);

//crear un nuevo evento

router.post('/', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('dateStart', 'Fecha de inicio es obligatorio').custom(isDate),
        check('dateEnd', 'Fecha de fin es obligatorio').custom(isDate),
        validarCampos
    ],
    crearEvento
);

//actualizar eventos
router.put('/:id', actualizarEvento);


//eliminar eventos
router.delete('/:id', eliminarEvento);



module.exports = router;