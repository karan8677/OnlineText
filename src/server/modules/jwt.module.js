import jwt from 'jsonwebtoken'

const SECRET = 'thisismynewproject'
const expires = 1000 * 1000

const jwtVerify = (token)=>{
    
    return new Promise((resolve, reject)=>{

        jwt.verify(token, SECRET, (err, payload) =>{
            
            var resultPackage = {}

            if(err){
                console.error('verify error:', err)
                resultPackage["verify"] = "unverify"
                resolve(resultPackage);
                // reject(err)

            }else{
                resultPackage["verify"] = "verify"
                resultPackage["payload"] = payload
                resolve(resultPackage);
            }
        })
    })
    
}

const jwtSetCookie = (user_account, res)=>{

    return new Promise((resolve, reject)=>{

        const token = jwt.sign({ _id: user_account.toString() }, SECRET, { expiresIn: '1 day' })
        res.cookie('token', token, { maxAge: expires, httpOnly: true, secure: false })
        resolve("CookieSet");

    })

}

export default{
    jwtVerify,
    jwtSetCookie
}