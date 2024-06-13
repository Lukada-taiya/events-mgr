import cookiesession from 'cookie-session';
import 'dotenv/config';

let { COOKIE_KEY_1, COOKIE_KEY_2 } = process.env;

const cookieSessionMiddleware = cookiesession({
  name: 'session',
  maxAge: 24 * 3600 * 1000,
  keys: [COOKIE_KEY_1 as string, COOKIE_KEY_2 as string]
});

export default cookieSessionMiddleware;
