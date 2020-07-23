/* express.js */
import express from 'express';
import config from './config';
import index from '../server/routes/index.route';
import bodyParser from 'body-parser';
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import cookieParser from 'cookie-parser'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())
app.use(morgan('dev'))

app.set('views', './views')
app.set("view engine", "jade")

/* GET home page. */
app.upload = function (req, res) {
    console.log(req.body)
};

app.get('/', (req, res) => {
    res.send(`server started express on  port http://127.0.0.1:${config.port} (${config.env})`)
})
app.use('/OnlineText', index)

app.use(express.static(path.join('C:/OnlineText/', 'public')));

app.use(function (req, res) {
    res.status(404).render('404page')
})

export default app