/* express.js */
import express from 'express';
import config from './config';
import index from '../server/routes/index.route';
import bodyParser from 'body-parser';
import cors from 'cors'
import morgan from 'morgan'

const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))

/* GET home page. */
app.get('/', (req, res) => {
    res.send(`server started express on  port http://127.0.0.1:${config.port} (${config.env})`)
})

app.use('/OnlineText', index)


export default app