var express =require('express');

var userController =require ("../src/user/userController");

import {createRole} from "../src/user/roleController";

const router = express.Router();

router.route('/user/role').post( createRole);

router.route('/user/login').post(userController.loginUserControllerFn);
router.route('/user/create').post(userController.createUserControllerFn);

module.exports= router;
