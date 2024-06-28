const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
app.use(express.json());
app.use(cors());
// const session = require('express-session');

const db = mysql.createConnection ({
    user: "root",
    host: "localhost",
    password: "password",
    database: "restaurant"
})

app.post('/register', (req, res) => {

    const fname = req.body.fname
    const lname = req.body.lname
    const phone = req.body.phone
    const custID = req.body.custID

    db.query(
        "SELECT phone FROM customers WHERE phone = ?", [phone],
        (err, result) => {
            if (err) {
                res.send(err)
            }
            if (result!=0) {
                res.send("Already Registered")
            }
            if (result==0) {
                db.query(
                    "INSERT INTO customers (fname, lname, phone) VALUES (?, ?, ?)",
                    [fname, lname, phone],
                    (err, result) => {
                        if (err) {
                            res.send({err : err});
                        }
                        if(result!=0) {
                            db.query (
                                "SELECT * from customers WHERE phone = ?", [phone],
                                (err, result) => {
                                    console.log(result)
                                    res.send(result)
                                }
                            )
                            
                        }
                    }
                )
            }
        }
    )
}) 

app.post('/login', (req,res) => {
    const phone = req.body.phone
    db.query(
        "SELECT phone from customers WHERE phone = ?", [phone],
        (err, result) => {
            if (err) {
                res.send(err)
            }
            if (result==0) {
                res.send('Not Registered')
            }
            if (result!=0) {
                db.query(
                    "SELECT * from customers WHERE phone = ?", [phone],
                    (err, result) => {
                        res.send(result)
                    }
                )
            }
        }
    )
})

app.post('/addtocart', (req,res) => {

    const custID = req.body.custID 
    const food = req.body.food
    const cost = req.body.cost
    console.log("adding to cart")

    db.query(
        "INSERT INTO cart (custID, food, quantity, cost) VALUES (?, ?, 1, ?)", [custID, food, cost],
        (err, result) => {
            if (err) {
                res.send(err);
            }
            if (result!=0) {
                console.log("added to cart")
            }
        }
    )
})

app.post("/cart", (req,res) => {

    const custID = req.body.custID;

    db.query(
        "SELECT * from cart WHERE custID = ?", [custID],
        (err, result) => {
            if (err) {
                res.send(err)
            }
            if(result!=0) {
                res.send(result)
            }
        }
    )

})

app.post("/changeQuan", (req,res) => {

    console.log("inc")
    const food = req.body.food;
    const quantity = req.body.quantity;
    const cost = req.body.cost;

    db.query(
        "UPDATE cart SET quantity = ?, cost = ? WHERE food = ?", [quantity, cost, food],
        (err, result) => {
            if (err) {
                console.log(err)
            }
            if(result) {
                console.log(result)
            }
        }
    )
})

app.post("/delete", (req,res) => {

    const food = req.body.food;

    db.query(
        "DELETE FROM cart WHERE food = ?", [food],
        (err) => {
            if (err) {
                res.send(err)
            }
        }
    )
})

app.listen(3001, () => {
    console.log("running server")
})