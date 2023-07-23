const db = require('../config/config');
const bcrypt = require('bcryptjs');

const User = {};

User.create = async (user, result) => {

    const hash = await bcrypt.hash(user.password, 10)

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
            hash,
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