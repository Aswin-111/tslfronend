

const cors = require("cors");

const mysql = require("mysql2");

const axios = require('axios')

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  port : 3306,
  password:  "pass@123",
  database: "ezbiz",
});

axios.post('http://localhost:5400/query',{query:"SELECT JSON_ARRAYAGG(JSON_OBJECT('item name', item_name, 'item code', item_code)) as jsondata from item_mast;"}).then((result)=>{
  console.log(result)
}).catch((err)=>{
  console.log(err)
})