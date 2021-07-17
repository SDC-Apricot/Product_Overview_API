const express = require('express');
const app = express();
const port = 4000;

const db = require('../database/connect.js');

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Retrieves the list of products.
app.get('/products', (req, res) => {
  db.client.query('SELECT * FROM Product_Info LIMIT 10', (err, data) => {
    if (err) {
      // console.log('error in /products - ', err);
      res.send(err);
    } else {
      // console.log('data from /products - ', data.rows);
      res.send(data.rows);
    }
  })
});

// Returns all product level information for a specified product id.
app.get('/products/:product_id', (req, res) => {
  let product_id = 1;
  db.client.query(` SELECT * FROM Product_Info 
                    LEFT OUTER JOIN Features ON Features.productId = Product_Info.productId 
                    WHERE Features.productId = ${product_id}`, (err, data) => {
    if (err) {
      // console.log('error in /products/:product_id - ', err);
      res.send(err);
    } else {
      // console.log('data from /products/:product_id - ', data.rows);
      res.send(data.rows);
    }
  })
});

// Returns the all styles available for the given product.
app.get('/products/:product_id/styles', (req, res) => {
  
});

// Returns the id's of products related to the product specified.
app.get('/products/:/products/:product_id/related', (req, res) => {
  
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});