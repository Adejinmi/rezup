import { deleteCookie } from 'cookies-next';


export default async function handler(req, res) {
    if (req.method==="POST"){
        deleteCookie("Auth", { req, res, path: '/', domain: process.env.NEXT_PUBLIC_DOMAIN })   
        return res.status(200).json({signedOut:true}) 
    }
    return res.status(401)
    
}

