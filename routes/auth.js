const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");
const dotenv = require('dotenv').config();
const User = require('./../modelos/usuarios.modelo');

// inicializa router de servidor
const router = express.Router();

// En post
router.post("/", async (req, res) => {
    // Datos de pruebas
    const users = [];
    const rolesUser = [];

    User.findAll(async function(err, users) {
        console.log('controller');
        if (err)
            res.send(err);
        // si no encuentra un usuario con dicho email lanza error
        let user = users.find(u => u.email === req.body.email);
        if (!user) res.status(400).send({ error:true, message: 'Email o contraseña no valido' });
        else{
            User.getRolesById(user.id, async function(err, rolesUser) {
                console.log('roles usuario: ', rolesUser);
                if (err)
                    res.send(err);
                const valid = await bcrypt.compare(req.body.password, user.password)
                if (!valid) res.status(400).send({ error:true, message: 'Email o contraseña no valido' });
                const token = jwt.sign({
                    id: user._id,
                    roles: rolesUser,
                }, "jwtPrivateKey", { expiresIn: process.env.EXPIRE_SESSION_TOKEN || "15m" });
                res.send({
                    ok: true,
                    token: token
                });
            });
        }
    });

    
});

// Export el router
module.exports = router;