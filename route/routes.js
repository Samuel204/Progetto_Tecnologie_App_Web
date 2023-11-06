var express =require('express');

var userController =require ("../src/user/userController");

//const roleController=require("/src/user/roleController")
const router = express.Router();

//router.route('/user/role').post( roleController.createRole);

router.route('/user/login').post(userController.loginUserControllerFn);
router.route('/user/create').post(userController.createUserControllerFn);

module.exports= router;
