var products = [
    {
        id: 2,
        name: 'iPhone 7',
        price: 10000,
        isAvailable: true
    },
    {
        id: 5,
        name: 'Galaxy s9',
        price: 500,
        isAvailable: false
    },
    {
        id: 4,
        name: 'iPhone 6',
        price: 700,
        isAvailable: true
    },
    {
        id: 6,
        name: 'Nokia 8',
        price: 600,
        isAvailable: false
    }
];

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

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

app.get('/api/v1/products', function (req, res) {
    return res.status(200).json(products);
});

app.get('/api/v1/products/:id', function (req, res) {
    const id = parseInt(req.params.id);
    const index = findProductByIdName(id);
    if (index !== -1) {
        return res.status(200).json(products[index]);
    }
    return res.status(400).json({
        error: 'Id is not available'
    });
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
        if (findProductByIdName(null, data.name) !== -1) {
            return res.status(400).json({
                error: 'Product name existed'
            })
        }
        data.id = products.length + 1;
        createNewId(data);
        products.push(data);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e.message);
    }
    return status(400).json({
        error: 'Have something wrong'
    })
});

function createNewId(data) {
    if (findProductByIdName(data.id, null) === -1) {
        return;
    } else {
        data.id++;
        createNewId(data);
    }
}

app.put('/api/v1/products/:id', function (req, res) {
    var data = req.body;
    data.id = parseInt(req.params.id);
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
    if (findProductByIdName(null, data.name) !== -1) {
        if (findProductByIdName(null, data.name) !== findProductByIdName(data.id, null)) {
            return res.status(400).json({
                error: 'Product name existed'
            });
        }
    }
    const index = findProductByIdName(data.id, null);
    if (index !== -1) {
        products[index] = data;
        return res.status(200).json(data);
    }
    return res.status(400).json({
        error: 'Id is not available'
    });
});

app.delete('/api/v1/products/:id', function (req, res) {
    const id = parseInt(req.params.id);
    const index = findProductByIdName(id, null);
    if (index !== -1) {
        var product = products[index];
        products.splice(index, 1);
        return res.status(200).json(product);
    }
    return res.status(400).json({
        error: 'Id is not available'
    });
});

function findProductByIdName(id = null, name = null) {
    for (var i = 0; i < products.length; i++) {
        if (products[i].id === id || products[i].name === name) {
            return i;
        }
    }
    return -1;
}

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});