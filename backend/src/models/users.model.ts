import postgres from "postgres";

import sql from "../helpers/dbconnection";
import { User } from "../interfaces/users";

export const update = async (
  userId: number,
  user: User
): Promise<postgres.RowList<postgres.Row[]>> => {
  try { 
    const users = sql`update users set ${sql(
      user,
      "firstname",
      "lastname",
      "email",
      "password",
      "isadmin",
      'photo'
    )} where id = ${userId}`;
    return await users;
  } catch (error: any) {
    throw error;
  }
};

export const getAll = async (): Promise<postgres.RowList<postgres.Row[]>> => {
  try {
    const users = sql`SELECT id,firstname,lastname,email,photo, isadmin FROM users`;
    return await users;
  } catch (error: any) {
    throw error;
  }
};

export const get = async (id: number) : Promise<postgres.RowList<postgres.Row[]>> => {
    try {
        const user = sql`SELECT id,firstname,lastname,email,photo, isadmin FROM users WHERE id = ${id}`;
        return await user;
    }catch(error: any) {
        throw error;
    }
}
export const add = async (user: User) : Promise<postgres.RowList<postgres.Row[]>> => {
    try {         
        const users = sql`INSERT INTO users ${sql(user, 'firstname', 'lastname', 'email','password', 'photo', 'isadmin', 'oauth')}`; 
        return await users; 
    }catch(error: any) {
        throw error;
    }
}
export const drop = async (userId: number) : Promise<postgres.RowList<postgres.Row[]>> => {
    try {    
        const users = sql`delete from users where id = ${userId}`;
        return await users;
    }catch(error: any) {
        throw error;
    }
}

export const getIsAdminByUserId = async (userId: number) : Promise<postgres.RowList<postgres.Row[]>> => {
    try {
        const getSql = sql`SELECT isadmin FROM users WHERE id = ${userId}`;
        return await getSql;
    }catch(error) {
        throw error;
    }
}
export const getIdByEmail = async (email: string) : Promise<postgres.RowList<postgres.Row[]>> => {
    try {
        const users = sql`SELECT id FROM users where email = ${email}`; 
        return await users; 
    }catch(error) {
        throw error;
    }
}

export const getUserByEmail = async (email: string) : Promise<postgres.RowList<postgres.Row[]>> => {
  try {
      const user = sql`SELECT id,firstname,lastname,email, photo, isadmin FROM users WHERE email = ${email}`;
      return await user;
  }catch(error) {
      throw error;
  }
}
export const modifyPassword = async (newPassword: string, id: number) : Promise<postgres.RowList<postgres.Row[]>> => {
  try {
      const user = sql`update users set password = ${newPassword} where id = ${id}`;
      return await user;
  }catch(error) {
      throw error;
  }
}


