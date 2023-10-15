const express = require("express");

const cors = require("cors");

const mysql = require("mysql2");
const password = "pass@123"
const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",

  password:  "pass@123",
  database: "ezbiz",
});

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.get("/show", (req, res) => {
  res.json({ msg: "success" });
});

app.post("/login", (req, res) => {
  const { username, password,compcode } = req.body;

  console.log(username, password,compcode);

  db.query(
    `SELECT * FROM user_mast WHERE user_name = '${username}' AND user_password = '${password}' AND comp_code = '${compcode}'`,
    function (err, result) {
      console.log('err',err)
      if (err) {
        console.log(err);
        return res
          .status(404)
          .json({ status: "failed", message: "Email or pasword is incorrect" });
      } else if (result.length === 0) {
        return res
          .status(404)
          .json({ status: "failed", message: "Email or pasword is incorrect" });
      }
      
      return res.json({ status: "success", message: "Login success", result });
    }
  );
});



app.post("/area", (req, res) => {
  const { compcode } = req.body;

  db.query(
    `SELECT cust_area FROM cust_mast WHERE comp_code = '${compcode}'`,
    function (err, results) {
      if (err) {
        return res.status(404).json({ status: "failed" });
      } else {
        return res.json({ status: "success", data: results });
      }
    }
  );
});

app.post("/cust", (req, res) => {
  const { area, compcode } = req.body;
  





  console.log(area,compcode);
  db.query(
    `SELECT * FROM cust_mast WHERE comp_code = '${compcode}' AND cust_area = '${area}'`,
    function (err, results) {
        console.log(err)
      if (err) {
        return res.json({ status: "failed" });
      }

      return res.json({ status: "success", data: results });
    }
  );
});

app.post("/items", (req, res) => {
  const {compcode} = req.body;


  console.log('items route ',compcode,req.body);
  db.query(
    `SELECT * FROM item_mast WHERE comp_code = '${compcode}'`,
    function (err, results) {
      if (err) {
        return res.json({ status: "failed" });
      }

      return res.json({ status: "success", data: results });
    }
  );
});
   
app.post("/order", (req, res) => {
  

  console.log('order',req.body)
try{
  db.query(`SELECT MAX(ord_no) as ord_number FROM ord_mast WHERE comp_code  = "${req.body[0].comp_code}"`,function (err, results) {
    if (err) {
      console.log(err)
      return res.json({ status: "failed" });  
    }
    if(results.length > 0){
      console.log(typeof results[0].ord_number)
      let ord_number = results[0].ord_number + 1;
        db.query(
      `INSERT INTO ord_mast(comp_code,ord_no,ord_date,ord_time,act_code,act_name,act_address,act_phone,act_area,act_type,trx_disc,trx_total,trx_netamount,status_flag,user_code,user_name,lat_long,system_name) VALUES("${req.body[0].comp_code}","${ord_number}","${req.body[0].ord_date.split(" ")[0]}","${req.body[0].ord_time.split(" ")[1].split(".")[0]}","${req.body[0].act_code}","${req.body[0].act_name}","${req.body[0].act_address}","${req.body[0].act_phone}","${req.body[0].act_area}","${req.body[0].act_type}","${req.body[0].trx_disc}","${req.body[0].trx_total}","${req.body[0].trx_netamount}","${req.body[0].status_flag}","${req.body[0].user_code}","${req.body[0].user_name}","${req.body[0].lat_long}","${req.body[0].system_name}")`,
       
      function(err, results, fields) {
        if (err) {
          console.log(err)
          return res.json({ status: "failed" });  
        }
        console.log(fields,"fields-------------------")
      
         
          for(let i = 0; i < req.body.length; i++){
            // console.log(
            //   req.body[i].comp_code,
            //   req.body[i].ord_date,
            //   req.body[i].ord_time,
            //   req.body[i].item_code,
            //   req.body[i].item_name,
            //   req.body[i].item_qty,
            //   req.body[i].item_price,
            //   req.body[i].item_price,
            //   req.body[i].item_tax,
            //   req.body[i].item_disc,
            //   req.body[i].item_cess,
            //   req.body[i].trx_total,
            //   req.body[i].status_flag,
            //   req.body[i].act_code,
            //   req.body[i].act_name,
            //   req.body[i].act_address,
            //   req.body[i].act_phone,
            //   req.body[i].act_area,
            //   req.body[i].act_type,
            //   req.body[i].trx_disc,
            //   req.body[i].trx_netamount,
            //   req.body[i].user_code,
            //   req.body[i].user_name,
            //   req.body[i].lat_long,
            //   req.body[i].system_name,
            //   req.body[i].grand_total)


            db.query(`INSERT INTO ord_trxfile(comp_code,ord_no,ord_date,item_code,item_name,item_qty,item_mrp,item_price,item_tax,item_disc,item_cess,trx_total,status_flag) VALUES("${req.body[i].comp_code}","${ord_number}","${req.body[i].ord_date.split(" ")[0]}","${req.body[i].item_code}","${req.body[i].item_name}","${req.body[i].item_qty}","0","${req.body[i].item_price}","${req.body[i].item_tax}","${req.body[i].item_disc}","${req.body[i].item_cess}","${req.body[i].trx_total}","${req.body[i].status_flag}")`,
            function (err, results) {
              if (err) {
                console.log(err)
                
                return res.json({ status: "failed" });  
              }
            
          })
        }
        // return res.json({ status: "success", data: results });

        
      
  
  });

    }

})
}
catch (err) {
  console.log(err)
}
  })

app.listen(5500,()=>console.log('Server has started at 5500'));