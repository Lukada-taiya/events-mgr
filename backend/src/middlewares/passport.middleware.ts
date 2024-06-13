import passport, { Profile } from "passport";
import { Strategy, StrategyOptions } from "passport-google-oauth20";
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import 'dotenv/config'; 

import { loginOauthUser } from "../controllers/auth.controller";
import { getIdByToken } from "../models/users.model";

let { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

const AUTH_OPTIONS: StrategyOptions = {
  callbackURL: '/auth/google/callback',
  clientID: GOOGLE_CLIENT_ID as string,
  clientSecret: GOOGLE_CLIENT_SECRET as string
};

const verifyCallback = async (accessToken: string, refreshToken: string, profile: Profile, done: any) => { 
  //save userinfo to db 
  try {
    await loginOauthUser(profile);
    done(null, profile.id);
  }catch(e : any) {
      const err = {isSuccess: false, message: e.message}
      done(err);
  }
  done(null, profile);
};

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));
passport.use(new BearerStrategy(
  async (token, done) => {
    try {
      const user = await getIdByToken(token);
      if(user.length > 0) {
        done(null, user[0].id)
      }else{
        throw new Error("User not found");
      }
    }catch(e: any) {
        done(e.message);
    }
  }
));
// Saves cookie session
passport.serializeUser(async (user: any, done) => {
    done(null, user.id);
});

// Gets session cookie
passport.deserializeUser((id: false | Express.User | null | undefined, done) => {
  done(null, id);
});

export default passport;
