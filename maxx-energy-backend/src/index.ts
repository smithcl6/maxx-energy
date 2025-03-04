import express, { CookieOptions, Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';
import mysql, { Connection, QueryError, QueryResult } from 'mysql2';
import { IUser } from './models/IUser';
import { IAuthDetails } from './models/IAuthDetails';

dotenv.config();  // Import environmental variables if they exist
const app: Express = express();
const PORT = process.env.PORT || 3000;
const CLIENT: string = process.env.CLIENT || 'http://localhost:4200';
const TOKEN_TIMER: number = 1; // Number of hours before token expires
const TOKEN_SECRET: Secret = process.env.SECRET || 'configure in .env file';
const AUTH_TOKEN: string = 'auth-token';
const DB_HOST: string = process.env.DB_HOST || 'configure in .env file';
const DB_USER: string = process.env.DB_USER || 'configure in .env file';
const DB_PASSWORD: string = process.env.DB_PASSWORD || 'configure in .env file';
const DB: string = process.env.DB || 'configure in .env file';
// Establish connection with database
const connection: Connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB
});
const corsOptions: CorsOptions = {
  origin: CLIENT,
  credentials: true
};
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));  // Allows for communication between frontend and backend

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

// Login API endpoint - query database with email and password; set user name based on what is stored in database then authorize user
app.post('/api/login', (request: Request, response: Response) => {
  const user: IUser = request.body.user;
  const sql = `SELECT email, name, password FROM logins WHERE email = "${user.email}" AND password = "${user.password}"`;
  connection.query(sql, async (err: QueryError, rows: QueryResult) => {
    if (err) {
      response.sendStatus(500);
    } else {
      const results = rows as Array<IUser>;
      if (results.length === 1) {
        user.name = results[0].name;
        await authorizeUser(response, user);
      } else {
        response.sendStatus(401);
      }
    }
  });
});

// Logs user out by clearing cookie storing the jwt
app.get('/api/logout', (request: Request, response: Response) => {
  response.clearCookie(AUTH_TOKEN);
  response.json();
});

// Placeholder endpoint for registering a new user
app.post('/api/register-user', (request: Request, response: Response) => {
  response.json('User Registration Requested.')
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
app.post('/api/auth/update-profile', (request: Request, response: Response) => {
  const user: IUser = request.body.token.user;
  const updatedUser: IUser = request.body.user;
  let includePassword: string = '';  // Only include password in update query if the user changed password
  if (updatedUser.password) {
    includePassword = `, password = "${updatedUser.password}"`;
  }
  const sql = `UPDATE logins SET email = "${updatedUser.email}", name = "${updatedUser.name}" ${includePassword} WHERE email = "${user.email}"`
  // Updates database with profile changes
  connection.query(sql, async (err: QueryError) => {
    if(err) {
      if (err.code === 'ER_DUP_ENTRY') {
        response.sendStatus(409);  // Return 409 status code if email update would result in duplicate emails
      } else {
        response.sendStatus(500);
      }
    } else {
      await authorizeUser(response, updatedUser);
    }
  })
});

// Placeholder endpoint if we need one to access the data page
app.get('/api/auth/data', (request: Request, response: Response) => {
  response.json({ success: true });
});

// Begin listening for API requests
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
