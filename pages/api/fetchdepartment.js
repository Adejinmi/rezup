import { Database } from "sqlite3";


export default function Handler (req,res){
if (req.method==="POST") {
    const db = new Database('database/esm.db');
    db.all("SELECT prefix,dname FROM department", function(err, row) {
        if (err) {
            res.status(500).json({message:"Something went wrong"})
        }
        res.status(201).send({row})
        db.close();
  });
    
}
else{
    res.status(401).json({message:"Something went wrong"})
}
}

