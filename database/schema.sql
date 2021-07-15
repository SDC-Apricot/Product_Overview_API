-- Create Database
DROP DATABASE IF EXISTS products;
CREATE DATABASE products;
USE products;

-- Table 'Product Info'
DROP TABLE IF EXISTS Product_Info;
CREATE TABLE Product_Info (
  id INTEGER NOT NULL,
  name VARCHAR NOT NULL,
  slogan VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  category VARCHAR NOT NULL,
  default_price DECIMAL NOT NULL,
  PRIMARY KEY (id)
);

-- Table 'Related'
DROP TABLE IF EXISTS Related;	
CREATE TABLE Related (
  id INTEGER NOT NULL,
  productId INTEGER NOT NULL,
  related_productId INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- Table 'Styles'
DROP TABLE IF EXISTS Styles;
CREATE TABLE Styles (
  id INTEGER NOT NULL,
  productId INTEGER NOT NULL,
  name VARCHAR NULL DEFAULT NULL,
  sale_price VARCHAR NULL DEFAULT NULL, 
  -- ^ sale price is erroring when null if data type is not a string, may need to keep this in mind when working on the server
  original_price DECIMAL NULL DEFAULT NULL,
  default_style INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- Table 'Features'
DROP TABLE IF EXISTS Features;
CREATE TABLE Features (
  id INTEGER NOT NULL,
  productId INTEGER NOT NULL,
  feature VARCHAR NULL DEFAULT NULL,
  value VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- Table 'Photos'
DROP TABLE IF EXISTS Photos;	
CREATE TABLE Photos (
  id INTEGER NOT NULL,
  styleId INTEGER NOT NULL,
  url VARCHAR NULL DEFAULT NULL,
  thumbnail_url VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- Table 'SKUS'
DROP TABLE IF EXISTS SKUS;	
CREATE TABLE SKUS (
  id INTEGER NOT NULL,
  styleId INTEGER NOT NULL,
  size VARCHAR NULL DEFAULT NULL,
  quantity INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);
