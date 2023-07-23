const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pauloosilas@1',
    database: 'delivery'
});

db.connect(function(err){
    if(err) throw err;
    console.log('Database connected...')
});

module.exports = db;