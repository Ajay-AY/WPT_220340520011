const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "cdac",
  database: "webDevelopment",
  port: 3306,
});

const express = require("express");
const app = express();
// const cors = require("cors");
// app.use(cors());

const bodyParser = require("body-parser");

app.use(express.static("abc"));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not

var result;

app.get("/getDetails", (req, res) => {
  let input = req.query.id;
  result = { status: false, detail: {} };
  connection.query(
    "select bookid,bookname,price from book where bookid =?",
    [input],
    (err, row) => {
      if (err) {
        result = err;
        console.log("trouble " + err);
      } else {
        if (row.length > 0) {
          result.status = true;
          result.detail = row[0];
          console.log("success" + result.detail);
        } else {
          console.log("Check where condition");
        }
      }

      res.send(result);
    }
  );
});

app.get("/update", (req, res) => {
  let input = {
    id: req.query.id,
    bname: req.query.bname,
    price: req.query.price,
  };
  let status = false;
  connection.query(
    "update book set bookname =?,price=? where bookid =?",
    [input.bname, input.price, input.id],
    (err, row) => {
      if (err) {
        result = err;
        console.log("trouble " + err);
      } else {
        if (row.affectedRows > 0) {
          status = true;
          console.log("success" + status);
        } else {
          console.log("Check where condition");
        }
      }

      res.send(status);
    }
  );
});

// app.post("/poc1", function (req, res) {
//   console.log("reading input " + req.body.v1 + "  second " + req.body.v2);

//   var xyz = { v1: 37, v2: 35 };
//   res.send(xyz);
// });

// app.get("/poc2", function (req, res) {
//   console.log("reading input " + req.query.xyz);

//   var xyz = { v1: 37, v2: 35 };

//   res.send(xyz);
// });

app.listen(8081, function () {
  console.log("server listening at port 8081...");
});
