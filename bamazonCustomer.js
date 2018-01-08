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
    welcome();
});

var customerAnswer;
var chosenItem = [];
var numberPurchased = [];
var complete;
var i;

function welcome(){
    console.log("Welcome to Bamazon\n");
    customerOrder();
}

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
                customerAnswer = answer;
                updateArray();
            });

        function updateArray() {

            for (i = 0; i < results.length; i++) {
                if (results[i].product_name === customerAnswer.purchaseItems) {
                    updateStock();
                }
            }
        }

        function updateStock() {

            if (parseInt(customerAnswer.orderQuantity) <= results[i].stock_quantity) {
                chosenItem.push(results[i]);
                numberPurchased.push(customerAnswer.orderQuantity);
                var newQuantity = results[i].stock_quantity - parseInt(customerAnswer.orderQuantity);

                connection.query(
                    "UPDATE products SET ? WHERE ?", [{
                            stock_quantity: newQuantity
                        },
                        {
                            item_id: results[i].item_id
                        }
                    ],
                    function(error) {
                        if (error) throw err;
                    }
                );
                console.log("\nItem has been added\n")
                anotherItem();
            } else {
                // bid wasn't high enough, so apologize and start over
                console.log("\nInsufficient quantity!\n");
                anotherItem();
            }
        }

        function anotherItem() {
            inquirer
                .prompt([{

                    name: "purchaseComplete",
                    type: "confirm",
                    message: "Would you like to purchase another item?",
                }])
                .then(function(answer) {
                    complete = answer;
                    addItems();
                });
        }

        function addItems() {
            if (complete.purchaseComplete) {
                customerAnswer;
                customerOrder();
            } else {
                var purchaseAmount = 0;
                console.log("\nYour order has been placed");
                for (var i = 0; i < chosenItem.length; i++) {
                    console.log("Item: " + chosenItem[i].product_name + "  Qty: " + numberPurchased[i] + "  Price: $" + chosenItem[i].price + "  Total: $" + parseInt(numberPurchased[i]) * chosenItem[i].price);
                    purchaseAmount += chosenItem[i].price * parseInt(numberPurchased[i]);
                }
                console.log("-----------------------------------------------------------------")
                console.log("Total amount of purchase $" + purchaseAmount.toFixed(2) + "\n")
                chosenItem;
                reset();

            }
        }

        function reset() {
            var customerAnswer;
            var chosenItem = [];
            var numberPurchased = [];
            var complete;
            var i;
            welcome();
        }
    })
}