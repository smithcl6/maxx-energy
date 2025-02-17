import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

dotenv.config();  // Import environmental variables if they exist
const app: Express = express();
const PORT = process.env.PORT || 3000;
const TOKEN_TIMER: number = 1; // Number of hours before token expires
const TOKEN_SECRET: Secret = 'Use an environmental variable to replace this later.';
const AUTH_TOKEN: string = 'auth-token';
app.use(express.json());
app.use(cookieParser());

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

  jwt.verify(token, TOKEN_SECRET as string, (error: any) => {
    if (error) {
      console.error(error);
      response.sendStatus(403);
      return;
    }
    next();
  })
}
app.use('/api/auth/*', authenticateToken);


// ***** Unprotected API Routes *****

// Login API endpoint - create and sign token, then create cookie with token and send back to client
app.post('/api/login', (request: Request, response: Response) => {
  // TODO: Add logic that checks if login is valid

  const token: string = jwt.sign(
    {
      password: request.body['password'],
      maxAge: Math.floor(Date.now() / 1000) + (60 * 60) * TOKEN_TIMER,
    },
    TOKEN_SECRET
  )

  response.cookie(
    AUTH_TOKEN,
    token,
    {
      httpOnly: true,
      maxAge: (60 * 60 * 1000) * TOKEN_TIMER
    }
  );

  response.sendStatus(200);
});

// ***** Protected API Routes *****

// Sends a status code of 200 which informs the frontend that the user is authorized to access the data page
app.get('/api/auth/data', (request: Request, response: Response) => {
  response.sendStatus(200);
});

// Begin listening for API requests
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
