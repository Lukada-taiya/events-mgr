import cookiesession from 'cookie-session';
import 'dotenv/config';

let { COOKIE_KEY_1, COOKIE_KEY_2 } = process.env;

const cookieSessionMiddleware = cookiesession({
  name: 'session',
  maxAge: 24 * 3600 * 1000,
  keys: [COOKIE_KEY_1 as string, COOKIE_KEY_2 as string]
});

const cookieSessionBugFix = (request : any, response: any, next : any) => {
  if (request.session && !request.session.regenerate) {
      request.session.regenerate = (cb :any) => {
          cb()
      }
  }
  if (request.session && !request.session.save) {
      request.session.save = (cb: any) => {
          cb()
      }
  }
  next()
}

export {cookieSessionMiddleware, cookieSessionBugFix};
