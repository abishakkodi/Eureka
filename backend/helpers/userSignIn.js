const User = require("../db").User;
const bcrypt = require('bcrypt');
const session = require('express-session');

module.exports = userSignIn = (req, res) => {
    console.log("backend helped login")
    let email = req.body.params.email;
    let password = req.body.params.password;

    User.findOne({ email: email}, (err, user) => {
        console.log(user);
        if(err) {
            return err;
        } else if(!user) {
            res.status(403).send('User Does not exist.');
        } else {
            bcrypt.compare(password, user.password, (err, response) => {
                if(response === true) {
                    console.log(Object.keys(user.categoryPreference).length)
                    if(user.categoryPreference['category'].length === 0) {
                        res.session.email = email;
                        res.status(201).send({email:email});
                    } else {
                      res.session.email = email;
                      res.send(200);
                        console.log('Authentication successful!');
                    }
                } else {
                    console.log('Wrong password, try again');
                    res.send(402);
                }
            })
            }
        })

};


