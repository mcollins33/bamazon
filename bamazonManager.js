var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "g3t5mart",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    managerOptions();
});

function managerOptions() {

    inquirer
        .prompt([{
            name: "options",
            type: "rawlist",
            message: "Select Option",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
        }])
        .then(function(answer) {
            console.log(answer);
            if (answer.options === "View Products for Sale") {
                viewProducts();
            } else if (answer.options === "View Low Inventory") {
                viewLowInventory();
            } else if (answer.options === "Add to Inventory") {
                addToInventory();
            } else {
                addNewProduct();
            }
        });

    function viewProducts() {
        connection.query("SELECT * FROM products", function(err, results) {
            if (err) throw err;
            for (var i = 0; i < results.length; i++) {
                console.log("Item ID: " + results[i].item_id + " | Product Name: " + results[i].product_name + " | Price: $" + results[i].price + " | Stock Quantity: " + results[i].stock_quantity);
            }
            console.log("\n");
            managerOptions();
        })
    }

    function viewLowInventory() {
        connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, results) {
            if (err) throw err;
            for (var i = 0; i < results.length; i++) {
                console.log("Item ID: " + results[i].item_id + " | Product Name: " + results[i].product_name + " | Price: $" + results[i].price + " | Stock Quantity: " + results[i].stock_quantity);
            }
            console.log("\n");
            managerOptions();
        })
    }

    function addNewProduct() {
        inquirer
            .prompt([{
                    name: "productname",
                    type: "input",
                    message: "Input product name: ",
                },
                {
                    name: "department",
                    type: "input",
                    message: "Input product department: ",
                },
                {
                    name: "productprice",
                    type: "input",
                    message: "Input price of product: ",
                },
                {
                    name: "quantityonhand",
                    type: "input",
                    message: "Input quantity of product on hand: ",
                },
            ])
            .then(function(answer) {
                console.log(answer);
                connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)", [answer.productname, answer.department, answer.productprice, answer.quantityonhand], function(err, results) {
                    if (err) throw err;
                    console.log("Product has been added\n")
                    managerOptions();
                })
            });

    }
}