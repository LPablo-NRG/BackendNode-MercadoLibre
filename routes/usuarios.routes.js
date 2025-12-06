const router = require('express').Router()
const usuarios = require('../controllers/usuarios.controller')
const Authorize = require('../middlewares/auth.middleware')
const { body } = require('express-validator')
const { param } = require('express-validator')
const { validateResult } = require('../middlewares/validateHelper.middleware')
const { usuario } = require('../models')

//POST: api/usuarios/registro
router.post('/registro',
    [
        body('nombre')
            .exists().withMessage('El campo nombre es obligatorio')
            .notEmpty().withMessage('El nombre no puede estar vacío')
            .isLength({ max: 50 }).withMessage('El nombre es muy largo')
            .trim()
            .escape(),
        body('email')
            .exists().withMessage('El email es obligatorio')
            .isEmail().withMessage('Debe ser un formato de correo válido')
            .normalizeEmail()
            .custom(async (value) => {
                const usuarioExistente = await usuario.findOne({
                    where: { email: value}
                });

                if (usuarioExistente)
                    throw new Error('El correo electrónico ya está en uso')

                return true;
            }),
        body('password')
            .exists().withMessage('La constraseña es obligatoria')
            .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
        body('rol')
            .exists().withMessage('El rol es obligatorio')
            .notEmpty().withMessage('Debes seleccionar un rol')
            .isIn(['Administrador', 'Usuario']).withMessage('Rol no válido')
    ],
    validateResult,
    usuarios.create)

//GET api/usuarios
router.get('/', Authorize('Administrador'), usuarios.getAll)

//GET api/usuarios/email
router.get('/:email',
    Authorize('Administrador'),
    [ param('email').trim().isEmail() ],
    validateResult,
    usuarios.get)

//POST api/usuarios
router.post('/',
    Authorize('Administrador'),
    [
        body('nombre')
            .exists().withMessage('El campo nombre es obligatorio')
            .notEmpty().withMessage('El nombre no puede estar vacío')
            .isLength({ max: 50 }).withMessage('El nombre es muy largo')
            .trim()
            .escape(),
        body('email')
            .exists().withMessage('El email es obligatorio')
            .isEmail().withMessage('Debe ser un formato de correo válido')
            .normalizeEmail()
            .custom(async (value) => {
                const usuarioExistente = await usuario.findOne({
                    where: { email: value}
                });

                if (usuarioExistente)
                    throw new Error('El correo electrónico ya está en uso')

                return true;
            }),
        body('password')
            .exists().withMessage('La constraseña es obligatoria')
            .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
        body('rol')
            .exists().withMessage('El rol es obligatorio')
            .notEmpty().withMessage('Debes seleccionar un rol')
            .isIn(['Administrador', 'Usuario']).withMessage('Rol no válido')
    ],
    validateResult,
    usuarios.create)

//PUT api/usuarios/email
router.put('/:email',
    Authorize('Administrador'),
    [
        body('nombre')
            .exists().withMessage('El campo nombre es obligatorio')
            .notEmpty().withMessage('El nombre no puede estar vacío')
            .isLength({ max: 50 }).withMessage('El nombre es muy largo')
            .trim()
            .escape(),
        body('email')
            .exists().withMessage('El email es obligatorio')
            .isEmail().withMessage('Debe ser un formato de correo válido')
            .normalizeEmail(),
        body('rol')
            .exists().withMessage('El rol es obligatorio')
            .notEmpty().withMessage('Debes seleccionar un rol')
            .isIn(['Administrador', 'Usuario']).withMessage('Rol no válido')
    ],
    validateResult,
    usuarios.update)

//DELETE api/usuarios/email
router.delete('/:email',
    Authorize('Administrador'),
    [ param('email').trim().isEmail() ],
    validateResult,
    usuarios.delete)

module.exports = router