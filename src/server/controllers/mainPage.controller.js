import jwtModule from '../modules/jwt.module'

const mainPageGet = (req, res) => {

    const token = req.cookies.token;
    jwtModule.jwtVerify(token).then((jwtVerify_result) => {

        res.render('mainPage')

    }).catch((err) => {
        res.redirect('./login');
        // res.send(err)
    })
}


export default {
    mainPageGet
}