-- Load data into tables
\COPY Product_Info(productId,name,slogan,description,category,default_price) FROM '/Users/pscheutzow/Desktop/Data/product.csv' DELIMITER ',' CSV HEADER;
\COPY Related(id,productId,related_productId) FROM '/Users/pscheutzow/Desktop/Data/related.csv' DELIMITER ',' CSV HEADER;
\COPY Styles(id,productId,name,sale_price,original_price,default_style) FROM '/Users/pscheutzow/Desktop/Data/styles.csv' DELIMITER ',' CSV HEADER;
\COPY Features(id,productId,feature,value) FROM '/Users/pscheutzow/Desktop/Data/features.csv' DELIMITER ',' CSV HEADER;
\COPY Photos(id,styleId,url,thumbnail_url) FROM '/Users/pscheutzow/Desktop/Data/photos.csv' DELIMITER ',' CSV HEADER;
\COPY SKUS(id,styleId,size,quantity) FROM '/Users/pscheutzow/Desktop/Data/skus.csv' DELIMITER ',' CSV HEADER;

-- Check first row of data
SELECT * FROM Product_Info WHERE productId = 1;
SELECT * FROM Related WHERE id = 1;
SELECT * FROM Styles WHERE id = 1;
SELECT * FROM Features WHERE id = 1;
SELECT * FROM Photos WHERE id = 1;
SELECT * FROM SKUS WHERE id = 1;
