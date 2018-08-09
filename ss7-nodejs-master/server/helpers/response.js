'use strict';
import HTTPStatus from 'http-status';

export default class Response {

    static success(res, data) {
        res
            .status(HTTPStatus.OK)
            .send({
                data: data
            });
    }

	static error(res, e, code) {
		res
			.status(code)
			.send({
				error: {
					message: e.message || e,
					code: code
				}
			});
	}

};