'use strict';

import {Group, User, Op} from '../models';
import {responseHelper} from '../helpers/index'

export default class GroupController {
    getListGroup = async (req, res, next) => {
        try {
            const groups = await Group.findAll({
                order: [
                    ['createdAt', 'DESC']
                ],
                // include: [{
                //     model: User,
                //     as: 'author'
                //
                // }]
                // ,
                attributes: {
                    exclude: 'authorId'
                }

            });
            responseHelper.responseSuccess(res, groups);
        } catch (e) {
            responseHelper.responseError(res, e.message);
        }

    };

    createGroup = async (req, res, next) => {
        try {
            const {name, avatar, authorId, type} = req.body;
            const newGroup = await Group.create({
                name,
                authorId,
                avatar,
                type
            });
            responseHelper.responseSuccess(res, newGroup);
        } catch (e) {
            responseHelper.responseError(res, e.message);
        }
    };

    getOneGroup = async (req, res, next) => {
        try {
            const {id} = req.params;
            const group = await Group.findById(id);
            if (!group) {
                responseHelper.responseError(res, new Error('Group not found'));
            }
            responseHelper.responseSuccess(res, group);
        } catch (e) {
            responseHelper.responseError(res, e.message);
        }
    };

    updateGroup = async (req, res, next) => {
        try {
            const {id} = req.params;
            const {name, avatar, authorId, type} = req.body;
            const updatedGroup = await Group.update(
                {
                    name,
                    authorId,
                    avatar,
                    type
                },
                {
                    where: {
                        id
                    },
                    returning: true
                }
            );
            if (updatedGroup[0] === 0) {
                responseHelper.responseError(res, new Error('Cant update group'));
            }
            responseHelper.responseSuccess(res, updatedGroup[1]);
        } catch (e) {
            responseHelper.responseError(res, e.message);
        }
    };

    deleteGroup = async (req, res, next) => {
        try {
            const {id} = req.params;
            await Group.destroy({
                where: {
                    id
                }
            });
            responseHelper.responseSuccess(res, true);
        } catch (e) {
            responseHelper.responseError(res, e.message);
        }
    };
}