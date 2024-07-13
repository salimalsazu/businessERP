import { rateLimit } from 'express-rate-limit';

export const AuthLoginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 minutes
  limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
  message: 'Too many login attempts, please try again later after 5 mints',
});
