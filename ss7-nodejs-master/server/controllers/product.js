'use strict';
import {requestHelper} from '../helpers/index';

const uri = 'http://5b128003d50a5c0014ef11ed.mockapi.io/api/v1/products';
export default class ProductController {
    getAll = async (req, res) => {
        try {
            const data = await requestHelper.executeRequest(uri, 'GET', null);
            res.status(200).json(data);
        } catch (e) {
            res.status(400).json(e);
        }
    };

    getOne = async (req, res) => {
        try {
            const id = req.params.id;
            const data = await requestHelper.executeRequest(uri + `/${id}`, 'GET', null);
            res.status(200).json(data);
        } catch (e) {
            res.status(400).json(e);
        }
    };

    saveProduct = async (req, res) => {
        const id = req.params.id;
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
            let isAvailable = null;
            if (typeof data.isAvailable === 'string') {
                isAvailable = data.isAvailable === 'true' ? true : false;
                data.isAvailable = isAvailable;
            }
            const price = parseInt(data.price);
            if (Number.isNaN(price)) {
                return res.status(400).json({
                    error: 'Price is not a number'
                });
            }
            let dataRes;
            if (id === undefined) {
                dataRes = await requestHelper.executeRequest(uri, 'POST', data);
            } else {
                dataRes = await requestHelper.executeRequest(uri + `/${id}`, 'PUT', data);
            }
            res.status(200).json(dataRes);
        } catch (e) {
            res.status(400).json(e);
        }
    };

    delete = async (req, res) => {
        const id = req.params.id;
        let dataRes;
        try {
            dataRes = await requestHelper.executeRequest(uri + `/${id}`, 'DELETE', null);
            res.status(200).json(dataRes);
        } catch (e) {
            res.status(400).json(e);
        }
    };
}
