'use strict';
let encryptArray = [

];
export default class Encrypt {

    static find (option) {
    };

    static findOne (option) {
        for (let i = 0; i < encryptArray.length; i++){
            if (option === encryptArray[i]) {
                return i;
            } else {
                return -1;
            }
        }
    };

    static saveNewHash (data) {
        encryptArray.push(data);
    };

    static update (option, data) {

    };

    static getAllHash () {
        return encryptArray;
    };
}