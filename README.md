# maxx-energy
Hosts the source code of the Maxx Energy Website.
- maxx-energy-portal: Angular Frontend
- maxx-energy-backend: Express Backend

## Prerequisites
1. Install [Node.js](https://nodejs.org/en) version ^18.19.1 or newer.
2. Install the [Angular CLI](https://angular.dev/tools/cli/setup-local#install-the-angular-cli).
3. Access to the Maxx Energy mysql database.

## Configuring Environmental Variables.
Environmental variables need to be configured a database connection to be established. 
1. Under the maxx-energy-backend directory, there will be a .env.example file. Copy its contents.
2. Still within the maxx-energy-backend directory, create a new .env file named. (The file name should literally be .env)
3. Paste the contents that were copied from .env.example into .env
4. Replace all values with those that suits your needs. For example if your database password was 'password123', replace
```
DB_PASSWORD='<Insert Database password>'
``` 
with 
```
DB_PASSWORD='password123'
```
5. Note that local development only requires DB variables to be entered.(DB_HOST, DB_USER, DB_PASSWORD, DB)

## Run Projects locally
Environmental variables for database connections are required for the backend to run correctly. Make sure this is completed first.
<br><br>
If using VS Code, just hit F5 (run and debug). This runs both projects and allows for backend debugging.\
Otherwise, to run both projects locally: in the maxx-energy directory, type ```npm run dev``` in the terminal.
This will not enable debugging though.
<br><br>
Although possible to change in the future, the following endpoints are probably going to be accurate for local development:
- Angular frontend: http://localhost:4200
- Express backend: http://localhost:3000