const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Importe o modelo User
const bcrypt = require('bcryptjs'); // Importe o módulo bcrypt
const jwt = require('jsonwebtoken');




router.post('/register', async (req,res) => {
    const {username, password} = req.body;
    try {
        const userDoc = await User.create({
            username,
            password:bcrypt.hashSync(password,salt),
        });
        res.json(userDoc);
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.findOne({ username });
        if (!userDoc) {
            // Usuário não encontrado
            return res.status(400).json('Usuário não encontrado');
        }

        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json({
                    id: userDoc._id,
                    username,
                });
            });
        } else {
            res.status(400).json('Credenciais inválidas');
        }
    } catch (e) {
        console.log(e);
        res.status(500).json('Erro interno do servidor');
    }
});


// Aplicar o middleware de autenticação às rotas protegidas
{/*app.get('/profile', authMiddleware, (req, res) => {
    // Se a solicitação chegou aqui, o usuário está autenticado
    // Você pode prosseguir com a lógica da rota, por exemplo:
    res.json({ message: 'Usuário autenticado. Informações do perfil.' });
  });*/}


{/*app.get('/profile', authMiddleware, async (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if(err) throw err;
        res.json(info);
        
    });
});*/}

router.post('/logout', async (req, res) => {
    res.cookie('token', '').json('ok');
});

module.exports = router;
