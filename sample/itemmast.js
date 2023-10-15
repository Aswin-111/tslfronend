const fs = require('fs');
const mysql = require("mysql2");

const axios = require('axios')

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  port : 3306,
  password:  "pass@123",
  database: "ezbiz",
});

try{

// ord compcode shopcode shopname shopaddress phone area shope type items name item item price qty ord time ord date user code user name
  db.query("SELECT JSON_ARRAYAGG(JSON_OBJECT('comp_code', comp_code, 'item_code', item_code, 'item_name', item_name, 'item_qty', item_qty, 'item_price1', item_price1, 'item_price2', item_price2, 'item_price3', item_price3, 'item_price4', item_price4, 'item_price5', item_price5, 'item_mrp', item_mrp, 'item_cost', item_cost, 'item_tax', item_tax, 'item_disc', item_disc, 'item_cess', item_cess, 'hsn_code', hsn_code, 'item_uom', item_uom')) as jsondata from itemmast`,function (err,res){
    console.log(err)
    console.log(res)
  })

  
  // let data = JSON.parse(JSON.stringify(result))[0].jsondata
  // console.log(data)
  
  // fs.writeFileSync('./items.json',JSON.stringify(data));

  // axios.post('http://localhost:3000/query',{query:"SELECT JSON_ARRAYAGG(JSON_OBJECT('item name', item_name, 'item code', item_code)) as jsondata from item_mast;"}).then((result)=>{
  //   console.log(result)
  // }).catch((err)=>{
  //   console.log(err)
  // })

// })
}
catch(err){
  console.log(err)
}