'use strict';
import {productController, uploadController, encryptHelper} from '../controllers/index';

module.exports = (app) => {
	app.route('/products')
		.get(productController.getAll)
		.post(productController.saveProduct);
	app.route('/products/:id')
		.get(productController.getOne)
		.put(productController.saveProduct)
		.delete(productController.delete);
	app.route('/upload')
		.post(uploadController.saveFile);
	app.route('/encrypt')
		.post(encryptHelper.execute);
};
