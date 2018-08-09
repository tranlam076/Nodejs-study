'use strict';
import {encryptHelper} from '../helpers/index';

export default class EncryptController {
    execute = async (req, res) => {
        if (req.body.check) {
            try {
                const data = await encryptHelper.executeEncryptAddText(req.body.text);
                res.status(200).json(data);
            } catch (e) {
                res.status(400).json(e);
            }
        } else {
            try {
                const data = await encryptHelper.executeEncryptCheckText(req.body.text);
                res.status(200).json(data);
            } catch (e) {
                res.status(400).json(e);
            }
        }
    };
}
