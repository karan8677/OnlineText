import jwtModule from '../modules/jwt.module'

const mainPageGet = (req, res) => {

    const token = req.cookies.token;
    jwtModule.jwtVerify(token).then((jwtVerify_result) => {

        res.render('TestPage')

    }).catch((err) => {
        res.redirect('https://127.0.0.1:3000/OnlineText/login');
        // res.send(err)
    })
}


export default {
    mainPageGet
}