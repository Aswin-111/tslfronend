const express = require("express");

const cors = require("cors");

const mysql = require("mysql2");

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",

  password: "pass@123",
  database: "ezbiz",
});

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.get("/show", (req, res) => {
  res.json({ msg: "success" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  console.log(username, password);

  db.query(
    `SELECT * FROM users WHERE user_name = '${username}' AND user_password = '${password}'`,
    function (err, result) {
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
        return res.json({ status: "failed" });
      } else {
        return res.json({ status: "success", data: results });
      }
    }
  );
});

app.post("/cust", (req, res) => {
  const { area, compcode } = req.body;

  db.query(
    `SELECT * FROM cust_mast WHERE comp_code = '${compcode}' AND area = '${area}'`,
    function (err, results) {
      if (err) {
        return res.json({ status: "failed" });
      }

      return res.json({ status: "success", data: results });
    }
  );
});

app.post("/items", (req, res) => {
  const { compcode, custcode } = req.body;
  db.query(
    `SELECT * FROM item_mast WHERE comp_code = '${custcode}' AND cust_code = '${custcode}'`,
    function (err, results) {
      if (err) {
        return res.json({ status: "failed" });
      }

      return res.json({ status: "success", data: results });
    }
  );
});

app.listen(3000);
