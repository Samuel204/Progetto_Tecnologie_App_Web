var express =require('express');

const userController = require("/src/user/userController.js");
const roleController = require( "../src/user/roleController.js");

const router = express.Router();
/*
router.route('/user/role').post( roleController.createRole);

router.route('/user/login').post(userController.loginUserControllerFn);
router.route('/user/create').post(userController.createUserControllerFn);
router.route('/user/create-admin').post(userController.registerAdmin);
*/

router.post('/user/login', userController.loginUserControllerFn);
router.post('/user/create', userController.createUserControllerFn);
router.post('/user/create-admin', userController.registerAdmin);
router.post('/user/role', roleController.createRole);


module.exports= {router};
