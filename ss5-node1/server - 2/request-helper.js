const url = 'http://5b128003d50a5c0014ef11ed.mockapi.io/api/v1/products';
const request = require('request');
module.exports = {
    getAllProducts: function (res) {
        const options = {
            url: url,
            method: 'GET',
        };
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(JSON.parse(body));
                try {
                    if (typeof body === 'object') {
                        return res.status(200).json(body)
                    } else {
                        return res.status(200).json(JSON.parse(body));
                    }                } catch (e) {
                    console.log(e.message);
                }
            }
        }
        request(options, callback);
    },
    getProduct: function (res, id) {
        const options = {
            url: url + `/${id}`,
            method: 'GET',
        };
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                try {
                    if (typeof body === 'object') {
                        return res.status(200).json(body)
                    } else {
                        return res.status(200).json(JSON.parse(body));
                    }                } catch (e) {
                    console.log(e.message);
                }
            }
        }
        request(options, callback);
    },
    postProduct: function (res, product) {
        const options = {
            url: url,
            method: 'POST',
            json: (typeof product === 'string') ? JSON.stringify(product) : product
        };
        function callback(error, response, body) {
            if (!error && response.statusCode == 201) {
                try {
                    if (typeof body === 'object') {
                        return res.status(200).json(body)
                    } else {
                        return res.status(200).json(JSON.parse(body));
                    }
                } catch (e) {
                    console.log(e.message);
                }
            }
        }
        request(options, callback);
    },
    putProduct: function (res, product) {
        const options = {
            url: url + `/${product.id}`,
            method: 'PUT',
            json: (typeof product === 'string') ? JSON.stringify(product) : product
        };
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                try {
                    if (typeof body === 'object') {
                        return res.status(200).json(body)
                    } else {
                        return res.status(200).json(JSON.parse(body));
                    }
                } catch (e) {
                    console.log(e.message);
                }
            }
        }
        request(options, callback);
    },
    deleteProduct: function (res, id) {
        const options = {
            url: url + `/${id}`,
            method: 'DELETE',
        };
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                try {
                    if (typeof body === 'object') {
                        return res.status(200).json(body)
                    } else {
                        return res.status(200).json(JSON.parse(body));
                    }
                } catch (e) {
                    console.log(e.message);
                }
            }
        }
        request(options, callback);
    }
};