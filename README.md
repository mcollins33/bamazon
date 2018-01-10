# bamazon

bamazonCustomer.js

This app is an Amazon-like app where a customer is able to view a list of products for sale and make a purchase.  This app is coded using javascript, nodejs, inquirer and mysql.  The products are stored in a table with the following information:  id, product name, department name, price and quantity available.  The customer selects an item and then inputs a quantity to purchase.  If the item is not available, "Insufficient quantity" is returned.  If the item is available, the customer receives the option to purchase another item or complete the purchase.  Once the purchase is completed, a summary of items purchased and a total is provided.  

bamazonManager.js

This app is a continuation of the bamazonCustomer app.  It allows a Manager to view all inventory, view low inventory (products with quantity<5), add new products to inventory, and increase product quantities.  