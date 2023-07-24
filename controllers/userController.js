const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = {
    login(req, res) {
        const email = req.body.email;
        const password = req.body.password;

        User.findByEmail(email, async (err, myUser) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Error when trying to register a new user!',
                    error: err
                });
            }
    
            if(!myUser){
                return res.status(401).json({
                    success: false,
                    message: 'Email not found!',
                });
            }
            const isPasswordValid = await bcrypt.compare(password, myUser.password)
            if(isPasswordValid){
                const token = jwt.sign({id: myUser.id, email: myUser.email}, keys.secretOrKey, {});
                const data = {
                    id: myUser.id,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    email: myUser.email,
                    phone: myUser.phone,
                    image: myUser.image,
                    session_token: `JWT ${token}`
                }

                return res.status(201).json({
                    success: true,
                    message: 'O usuário foi altenticado',
                    data: data
                })
            } 
            else{
              
                    return res.status(401).json({
                        success: false,
                        message: 'Password incorreto!',
                    });
            }         
        })
    },
   register(req, res){
    const user = req.body;
    User.create(user, (err, data) => {
        if(err){
            return res.status(501).json({
                success: false,
                message: 'Error when trying to register a new user!',
                error: err
            });
        }

        return res.status(201).json({
            success: true,
            message: 'Success to register',
            data: data
        })
    })
   } 
}