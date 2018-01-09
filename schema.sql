DROP DATABASE IF EXISTS bamazon;

CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100),
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple iphone 7", "Electronics", 499.99, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Samsung Galaxy S8", "Electronics", 659.00, 4);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sony 55in Smart TV", "Electronics", 698.00, 2);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Vizio 50in Smart LED TV", "Electronics", 420.85, 1);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Canon PowerShot Digital Camera", "Electronics", 139.00, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nikon COOLPIX B500 Digital Camera", "Electronics", 256.95, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dyson Upright Vacuum", "Appliances", 257.98, 3);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Igloo 5.1cf Freezer", "Appliances", 199.00, 2);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("RCA 0.7cf Microwave Oven", "Appliances", 44.87, 4);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kenmore Top Load Washer", "Appliances", 459.99, 2);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kenmore Electric Dryer", "Appliances", 799.99, 1);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sharper Image Portable Ice Maker", "Appliances", 199.99, 0);

SELECT * FROM products