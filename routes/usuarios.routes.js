// Import middlewares
const auth = require("../middleware/auth");
const { admin, editor, viewer } = require("../middleware/roles");

const express = require('express')
const router = express.Router()
const userController =   require('../controlador/usuarios.controlador');

// Obtiene todos los usuarios
router.get('/', [auth, viewer], userController.findAll);
// Crea un usuario
router.post('/', [auth, viewer], userController.create);
// Obtiene un usuario mediante un id
router.get('/:id', [auth, viewer], userController.findById);
// Modifica un usuario mediante un id
router.put('/:id', [auth, viewer], userController.update);
// elimina un usuario mediante un id
router.delete('/:id', [auth, viewer], userController.delete);

module.exports = router