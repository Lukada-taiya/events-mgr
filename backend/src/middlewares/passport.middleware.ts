import passport, { Profile } from "passport";
import { Strategy, StrategyOptions } from "passport-google-oauth20";
import 'dotenv/config'; 
import { loginOauthUser } from "../controllers/auth.controller";

let { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

const AUTH_OPTIONS: StrategyOptions = {
  callbackURL: '/auth/google/callback',
  clientID: GOOGLE_CLIENT_ID as string,
  clientSecret: GOOGLE_CLIENT_SECRET as string
};

const verifyCallback = (accessToken: string, refreshToken: string, profile: Profile, done: any) => { 
  done(null, profile);
};

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

// Saves cookie session
passport.serializeUser(async (user: any, done) => {
    console.log(user);
   //save userinfo to db 
   try {
        await loginOauthUser(user);
        done(null, user.id);
   }catch(e : any) {
        const err = {isSuccess: false, message: e.message}
        done(err, '');
   }
});

// Gets session cookie
passport.deserializeUser((id: false | Express.User | null | undefined, done) => {
  done(null, id);
});

export default passport;
