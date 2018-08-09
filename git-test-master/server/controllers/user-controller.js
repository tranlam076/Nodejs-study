'use strict';

import {User, Op} from '../models';

export default class UserController {
    getListUser = async (req, res, next) => {
        try {
            const users = await User.findAll({
                order: [
                    ['createdAt', 'DESC']
                ]
            });
            return res.status(200).json({
                success: true,
                data: users
            });
        } catch (e) {
            console.log(e);
            return res.status(400).json({
                success: false,
                error: e.message
            })
        }

    };

    createUser = async (req, res, next) => {
        try {
            const {username, password, address} = req.body;
            if (!Array.isArray(address) || address.length === 0) {
                return res.status(400).json({
                    success: false,
                    error: 'Address is invalid'
                });
            }

            let newHash = await encryptHelper.createHash(password);

            const newUser = await User.create({
                username,
                password: newHash,
                address
            });

            return res.status(200).json({
                success: true,
                data: newUser
            });
        } catch (e) {
            return res.status(400).json({
                success: false,
                error: e.message
            })
        }
    };

    getOneUser = async (req, res, next) => {
        try {
            const {id} = req.params;
            const user = await User.findById(id);
            if (!user) {
                return res.status(400).json({
                    success: false,
                    error: 'User is not found'
                });
            }
            return res.status(200).json({
                success: true,
                data: user
            });
        } catch (e) {
            return res.status(400).json({
                success: false,
                error: e.message
            });
        }
    };

    updateUser = async (req, res, next) => {
        try {
            const {id} = req.params;
            const {username, address} = req.body;
            const updatedUser = await User.update(
                {
                    username,
                    address
                },
                {
                    where: {
                        id
                    },
                    returning: true
                }
            );
            if (updatedUser[0] === 0) {
                return res.status(400).json({
                    success: false,
                    error: 'Cannot update user'
                });
            }
            return res.status(200).json({
                success: true,
                data: updatedUser[1]
            });
        } catch (e) {
            return res.status(400).json({
                success: false,
                error: e.message
            });
        }
    };

    deleteUser = async (req, res, next) => {
        try {
            const {id} = req.params;
            await User.destroy({
                where: {
                    id
                }
            });
            return res.status(200).json({
                success: true,
                data: true
            })
        } catch (e) {
            console.log(e);
            return res.status(400).json({
                success: false,
                error: e.message
            });
        }
    };

    searchUser = async (req, res) => {
        try {
            const {username} = req.params;
            const user = await User.find({
                where: {
                    username: {
                        [Op.iLike]: '%' + username + '%'
                    }
                }
            });
            if (user !== null) {
                return res.status(200).json(user.dataValues);
            } else {
                return res.status(400).json({
                    success: false,
                    error: "user not found"
                });
            }
        } catch (e) {
            console.log(e);
            return res.status(400).json({
                success: false,
                error: e.message
            });
        }
    };

    changePassword = async (req, res, next) => {
        try {
            const {id} = req.params;
            const {currentPassword, newPassword} = req.body;
            const user = await User.find({
                where: {
                    id
                }
            });

            let checkPassword = await encryptHelper.checkHash(currentPassword, user.password);
            if (checkPassword) {
                let newHash = await encryptHelper.createHash(newPassword);

                const updatedUser = await User.update(
                    {
                        password: newHash
                    },
                    {
                        where: {
                            id
                        },
                        returning: true
                    }
                );
                if (updatedUser[0] === 0) {
                    return res.status(400).json({
                        success: false,
                        error: 'Cannot update password'
                    });
                }
                return res.status(200).json({
                    success: true,
                    data: updatedUser[1]
                });
            }
        } catch (e) {
            return res.status(400).json({
                success: false,
                error: (e) ? e.message : "current password is incorrect"
            });
        }
    };
}