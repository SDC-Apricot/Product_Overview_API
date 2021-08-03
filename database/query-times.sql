\timing

SELECT * FROM Product_Info LIMIT 5;

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
      WHERE productId = 1
    ) info;

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
      WHERE productId = 1
    ) id;
  
SELECT array_to_json(array_agg(row_to_json(t)))
  FROM (
    SELECT related_productId 
    FROM Related
    WHERE productId = 1
    ) t;

\timing