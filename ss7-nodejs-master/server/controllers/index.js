import ProductController from './product';
import UploadController from './upload';
import EncryptController from './encrypt';

module.exports = {
    productController: new ProductController(),
    uploadController: new UploadController(),
    encryptHelper: new EncryptController()
};