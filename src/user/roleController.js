import Role from "./roleModel";

export const createRole = async (req,res,next)=> {
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

