import jwt from 'jsonwebtoken'


const SECRET = 'thisismynewproject'
const expires = 1000 * 10000
const jwtVerify = (token)=>{
    
    return new Promise((resolve, reject)=>{

        jwt.verify(token, SECRET, (err, payload) =>{
            
            if(err){
                console.error('jwtVerify error:', err)
                reject(err)

            }else{

                resolve(payload);

            }
        })
    })
    
}

const jwtSetCookie = (user_account, res)=>{

    return new Promise((resolve, reject)=>{
        try{
            const token = jwt.sign({ _id: user_account.toString() }, SECRET, { expiresIn: '1 day' })
            res.cookie('token', token, { maxAge: expires, httpOnly: true, secure: false })
            resolve("CookieSet");
        }
        catch(err){
            console.error('jwtSetCookie error:', err)
            reject(err)
        }
        
        
    })

}

export default{
    jwtVerify,
    jwtSetCookie
}