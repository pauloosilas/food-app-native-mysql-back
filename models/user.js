const db = require('../config/config');
const bcrypt = require('bcryptjs');

const User = {};

User.findById = (id, result) => {
    const sql = `
    SELECT
        id,
        email,
        name,
        lastname,
        image,
        password
    FROM 
        users
    WHERE
        id=?`; //parametros

    db.query(
        sql,
        [id], //parametros
        (err, user) => {
            if(err) {
             console.log('Error: ', err);
             result(err, null);
            }
            else{
            console.log('Usuário: ', user)
            result(null, user);
            }
        }
    )
}


User.findByEmail = (email, result) => {
    const sql = `
    SELECT
        id,
        email,
        name,
        lastname,
        image,
        password
    FROM 
        users
    WHERE
        email=?`; //parametros

    db.query(
        sql,
        [email], //parametros
        (err, user) => {
            if(err) {
             console.log('Error: ', err);
             result(err, null);
            }
            else{
            console.log('Usuário: ', user[0])
            result(null, user[0]);
            }
        }
    )
}


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