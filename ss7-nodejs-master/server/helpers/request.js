'use strict';
const request = require('request');
export default class RequestHelper {
    executeRequest = (uri, method, data) => {
        return new Promise((resolve, reject) => {
            request({
                    method,
                    uri,
                    json: (typeof data === 'string') ? JSON.stringify(data) : data
                },
                (error, response, body) => {
                    if (error) {
                        reject(error);
                    } else {
                        try {
                            if (typeof body === 'object') {
                                resolve(body);
                            } else {
                                resolve(JSON.parse(body));
                            }
                        } catch (e) {
                            console.log(e.message);
                        }
                    }
                })
        });
    };
};
