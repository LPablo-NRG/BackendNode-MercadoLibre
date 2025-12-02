const router = require('express').Router()
const carritos = require('../controllers/carritos.controller')
const Authorize = require('../middlewares/auth.middleware')

router.get('/historial/:email', Authorize('Usuario'), carritos.getAll);

router.get('/actual/:email', Authorize('Usuario'), carritos.get);

router.get('/detalle/:idcarrito', Authorize('Usuario'), carritos.detalle);

router.post('/', Authorize('Usuario'), carritos.carritoValidator, carritos.create);

router.put('/comprar/:id', Authorize('Usuario'), carritos.carritoValidator, carritos.comprar);

router.post('/:idcarrito/productos', Authorize('Usuario'), carritos.validaciones.agregarProducto, carritos.agregaProducto);

router.put('/:idcarrito/productos/:idproducto', Authorize('Usuario'), carritos.validaciones.modificarCantidad, carritos.modificarCantidad);

router.delete('/:idcarrito/productos/:idproducto', Authorize('Usuario'), carritos.validaciones.eliminarProducto, carritos.quitarProducto);

module.exports = router