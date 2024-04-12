const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;

module.exports = function(req, res, next) {
    //verifica se o token esta presente nos cookies da solicitação
    const token = req.cookies.token;

    if(!token) {
        return res.status(400).json({message: "Acesso nao autorizado. Faça o login para continuar"});
    }

    //verifica se p token é valido
    jwt.verify(token, secret,(err, decoded) => {
        if (err) {
            return res.status(400).json({message: "Token invalido, faça o login para continuar"});
        }

        req.user = decoded;
        next();

    });

};