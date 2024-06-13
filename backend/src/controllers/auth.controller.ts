import {
  add,
  getIdByEmail,
  getUserByEmail,
  modifyPassword,
} from "../models/users.model";
import { User } from "../interfaces/users";
import { matcher, hasher } from "../helpers/hasher";

export const loginUser = async (req: any, res: any) => {
  try {
    const email: string = req.body.email;
    const password: string = req.body.password;
    const results = await getUserByEmail(email);
    if (results.length === 0) {
      res.status(404).json({ isSuccess: false, message: "User not found" });
    } else {
      const match = matcher(password, results[0].password);
      if (match) {
        res.json({
          message: "User registered successfully",
          data: results[0],
          isSuccess: true,
        });
      } else {
        res
          .status(401)
          .json({ isSuccess: false, message: "Invalid credentials" });
      }
    }
  } catch (error: any) {
    res.status(500).json({ isSuccess: false, message: error.message });
  }
};
export const registerUser = async (req: any, res: any) => {
  try {
    const newUser: User = req.body;

    newUser.isadmin = newUser.isadmin ? "1" : "0";
    newUser.oauth = "0";
    const user = await add(newUser);
    if (user !== undefined) {
      const user_id = await getIdByEmail(newUser.email);
      res.json({
        message: "User registered successfully",
        data: user_id[0],
        isSuccess: true,
      });
    } else {
      throw new Error("Unable to register user");
    }
  } catch (error: any) {
    res.status(500).json({ isSuccess: false, message: error.message });
  }
};
export const resetPassword = async (req: any, res: any) => {
  try {
    const user_id: number = req.params.id;
    const user_password: string = req.body.password;
    var hash: string = hasher(user_password);
    const results = await modifyPassword(hash, user_id);
    res.json({
      message: "Password updated successfully.",
      data: results,
      isSuccess: true,
    });
  } catch (error: any) {
    res.status(500).json({ isSuccess: false, message: error.message });
  }
};
export const loginOauthUser = async (userModel: any) => {
  try {
    const result = await getIdByEmail(userModel.emails[0].value);
    if (result.length <= 0) {
      const user: User = {
        id: userModel.id,
        firstname: userModel.name.givenName,
        lastname: userModel.name.familyName,
        password: "",
        email: userModel.emails[0].value,
        photo: userModel.photos[0].value,
        isadmin: "0",
        oauth: "1",
      };
      await add(user);      
    } 
  } catch (e: any) {
    throw new Error("Unable to authenticate user.");
  } 
};
export const verifyUser = async (req: any, res: any) => {
  try {
    const email = req.query.email;
    const results = await getIdByEmail(email);
    res.json({
      data: results,
      isSuccess: results.length > 0,
    });
  } catch (error: any) {
    res.status(500).json({ isSuccess: false, message: error.message });
  }
};
export const authFailure = async (req: any, res: any) => {
  res
    .status(401)
    .json({ isSuccess: false, message: "Failed to authenticate user" });
};
export const authSuccess = async (req: any, res: any) => {
  console.log(req);
  res.json({ isSuccess: false, message: "Successfully authenticated user" });
};
