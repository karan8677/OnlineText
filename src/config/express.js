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
// app.set('views', path.join(__dirname, 'views'));
app.set('views', 'C:/OnlineText/views')
app.set("view engine", "jade")
/* GET home page. */
app.upload = function (req, res) {
    console.log(req.body)
};

// app.get('/', (req, res) => {
//     res.render('welcome')
// })
app.use('/OnlineText', index)

app.use(express.static(path.join('C:/OnlineText/', 'public')));

app.use(function (req, res) {
    res.status(404).render('404Page')
})

export default app