const jwt = require('jsonwebtoken');

const jwtVerify = (req, res, next) => {
    let token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, 'secret_key', (err, decoded) => {
            if (err) {
                if (err.name == "TokenExpiredError") {
                    return res.send({
                        message: 'Token Süreniz dolmuştur!'
                    })
                } else if (err.name == "JsonWebTokenError") {
                    return res.send({
                        message: 'Geçersiz Token !'
                    })
                } else {
                    return res.send({
                        message: 'Yetkiniz Bulunmamaktadır !'
                    })
                }
            } else {
                next();
            }

        })
    } else {
        console.log('Token Bulunmamaktadır !');
        return res.send({
            message: 'Token Bulunmamaktadır !'
        })
    }
}
module.exports = { jwtVerify };