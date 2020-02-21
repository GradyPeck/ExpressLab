const express = require("express");
const cartEndpoint = express.Router();

let cart = [
    {
        id : 1,
        product : "stamps",
        price : 2,
        quantity : 7
    },
    {
        id : 2,
        product : "lampposts",
        price : 200,
        quantity : 4
    },
    {
        id : 3,
        product : "bluefin tuna",
        price : 87,
        quantity : 1
    }
];

cartEndpoint.get( '/cart-items', (req, res) => {
    res.json(cart);
});

cartEndpoint.get( '/cart-items/:id', (req, res) => {
    let itemFound;
    const searchId = req.params.id;
    for(thingy of cart) {
        if(thingy.id == searchId) {
            itemFound = thingy;
        }
    }
    if(itemFound == null) {
        res.status(404);
        res.json("ID Not Found!");
    }
    else {
        res.json(itemFound);
    }
});

cartEndpoint.post( '/cart-items', (req, res) => {
    const body = req.body;

    const ID = Date.now();

    const newItem = {
        id: ID,
        product: body.product,
        price: body.price,
        quantity: body.quantity
    }

    cart.push(newItem);

    res.json(newItem);
});

cartEndpoint.put( '/cart-items/:id', (req, res) => {
    const newItem = req.body;
    const searchId = req.params.id;
    for(thingy of cart) {
        if(thingy.id == searchId) {
            thingy.product = newItem.product;
            thingy.price = newItem.price;
            thingy.quantity = newItem.quantity;
            res.status(201);
            res.json(thingy);
        }
    }
});

cartEndpoint.delete( '/cart-items/:id', (req, res) => {
    const searchId = req.params.id;
    for (let i = 0; i < cart.length; i++) {
        if(cart[i].id == searchId) {
            cart.splice(i, 1);
            res.status(204);
            res.json();
        }
    }
});

module.exports = cartEndpoint;