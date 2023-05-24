const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
const saltRounds = 10;

const db = new sqlite3.Database('database/esm.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
});



export default async function handler(req, res) {
  if (req.method==="POST"){
    const token =  getCookie("Auth",{ req, res })
    const { username, password } = req.body
      
          let sql = `SELECT id, password from users where username='${username}'`
             db.get(sql,  async function(err, rows) {
              if(err){
                return res.status(400).send("invalid username or password")
              }
              else if (!rows){return res.status(400).json({message:"Invalid username or password"})}
              else{
                const pass = await bcrypt.compare(password, rows.password)
                if(pass){
          
                  const token = jwt.sign({
                    id: rows.id,
                    username:username
                  }, process.env.SECRET, { expiresIn: 60*60});
        
                  setCookie('Auth',token, { req, res, maxAge: 60 * 60 * 24, sameSite:'strict', path:"/" })
                  
                  return res.status(200).json({isAuth:true})
               }
               else{
                return res.status(400).json({message:"Invalid username or password"})
               }
              }
            })

    
  }
  else{
   return res.status(400).send("not allowed")
    
  }
  
}

