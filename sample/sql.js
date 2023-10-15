const express = require("express");

const cors = require("cors");

const mysql = require("mysql2");

const app = express();

app.use(cors())
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
const db = mysql.createConnection({
  host: "localhost",
  user: "root",

  password:  "pass@123",
  database: "ezbiz",
});




app.get('/getorder',(req,res) => {
    db.query(`SELECT * FROM ord_mast`,function (err, results) {
        return res.json(results)
    })
})
app.get('/gettrx',(req,res) => {
    db.query(`SELECT * FROM ord_trxfile`,function (err, results) {
        return res.json(results)
    })
})

app.post('/query',(req,res)=>{
db.query(`${req.body.query}`,function (err, results) {
    
    if(err) return res.status(404).json({err})
    return res.json(results)
})

})
app.listen(5400,()=>console.log('listening on port 5400'))