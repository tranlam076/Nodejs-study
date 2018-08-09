'use strict';
import encryptModel from '../models/encrypt';

let bcrypt = require('bcrypt');
const saltRounds = 5;
let salt = bcrypt.genSaltSync(saltRounds);
let encryptArray = encryptModel.getAllHash();

export default class EncryptHelper {
    executeEncryptAddText = (text) => {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(text, salt, function (err, hash) {
                    if (err) {
                        reject(err);
                    } else {
                        encryptModel.saveNewHash(hash);
                        resolve({
                            data: 'hash saved'
                        });
                    }
                });
            });
        })
    };

    executeEncryptCheckText = (text) => {
        let isExist = false;
        return new Promise((resolve, reject) => {
            if (encryptArray.length > 0) {
                for (let i = 0; i < encryptArray.length; i++) {
                    try {
                        isExist = bcrypt.compareSync(text, encryptArray[i]);
                    } catch (e) {
                        reject(e);
                    }
                    if (isExist === true) {
                        break;
                    }
                }
                if (isExist === true) {
                    resolve({
                        data: 'text existed'
                    })
                } else {
                    resolve({
                        data: 'text didnt exist'
                    })
                }
            } else {
                resolve({
                    data: 'text didnt exist'
                })
            }
        })
    }
};
