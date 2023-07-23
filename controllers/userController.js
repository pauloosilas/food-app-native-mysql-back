const User = require('../models/user');

module.exports = {
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