const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

//Load Product model
const Product = require("./models/Product");

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").url;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//Insert 10 records in a Product collection
const products = [
  {
    _id: 1,
    pname: "Samsung",
    category: "Mobile",
    price: "5000",
    quantity: "50"
  },
  {
    _id: 2,
    pname: "Bed",
    category: "Furniture",
    price: "10000",
    quantity: "10"
  },
  {
    _id: 3,
    pname: "Nokia",
    category: "Mobile",
    price: "3245",
    quantity: "10"
  },
  {
    _id: 4,
    pname: "Samsung",
    category: "TV",
    price: "20000",
    quantity: "5"
  },
  {
    _id: 5,
    pname: "Table",
    category: "Furniture",
    price: "12000",
    quantity: "8"
  },
  {
    _id: 6,
    pname: "Chair",
    category: "Furniture",
    price: "500",
    quantity: "20"
  },
  {
    _id: 7,
    pname: "Utensils",
    category: "Household",
    price: "10000",
    quantity: "100"
  },
  {
    _id: 8,
    pname: "Sofa",
    category: "Household",
    price: "30000",
    quantity: "2"
  },
  {
    _id: 9,
    pname: "Ladder",
    category: "Household",
    price: "5000",
    quantity: "5"
  },
  {
    _id: 10,
    pname: "Mop",
    category: "Household",
    price: "100",
    quantity: "10"
  }
];

const newproducts = [
  {
    _id: 11,
    pname: "LG",
    category: "Washing Machine",
    price: "5000",
    quantity: "10"
  },
  {
    _id: 12,
    pname: "Fridge",
    category: "Household",
    price: "10000",
    quantity: "10"
  },
  {
    _id: 13,
    pname: "Mixie",
    category: "Household",
    price: "3245",
    quantity: "5"
  },
  {
    _id: 14,
    pname: "Dressing Table",
    category: "Furniture",
    price: "5000",
    quantity: "5"
  },
  {
    _id: 15,
    pname: "Dining Table",
    category: "Furniture",
    price: "12000",
    quantity: "5"
  }
];
//Insert 10 records in the Product collection
Product.insertMany(products, { ordered: false })
  .then(() => ({ success: true }))
  .catch(err => console.log(err));

//Index Page
app.get("/", function(req, resp) {
  var msg = "<h1>Index Page</h1>";
  msg += '<a href="/ShowAll"> Products Details </a><br>';
  msg += '<a href="/add"> Add a product </a><br>';
  msg += '<a href="/addmore"> Add 5 more products </a><br>';
  resp.send(msg);
});

//Product Details
app.get("/ShowAll", function(req, resp) {
  resp.writeHead(200, { "Content-Type": "text/html" });
  resp.write("<h1>Product Details</h1>");
  resp.write("<table border = '1'>");
  resp.write("<thead>");
  resp.write(
    "<tr><th>Product ID</th><th>Product Name</th><th>Category</th><th>Price</th><th>Quantity</th></tr></thead>"
  );

  for (i = 0; i < products.length; i++) {
    var p = products[i];
    resp.write(
      "<tr><td>" +
        p._id +
        "</td><td>" +
        p.pname +
        "</td><td>" +
        p.category +
        "</td><td>" +
        p.price +
        "</td><td>" +
        p.quantity +
        "</td></tr>"
    );
  }
  resp.write("</table>");
  resp.write('<a href="/">Go back</a>');
  resp.end();
});

//GET the html page to display form to add a Product
app.get("/add", function(req, resp) {
  resp.sendFile(path.join(__dirname + "/index.html"));
});

//POST the html page to add a new Product
app.post("/add", function(req, resp) {
  const p = {
    _id: req.body._id,
    pname: req.body.pname,
    category: req.body.category,
    price: req.body.price,
    quantity: req.body.quantity
  };
  products.push(p);
  //Save Product
  new Product(p)
    .save()
    .then(() => ({ success: true }))
    .catch(err => console.log(err));
  console.log("Row added successfully");
});

//Insert 5 new records in the Product collection
app.get("/addmore", function(req, resp) {
  products.push(...newproducts);

  Product.insertMany(newproducts, { ordered: false })
    .then(() =>
      resp.send(
        "5 new records added successfully" + '<br><a href="/">Go back</a>'
      )
    )
    .catch(err => console.log(err));
  console.log("5 new rows added successfully");
});

//Default server port 9000
const port = process.env.PORT || 9000;

//Server listens on the default port
app.listen(port, () => console.log(`Server runnning on port ${port}`));
