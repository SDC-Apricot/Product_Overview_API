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
      SELECT *, (
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
  db.client.query(` 
    SELECT row_to_json(id) results
    FROM (
      SELECT productId, (
          SELECT array_to_json(array_agg(row_to_json(row)))
          FROM (
            SELECT 
              id AS styleId, name, original_price, sale_price, default_style AS default,  (
                SELECT array_to_json(array_agg(row_to_json(row_inner)))
                FROM (
                  SELECT thumbnail_url, url
                  FROM Photos
                  WHERE Styles.id = photos.styleId
                ) row_inner
              ) as photos, 
              (
                SELECT array_to_json(array_agg(row_to_json(row_skus)))
                FROM (
                  SELECT size, quantity
                  FROM SKUS
                  WHERE Styles.id = skus.styleId
                ) row_skus
              ) as skus
            FROM Styles
            WHERE Styles.productId = product_info.productId
          ) row
        ) as results
      FROM Product_Info
      WHERE productId = ${product_id}
    ) id
    `, (err, data) => {
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
  db.client.query(` 
    SELECT array (
      SELECT related_productId
      FROM Related
      WHERE productId = ${product_id}
    ) related
    `, (err, data) => {
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