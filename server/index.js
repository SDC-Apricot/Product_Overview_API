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
    db.client.query(` 
    SELECT row_to_json(info) results
    FROM (
      SELECT *,
        (
          SELECT array_to_json(array_agg(row_to_json(row)))
          FROM (
            SELECT feature, value
            FROM Features
            WHERE features.productId = product_info.productId
          ) row
        ) as features
      FROM Product_Info
      WHERE productId = ${product_id}
    ) info
    `, (err, data) => {

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
  let product_id = 1;
  db.client.query(` SELECT 
                      p.productId AS productId, 
                      p.name AS productName,
                      s.id AS styleId, 
                      s.name AS styleName, 
                      s.original_price AS styleOriginalPrice, 
                      s.default_style AS styleDefault, 
                      s.sale_price AS styleSalePrice, 
                      ph.styleId AS photoStyleId,
                      ph.url AS photoURL,
                      ph.thumbnail_url AS photoThumbURL, 
                      sk.size AS skuSize,
                      sk.quantity AS skuQuantity
                    FROM Product_Info p
                    LEFT OUTER JOIN Styles s 
                    ON s.productId = p.productId
                    LEFT OUTER JOIN Photos ph
                    ON ph.styleId = s.id
                    LEFT OUTER JOIN SKUS sk
                    ON sk.styleId = s.id
                    WHERE s.productId = ${product_id}`, (err, data) => {
    if (err) {
      // console.log('error in /products/:product_id/styles - ', err);
      res.send(err);
    } else {
      // console.log('data from /products/:product_id/styles - ', data.rows);
      res.send(data.rows);
    }
  })
});

// Returns the id's of products related to the product specified.
app.get('/products/:product_id/related', (req, res) => {
  let product_id = 1;
  db.client.query(` SELECT * FROM Product_Info
                    LEFT OUTER JOIN Related ON Related.productId = Product_Info.productId 
                    WHERE Related.productId = ${product_id}`, (err, data) => {
    if (err) {
      // console.log('error in /products/:product_id/related - ', err);
      res.send(err);
    } else {
      // console.log('data from /products/:product_id/related - ', data.rows);
      res.send(data.rows);
    }
  })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});