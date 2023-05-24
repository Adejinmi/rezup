const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
import { getCookie, setCookie } from 'cookies-next';



export default function handler(req, res) {
    const db = new sqlite3.Database('database/esm.db', (err) => {
        if (err) {
          return res.status(400).json({isAuth:false});
        }
        
      });
      const token = req.headers.authorization
       if(token){
            jwt.verify(token,process.env.SECRET, function(err,data){
                if (err) {
                    return res.status(400).json({isAuth:false})
                }
                
                const  { username, id } =  data
                const sql = `SELECT username from users WHERE id='${id}'`
                db.get(sql, function(err, row){
                   
                    if (row && row.username==username){ return res.status(200).json({isAuth:true}) }
                    else{return res.status(400).json({isAuth:false});}
                })
            })
            
        }
        else{
            return res.status(400).json({isAuth:false})
        }
       
    }
    
