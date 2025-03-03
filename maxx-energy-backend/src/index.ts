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
 * Adds decrypted token to request body.
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
    request.body.token = jwt.verify(token, TOKEN_SECRET);  // Decrypts token or throw error if invalid token
    next();
  } catch (error) {
    console.error(error);
    response.sendStatus(403);
  }
}
app.use('/api/auth/*', authenticateToken);

/**
 * Create and sign token, then create cookie with token and send authentication details back to client.
 * @param response The express response that stores the cookie and returns login details.
 * @param user Details that came in from the request.
 */
async function authorizeUser(response: Response, user: IUser): Promise<void> {
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
  user.password = undefined;  // We do not want to send password back to frontend.
  const authDetails: IAuthDetails = {
    user: user,
    timer: timerInMs()
  }
  response.cookie(AUTH_TOKEN, token, cookieOptions);
  response.json(authDetails);
}


// ***** Unprotected API Routes *****

// Login API endpoint
app.post('/api/login', async (request: Request, response: Response) => {
  const user: IUser = request.body.user;

  // Extremely basic login check for testing; remove later
  if (user.password === 'bad password') {
    response.sendStatus(401);
    return;
  } else if (user.password === 'abc123') {
    user.name = 'Chris';
  } else {
    user.name = 'User';
  }

  // TODO: Add logic that checks if login is valid

  await authorizeUser(response, user);
});

// Logs user out by clearing cookie storing the jwt
app.get('/api/logout', (request: Request, response: Response) => {
  response.clearCookie(AUTH_TOKEN);
  response.json();
});

// Registers new user and logs them in
app.post('/api/register-user', async (request: Request, response: Response) => {
  const user: IUser = request.body.user;
  // TODO: If email already exists, return with error informing frontend
  // TODO: If email does not exist, add new user to database
  await authorizeUser(response, user);
});

// Placeholder endpoint if we get the chance to implement company contacting
app.post('/api/contact-company', (request: Request, response: Response) => {
  response.json('Contact Company Requested.');
});

// Placeholder endpoint if we get the chance to implement password resetting
app.post('/api/reset-password', (request: Request, response: Response) => {
  response.json('Password Reset Requested.');
});

// ***** Protected API Routes *****

// Automatically logs the user in and sends authentication details back to client
app.get('/api/auth/auto-login', (request: Request, response: Response) => {
  const user: IUser = request.body.token.user;
  user.password = undefined;
  const timer = (request.body.token.exp * 1000) - Date.now();
  const authDetails: IAuthDetails = {
    user: user,
    timer: timer
  };
  response.json(authDetails);
})

// Updates user profile with updated user details
app.post('/api/auth/update-profile', async (request: Request, response: Response) => {
  const user: IUser = request.body.token.user;
  const updatedUser: IUser = request.body.user;
  // TODO: If user does not exist or duplicate email exists, return with error informing frontend
  // TODO: Otherwise, update user in database
  await authorizeUser(response, updatedUser);
});

// Placeholder endpoint if we need one to access the data page
app.get('/api/auth/data', (request: Request, response: Response) => {
  response.json({ success: true });
});

// Begin listening for API requests
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
