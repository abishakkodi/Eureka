const User = require("../db").User;
const bcrypt = require('bcrypt');

module.exports = userSignIn = (req, res) => {
    let email = req.body.params.email;
    let password = req.body.params.password;

    User.findOne({ email: email}, (err, user) => {
        console.log(user);
        if(err) {
            return err;
        } else if(!user) {
            res.status(401).send('Invalid authentication');
        } else {
            bcrypt.compare(password, user.password, (err, response) => {
                if(response === true) {
                    console.log(Object.keys(user.categoryPreference).length)
                    if(user.categoryPreference['category'].length === 0) {
                        res.send(201);
                    } else {
                        res.send(200);
                        console.log('Authentication successful!');
                    }
                } else {
                    console.log('Wrong password, try again');
                    res.send(205);
                }
            })
            }
        })
};


