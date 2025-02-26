import express, { CookieOptions, Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';
import { IUser } from './models/IUser';
import { IAuthDetails } from './models/IAuthDetails';

dotenv.config();  // Import environmental variables if they exist
const app: Express = express();
const PORT = process.env.PORT || 3000;
const CLIENT = process.env.CLIENT || 'http://localhost:4200';
const TOKEN_TIMER: number = 1; // Number of hours before token expires
const TOKEN_SECRET: Secret = process.env.SECRET || 'Use an environmental variable to replace this later.';
const AUTH_TOKEN: string = 'auth-token';
const corsOptions: CorsOptions = {
  origin: CLIENT,
  credentials: true
};
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

/**
 * Used for setting expiration timers for cookie and jwt.
 * 1 hour in milliseconds = 60 minutes * 60 seconds * 1000 milliseconds
 * @returns number of milliseconds * TOKEN_TIMER (which represents number of hours)
 */
function timerInMs(): number {
  return 60 * 60 * 1000 * TOKEN_TIMER;
}


/**
 * Protects certain API endpoints from being accessed if token is invalid.
 * @param request from client that requires AUTH_TOKEN cookie
 * @param response informs client if they are authorized
 * @param next the requested API endpoint to be triggered if client's token is valid
 * @returns
 */
function authenticateToken(request: Request, response: Response, next: NextFunction): void {
  const token: string | undefined = request.cookies[AUTH_TOKEN];

  if (!token) {
    response.sendStatus(401);
    return;
  }

  try {
    request.body = jwt.verify(token, TOKEN_SECRET);  // Decrypts token or throw error if invalid token
    next();
  } catch (error) {
    console.error(error);
    response.sendStatus(403);
  }
}
app.use('/api/auth/*', authenticateToken);


// ***** Unprotected API Routes *****

// Login API endpoint - create and sign token, then create cookie with token and send authentication details back to client
app.post('/api/login', (request: Request, response: Response) => {
  const user: IUser = {
    email: request.body['email'],
    name: request.body['name'],
    password: request.body['password']
  }

  // TODO: Add logic that checks if login is valid

  // jwt.sign() encrypts user details using TOKEN_SECRET
  // 'exp' represents number of seconds - not milliseconds - since Unix Time Epoch
  // 'exp' field is not named arbitrarily; it is a key of the signature payload
  const token: string = jwt.sign(
    {
      user: user,
      exp: Math.floor((Date.now() + timerInMs()) / 1000)
    },
    TOKEN_SECRET
  )

  const cookieOptions: CookieOptions = {
    maxAge: timerInMs(),
    sameSite: 'strict'
  }
  user.password = undefined;
  const authDetails: IAuthDetails = {
    user: user,
    timer: timerInMs()
  }
  response.cookie(AUTH_TOKEN, token, cookieOptions);
  response.json(authDetails);
});

// Logs user out by clearing cookie storing the jwt
app.get('/api/logout', (request: Request, response: Response) => {
  response.clearCookie(AUTH_TOKEN);
  response.json();
});

// ***** Protected API Routes *****

// Automatically logs the user in and sends authentication details back to client
app.get('/api/auth/auto-login', (request: Request, response: Response) => {
  const user: IUser = request.body.user;
  user.password = undefined;
  const timer = (request.body.exp * 1000) - Date.now();
  const authDetails: IAuthDetails = {
    user: user,
    timer: timer
  };
  response.json(authDetails);
});

// Placeholder endpoint if we need one to access the data page
app.get('/api/auth/data', (request: Request, response: Response) => {
  response.json({ success: true });
});

// Begin listening for API requests
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
