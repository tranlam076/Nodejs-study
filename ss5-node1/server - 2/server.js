const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const requestHelper = require('./request-helper.js');

app
    .use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
        next();
    });

app
    .use(bodyParser.json()) // Execute every single request
    .use(bodyParser.urlencoded({extended: true}));

app.get('/api/v1/products', function (req, res, next) {
    return requestHelper.getAllProducts(res);
});

app.get('/api/v1/products/:id', function (req, res) {
    const id = req.params.id;
    return requestHelper.getProduct(res, id);
});

app.post('/api/v1/products', function (req, res) {
    const data = req.body;
    try {
        if (data.name === null || data.name === '' || data.name === undefined) {
            return res.status(400).json({
                error: 'Name is a require field'
            });
        }
        if (data.price === null || data.price === '' || data.price === undefined) {
            return res.status(400).json({
                error: 'Price is a require field'
            });
        }
        var isAvailable = null;
        if (typeof data.isAvailable === 'string') {
            isAvailable = data.isAvailable === 'true' ? true : false;
            data.isAvailable = isAvailable;
        }
        var price = parseInt(data.price);
        if (Number.isNaN(price)) {
            return res.status(400).json({
                error: 'Price is not a number'
            });
        }
        return requestHelper.postProduct(res, data);
    } catch (e) {
        console.log(e.message);
    }
    return status(400).json({
        error: 'Have something wrong'
    })
});

app.put('/api/v1/products/:id', function (req, res) {
    var data = req.body;
    data.id = req.params.id;
    try {
        if (data.name === null || data.name === '' || data.name === undefined) {
            return res.status(400).json({
                error: 'Name is a require field'
            });
        }
        if (data.price === null || data.price === '' || data.price === undefined) {
            return res.status(400).json({
                error: 'Price is a require field'
            });
        }
        var isAvailable = null;
        if (typeof data.isAvailable === 'string') {
            isAvailable = data.isAvailable === 'true' ? true : false;
            data.isAvailable = isAvailable;
        }
        var price = parseInt(data.price);
        if (Number.isNaN(price)) {
            return res.status(400).json({
                error: 'Price is not a number'
            });
        }
    } catch (e) {
        console.log(e.message);
    }
    return requestHelper.putProduct(res, data);
});

app.delete('/api/v1/products/:id', function (req, res) {
    const id = req.params.id;
    return requestHelper.deleteProduct(res, id);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});