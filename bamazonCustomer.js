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
    customerOrder();
});

function customerOrder() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;

        inquirer
            .prompt([{
                    name: "purchaseItems",
                    type: "rawlist",
                    message: "Select Item to Purchase",
                    choices: function() {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].product_name);
                        }
                        return choiceArray;
                    }
                },
                {
                    name: "orderQuantity",
                    type: "input",
                    message: "Quantity to purchase:",
                    validate: function(value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }
            ])
            .then(function(answer) {
                var chosenItem;
                var quantityOrdered = answer.orderQuantity;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].product_name === answer.purchaseItems) {
                        chosenItem = results[i];
                    }
                }

                if (parseInt(answer.orderQuantity) < chosenItem.stock_quantity) {
                    var newQuantity = chosenItem.stock_quantity - parseInt(answer.orderQuantity);
                    connection.query(
                        "UPDATE products SET ? WHERE ?", [{
                                stock_quantity: newQuantity
                            },
                            {
                                item_id: chosenItem.item_id
                            }
                        ],
                        function(error) {
                            if (error) throw err;
                            console.log("Your order has been placed");
                            customerOrder();
                        }
                    );
                } else {
                    // bid wasn't high enough, so apologize and start over
                    console.log("Insufficient quantity!");
                    customerOrder();
                }
            });
    })
}