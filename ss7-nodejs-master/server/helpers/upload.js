'use strict';
let formidable = require('formidable');
export default class UploadHelper {
    executeUpload = (req) => {
        return new Promise((resolve, reject) => {
            let form = new formidable.IncomingForm();
            form.parse(req);

            form.on('fileBegin', (name, file) => {
                file.path = './server/uploads/' + file.name;
            });

            form.on('file', (name, file) => {
                resolve({
                    success: 'file saved',
                    path: file.path
                });
            });

            form.on('error', (err) => {
                reject(err);
            });
        })
    }
};
