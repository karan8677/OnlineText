import accountModule from '../modules/login.module'

const loginPost = (req, res)=>{
    const insertValues = req.body

    accountModule.checkAccount(insertValues).then((result)=>{
        if (result === "success login") {
           
            res.redirect('main_Page');
            console.log("success")
        } else if (result === "fail login"){
            res.render("login", {
                success: false
            })
            console.log("fail")
        }
    }).catch((err)=> {
        if(err.code === "ER_DUP_ENTRY"){
            res.render("login", {
                success:true
            })
        }else{
            res.send(err)
        }
    })


}

export default{
    loginPost
}