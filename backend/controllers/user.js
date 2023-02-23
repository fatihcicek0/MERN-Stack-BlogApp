const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const maxAge = 60 * 60 * 24;
const createToken = (userId) => {
    return jwt.sign({ userId }, 'secret_key',maxAge);
}
exports.Register = (req, res) => {
    const { name, email, password } = req.body;
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                res.send({
                    message: 'This email cannot be used !'
                })
            } else {
                bcrypt.hash(password, 10).then(hashedPassword => {
                    const newUser = new User({
                        name: name,
                        email: email,
                        password: hashedPassword
                    });
                    newUser.save();
                    res.send({
                        message: 'Registered '
                    })
                }).catch(err => { console.log(err) });
            }
        })
}

exports.Login = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                res.send({
                    message: 'This email is not being used !'
                })
            }
            bcrypt.compare(password, user.password)
                .then(comparedPassword => {
                    if (comparedPassword) {
                        const token = createToken(user.id);
                        res.send({
                            accessToken: token,
                            userId: user.id,
                            userName: user.name
                        })
                    } else {
                        res.send({
                            message: ' Wrong password !'
                        })
                    }
                })

        }).catch(err => { console.log(err) });
}
