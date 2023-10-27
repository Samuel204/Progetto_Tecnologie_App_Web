var userModel = require('./userModel');
var key = '123456789trytryrtyr';
var encryptor= require('simple-encryptor')(key);

module.exports.createUserDBService = (userDetails)  =>  {
  return new Promise(function myFn (resolve, reject){

    var userModelData= new userModel();

    userModelData.username= userDetails.username;
    userModelData.password= userDetails.password;
    userModelData.role= userDetails.role;
    var encrypted = encryptor.encrypt(userDetails.password);
    userModelData.password=encrypted;

    userModelData.save(function resultHandle(error, result){

      if(error){
        reject(false);
      }else{
        resolve(true);
      }
    });


  });
}

/*
User.findOne({email: email}.then(user => {
    if(user){
        res.send({message: "User already registered"})
    } else {
        const user = new User ({
            name,
            email,
            password
           })
           user.save(err => {
            if(err){
                res.send(err)
            } else {
                res.send({message:"Successfully Registered"})
            }
           })
    }
   })
* */

module.exports.loginUserDBService =(userDetails) =>
{
  return new Promise(function myFun(resolve,reject)
  {
    userModel.findOne({username: userDetails.username}, function getResult (errorValue,result)
    {
      if(errorValue)
      {
        reject({status:false,msg: "invalid data"});
      }
      else {
        if(result!==undefined && result !==null)
        {
          var decrypted =encryptor.decrypt(result.password);

          if(decrypted===userDetails.password)
          {
            resolve({status:true, msg:"User validated successfully"});
          }
          else {
            reject({status:false,msg: "user validated failed"});
          }

        }
        else {
          reject({status:false, msg: "invalidated user details"});
        }
      }
    });
  });

}
