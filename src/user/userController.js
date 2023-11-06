import bcrypt from "bcryptjs"
import Role from "../user/roleModel.js";
import User from "../user/userModel.js"
export const createUserControllerFn = async (req, res) =>
{
 const role=await Role.find({role: 'User'});
 const salt = await bcrypt.genSalt(10);
  const hashPassword =await bcrypt.hash(req.body.password, salt);
  const newUser = new User({
    username : req.body.username,
    password: req.body.password,
    role: req.body.role

  });
  await newUser.save();
  return res.status(200).send("User registered successfully!");
}

export const loginUserControllerFn = async (req, res)=>
{
  try{
    const user =await User.findOne({username: req.body.username});

    if(!user){
      return res.status(404).send("User not found!");
    }
    //NON TROVA CAMPO PASSWORD???
    const isPasswordCorrect =await bcrypt.compare(req.body.password, user.password);
    if(!isPasswordCorrect){
      return res.status(400).send("password is incorrect");
    }
    return res.status(200).send("Login success!");

  }
  catch (error){
    return res.status(500).send("Something in the login went wrong");

  }
}

export const registerAdmin = async (req, res, next) => {
  const role =await Role.find({});
  const salt =await bcrypt.genSalt(10);
  const hashPassword =await bcrypt.hash(req.body.password, salt);
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    role:role
  });
  await newUser.save();
  return res.status(200).send("User registered successfully");
}
