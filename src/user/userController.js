var userService =require('./userService');
var userModel =require('./userModel');
var createUserControllerFn = async (req, res) =>
{
  try {
    const body= req.body
    const userModelData = new userModel()
    userModelData.username =body.username
    userModelData.password=body.password
    userModelData.role = body.role
    await userModelData.save()

    res.status(200).send({
      "status":true, "message": "user created successfully"
    });

  }
  catch(err)
  {
    // res.status(400).send(error);
    console.log(err);
  }
}

var loginUserControllerFn = async (req, res)=>
{
  var result =null;
  try{
    result= await userService.loginUserDBService(req.body);
    if(result.status){
      res.send({"status":true, "message" : result.msg});
    }
    else{
      res.send({"status":false, "message" : result.msg});

    }
  }
  catch (error){
    console.log(error);

  }
}

module.exports = {createUserControllerFn, loginUserControllerFn};
