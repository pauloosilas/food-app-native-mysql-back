const express = require('express')
const app = express();
const http = require('http')
const server = http.createServer(app)
const logger = require('morgan')
const cors = require('cors')

const usersRoutes = require('./routes/userRoutes');

const port = process.env.PORT || 3000


app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cors())

app.disable('x-powered-by')

app.set('port', port)

app.get('/', (req, res) => {
    res.send('Rota raiz do backend')
})

app.use((err, req, res,next) => {
    console.log(err)
    res.status(err.status || 500).send(err.stack)
})


usersRoutes(app);

server.listen(port, '172.18.128.1' || localhost, function(){
    console.log('Aplicação de NodeJs iniciada na porta ' + port)
})
