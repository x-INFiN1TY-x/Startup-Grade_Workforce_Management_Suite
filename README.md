# Medium Enterprise-Grade Workforce Management Suite
## Getting Started - Clone the Repo
```
Open a command prompt or terminal and navigate to the directory where the cloned files are located using the `cd` command.
```
## Edit .env file
Edit the .env file to store your database credentials
```
- `DB_HOST`: Set it to either "127.0.0.1" or "localhost" depending on your MySQL server configuration.
- `DB_USER`: Enter your MySQL client's username.
- `DB_PASS`: Enter your MySQL client's password.
- `DB_NAME`: Name of your DB
```
## Database Setup 
```
In the cloned folder, Locate the MySQL dump file named "UserSchema.sql". This file contains all the necessary SQL queries for setting up the portal, including sample data. You need to import this file into your MySQL server. 
```
## Installation
To run this project, Clone it , Cd into the directory and then install it locally using npm:
```
$ npm install
$ npm start
```
```
Open your web browser and enter the following URL: `http://localhost:5000` (or the appropriate port number if the server is running on a different port). 
```
