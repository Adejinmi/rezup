import { Database } from "sqlite3";

export default function Handler (req, res){ 
    if (req.method="POST") {
        const db = new Database('database/esm.db')
        const { query, typ, year, sem, level, dept } = req.body
        const body=req.body
        let sql
        if (query) {
            if (dept.value==null) {
                 sql = typ=="name" ? `SELECT * from ${sem.value}${year.value}${level.value} where name like '%${query}%' `  : `SELECT * from ${sem.value}${year.value}${level.value} where matric=${query}`
            }
            else{
                 sql = typ=="name" ? `SELECT * from ${sem.value}${year.value}${level.value} where name like '%${query}%' and matric like '%___${dept.value}%' `  : `SELECT * from ${sem.value}${year.value}${level.value} where matric=${query}`
            }
            
        } else {
             sql = `SELECT * from ${sem.value}${year.value}${level.value} where matric like '%___${dept.value}%' `
        } 
        
        
        db.all(sql, function(err,row){
            if (err) {
                return res.status(201).json({err})
            }
            else{
                return res.status(201).send({row})
            }
        })
        
    }
    else{
        res.status(401).send({message:"Invalid Request"})
    }
}