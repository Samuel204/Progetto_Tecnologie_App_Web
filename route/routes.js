var express =require('express');

var userController =require ("../src/user/userController");
import Role from '/src/user/roleModel';
const router = express.Router();

router.route('/user/role').post( async (req,res,next)=> {
  try{
    if(req.body.role && req.body.role!==''){
      const newRole = new Role(req.body);
      await newRole.save();
      return res.send("Role Created!");
    }
    else{
      return res.status(400).send("bad request");
    }
  }catch(error){
    return res.status(500).send("internal server eroor");
  }
}
);

router.route('/user/login').post(userController.loginUserControllerFn);
router.route('/user/create').post(userController.createUserControllerFn);

module.exports= router;
