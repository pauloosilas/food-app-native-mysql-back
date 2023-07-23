const db = require('../config/config');

const User = {};

User.create = (user, result) => {
    const sql = `INSERT INTO
                    users(
                        email,
                        name,
                        lastname,
                        phone,
                        image,
                        password,
                        created_at,
                        updated_at
                    )
                    values(?,?,?,?,?,?,?,?);`;

    db.query(
        sql,
        [
            user.email,
            user.name,
            user.lastname,
            user.phone,
            user.image,
            user.password,
            new Date(),
            new Date()
        ],
        (err, res) => {
            if(err) {
             console.log('Error: ', err);
             result(err, null);
            }
            else{
            console.log('Id do novo usuario: ', res.insertId)
            result(null, res.insertId);
            }
        }
    )
}

module.exports = User;