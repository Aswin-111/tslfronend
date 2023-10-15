
const mysql = require("mysql2");

const axios = require('axios')

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  port : 3306,
  password:  "###%%database%%###ret",
  database: "invsoftArman",
});



custupdate()
// itemupdate()

function itemupdate(){
try{

// ord compcode shopcode shopname shopaddress phone area shope type items name item item price qty ord time ord date user code user name
db.query(`TRUNCATE TABLE item_mast`,function (err,res){
db.query(`SELECT JSON_ARRAYAGG(JSON_OBJECT('comp_code', comp_code, 'item_code', item_code, 'item_name', item_name, 'item_qty', close_qty, 'item_price1', P_RETAIL, 'item_price2', P_WS, 'item_price3', P_VAN, 'item_price4', PRICE5, 'item_price5', PRICE6, 'item_mrp', MRP, 'item_cost', item_cost, 'item_tax', sales_tax, 'item_disc', DISC, 'item_cess', CESS_PER, 'hsn_code', remarks, 'item_uom', PACK_TYPE)) as jsondata from itemmast`,function (err,result,fields){
  
  let data = JSON.parse(JSON.stringify(result))[0].jsondata


// item_mast (comp_code, item_code , item_name , item_qty, item_price1 , item_price2, item_price3 , item_price4 , item_price5, item_mrp , item_cost , item_netcost , item_tax , item_disc, item_cess , hsn_code varchar(8), item_uom varchar(10), PRIMARY KEY (comp_code, item_code)) ENGINE = MyISAM;






let item_master = `INSERT INTO TABLE item_mast(comp_code,item_code,item_name,item_qty,item_price1,item_price2,item_price3,item_price4,item_price5,item_mrp,item_cost,item_netcost,item_tax,item_disc,item_cess,hsn_code,item_uom) VALUES `;

for(let i = 0; i < data.length; i++){
    let item = data[i]




    // query+=`("${item.comp_code}","${item.item_code}","${item.item_name}","${item.item_qty}","${item.item_price1}","${item.item_price2}","${item.item_price3}","${item.item_price4}","${item.item_price5}","${item.item_mrp}","${item.item_cost}","0","${item.item_tax}","${item.item_disc}","${item.item_cess}","${item.hsn_code}","${item.item_uom}")${i < data.length - 1?",":""}`
    let finalquery = `${item_master}("${item.comp_code}","${item.item_code}","${item.item_name}","${item.item_qty}","${item.item_price1}","${item.item_price2}","${item.item_price3}","${item.item_price4}","${item.item_price5}","${item.item_mrp}","${item.item_cost}","0","${item.item_tax}","${item.item_disc}","${item.item_cess}","${item.hsn_code}","${item.item_uom}")`

    axios.post('http://89.47.164.122:3000/query',{query:finalquery}).then((result)=>{
    console.log(result)
  }).catch((err)=>{
    console.log(err)
  })
  }


})
})
return "Success"
}
catch(err){
  console.log(err)
  return err
}}





function custupdate()
{
try{

    
    db.query(`TRUNCATE TABLE cust_mast`,function (err,res){
    db.query(`SELECT JSON_ARRAYAGG(JSON_OBJECT('comp_code', comp_code, 'cust_code', act_code, 'cust_name', act_name, 'cust_address', ADDRESS, 'cust_phone', TELNO, 'cust_area', area, 'cust_type', type, 'cust_gst', KGST, 'Old_bal', YTD_CR)) as jsondata from custmast`,function (err,result,fields){
      
      let data = JSON.parse(JSON.stringify(result))[0].jsondata

    // cust_mast (comp_code , cust_code , cust_name , cust_address, cust_phone , cust_area, cust_type , cust_gst , Old_bal double, PRIMARY KEY (comp_code, cust_code)) ENGINE = MyISAM;
    
    
    let custtemplate = `INSERT INTO TABLE cust_mast(comp_code,cust_code,cust_name,cust_address,cust_phone,cust_area,cust_type,cust_gst,Old_bal) VALUES`;
    
   

    for(let i = 0; i < data.length; i++){

        let cust = data[i]
    
    
        // query+=`("${cust.comp_code}","${cust.cust_code}","${cust.cust_name}","${cust.cust_address}","${cust.cust_phone}","${cust.cust_area}","${cust.cust_type}","${cust.cust_gst}","${cust.Old_bal}")${i < data.length - 1?",":""}`
        
        
        let finalquery = `${custtemplate}("${cust.comp_code}","${cust.cust_code}","${cust.cust_name}","${cust.cust_address}","${cust.cust_phone}","${cust.cust_area}","${cust.cust_type}","${cust.cust_gst}","${cust.Old_bal}")`
  

        axios.post('http://89.47.164.122:3000/query',{query:finalquery}).then((result)=>{
            console.log(result)
          }).catch((err)=>{
            console.log(err)
            
          })
      }
    


 
    
    
   
      
    
    })
})
    return "Success"
    }
    catch(err){
      console.log(err)
      return err
    }
}