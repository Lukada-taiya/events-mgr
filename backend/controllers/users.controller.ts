import { add, drop, get, getAll, update } from "../models/users.model";
import { User } from "../interfaces/users";
import { hasher } from "../helpers/hasher";

export const getUsers = async (req : any, res: any) => { 
    try { 
      const results = await getAll(); 
      res.json({success: true, data: results});
    } catch (error: any) {
      res.status(500).json({ isSuccess: false, message: error.message });
    }
}

export const getUser = async (req: any, res : any) => {
    try {  
        const results = await get(req.params.id);
        res.json({success: true, data: results});
    } catch (error:any) {
      res.status(500).json({ isSuccess: false, message: error.message });
    }
}

export const addUser = async (req : any, res : any) => {
    try {
      const newUser = req.body; 
      newUser.password = hasher(req.body.password);
      newUser.isadmin = newUser.isadmin ? '1' : '0'; 
      const results = await add(newUser); 
      res.json({
          message: "User registered successfully",
          data: results,
          isSuccess: true
      });
    } catch (error: any) {
      res.status(500).json({ isSuccess: false, message: error.message });
    }
  }

  export const modifyUser = async (req : any, res: any) => {
    try {
      const userId : number = req.params.id;
      const user : User = req.body;   
      user.password =  hasher(user.password);
      user.isadmin = user.isadmin ? '1' : '0'; 
      const results = await update(userId, user);    
      res.json({
          message: "User updated successfully",
          data: results,
          isSuccess: true
      });
    } catch (error: any) {
      res.status(500).json({ isSuccess: false, message: error.message });
    }
  }

  export const deleteUser = async (req : any, res: any) => {
    try {  
      const results = await drop(req.params.id);
      res.json({
          message: "User deleted successfully",
          data: results,
          isSuccess: true
      });
    } catch (error: any) {
      res.status(500).json({ isSuccess: false, message: error.message });
    }
  }