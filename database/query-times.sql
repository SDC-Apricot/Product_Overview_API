\timing

-- Get product list
SELECT * FROM Product_Info LIMIT 5;

-- Get product information
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
      WHERE productId = 1000000
    ) info;

-- Get style and photo information
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
      WHERE productId = 1000000
    ) id;
  
-- Get related products array
SELECT * FROM Related
WHERE Related.productId = 1000000;

\timing