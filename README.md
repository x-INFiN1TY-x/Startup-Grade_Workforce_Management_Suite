# Workforce Management Suite

**Tech Stack Used:** *Node.js, React.js, MySQL, Express.js, Express Handlebars, Bootstrap CSS, JavaScript, Multer, jszip, Winston*

## Getting Started - Cloning the Repository

To begin using our Medium Enterprise-Grade Workforce Management Suite, follow these steps to clone the repository to your local environment:

1. Open a command prompt or terminal window.

2. Navigate to the directory where you want to clone the repository using the `cd` command.

3. Clone the repository by running the following command:
   ```bash
   git clone <repository_url>
   ```
   Replace `<repository_url>` with the actual URL of the repository.

## Configuration - Edit .env File

To configure the application, you'll need to edit the `.env` file to store your database credentials. Follow these instructions:

1. Open the `.env` file located in the root directory of the cloned repository.

2. Update the following database settings according to your MySQL server configuration:
   - `DB_HOST`: Set it to either "127.0.0.1" or "localhost" depending on your MySQL server configuration.
   - `DB_USER`: Enter your MySQL client's username.
   - `DB_PASS`: Enter your MySQL client's password.
   - `DB_NAME`: Specify the name of your database.

## Database Setup

In order to set up the database for the application, follow these steps:

1. In the cloned repository folder, locate the MySQL dump file named "UserSchema.sql." This file contains all the necessary SQL queries for setting up the portal, including sample data.

2. Import the "UserSchema.sql" file into your MySQL server. You can do this using a MySQL client or by running the following command in your terminal:

   ```bash
   mysql -u <username> -p <database_name> < UserSchema.sql
   ```

   Replace `<username>` with your MySQL username and `<database_name>` with the name of the database you specified in the `.env` file.

## Installation

To run the Workforce Management Suite, follow these steps:

1. Ensure that you have Node.js and npm (Node Package Manager) installed on your system.

2. Navigate to the cloned repository directory using the terminal:
   ```bash
   cd <repository_directory>
   ```
   Replace `<repository_directory>` with the actual path to the cloned repository.

3. Install the project's dependencies by running the following command:
   ```bash
   npm install
   ```

4. Start the application locally with the following command:
   ```bash
   npm start
   ```

5. Open your web browser and enter the following URL: `http://localhost:5000` (or the appropriate port number if the server is running on a different port).

