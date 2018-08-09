'use strict';
import {uploadHelper} from '../helpers/index';

export default class UploadController {
    saveFile = async (req, res) => {
        try {
            const data = await uploadHelper.executeUpload(req);
            res.status(200).json(data);
        } catch (e) {
            res.status(400).json(e);
        }
    };
}
