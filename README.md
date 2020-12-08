| ![PBFalcon Logo](./pb-crm-ui/src/assets/img/peanut-butter.png#left) | <h1>PBFalcon CRM</h1> | 
| --- | --- |

<br>

A customer resource management web-application, utilizing Angular, NestJS and Postgres technologies. 

Allows users to manage contacts, create and manage invoices or quotes. With intentions to progess further with time tracking and employee management.


#
Requirements
--------------
    * Angular
    * NestJS
    * NodeJS
    * Postgres Database
    * @hiddentemple/api-interfaces
        * https://github.com/hiddentemple/api-interfaces
    * Docker (if running locally)
    
 
Install Instructions
--------------------

**[ For local installation and development ]**
1) Download / Clone Repository
2) Download and Install NodeJS
    * https://nodejs.org/en/download/
        * v14.11.0 or higher
3) Download and Install AngularCLI
    * `npm i -g @angular/cli:10.1.1`
4) Download and Install NestJS/CLI
    * `npm i -g @nestjs/cli:7.0.0`

5) To configure the database connection and other environment variables:

    **[ For Local Environment Configuration ]**
    * Edit the `.env.local` file located in the `./pb-crm-api/config` folder of your project directory:
    * Ensure that the following variables are set you match your desired configuration.
    
   ```
     DB_TYPE=<db-type>
     DB_HOST=<db-host-or-ip>
     DB_PORT=<db-port-number>
     DB_USR=<db-user>
     DB_PWD=<db-password>
     DB_NAME=<your-db-name-here>
     DB_DROP=boolean   //Drops existing schema and data from database. Recommended only for local use.
     DB_SYNC=true  //Synchronizes database schema with that in codebase.
    ```
    
    **[ For Development / Production Environment Configuration ]**
    * Create a new `.env` file in the `./pb-crm-api/config` directory:
        * `.env.dev` for development environment configuration
        * `.env.production` for production environment configuration
    * Ensure that the following variables are set to match your desired configuration.
    ```
      DB_TYPE=<db-type>
      DB_HOST=<db-host-or-ip>
      DB_PORT=<db-port-number>
      DB_USR=<db-user>
      DB_PWD=<db-password>
      DB_NAME=<your-db-name-here>
      DB_DROP=boolean   //Drops existing schema and data from database. Recommended only for local use.
      DB_SYNC=true  //Synchronizes database schema with that in codebase.
    ```
   **( NOTE )** - *The `.env.dev` & `.env.production` files should not be commited to the repository.*
6) In order to install the required package `@hiddentemple/api-interfaces` you'll need to generate a github personal access token with at minimum **READ** permissions. More detailed instructions can be found here:

    https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token
    
    The following checkbox must be selected when creating a personal access token, in order for the package to download properly.
    
    ![Read Persmission Image](./images/readme_img_001.png)
    
    Once that token is generated, you will need to create an environment variable named `NPM_TOKEN` with the value of your newly generated token.
    This can be placed in the `.env` file created above, as a system environment variable, or through your IDE's enviroment variables in the run configuration.
    
    **( NOTE )** *The generated token should never be commited to the file repository, as it will invalidate the token and thus need to be regenerated.*
    
7) Run `npm install` in the following project folders: 
    * `./pb-crm-api/`
    * `./pb-crm-ui/`
8) Configure Docker for local development:
    * `cd` into directory `/local-db`
    * Run the following command: 
        * On MacOS / Linux:
            * `docker run -d --name pg -v "$PWD/my-postgres.conf":/etc/postgresql/postgresql.conf -e POSTGRES_PASSWORD=localpassword -p 5432:5432 postgres -c 'config_file=/etc/postgresql/postgresql.conf'`
        * On Windows: 
            * `docker run -d --name pg -v "%cd%/my-postgres.conf:/etc/postgresql/postgresql.conf" -e POSTGRES_PASSWORD=localpassword -p 5432:5432 postgres -c "config_file=/etc/postgresql/postgresql.conf"`
    * **( Note )** - *To change the password of the local postgres instance, change the following `POSTGRES_PASSWORD=localpassword` in the command to whatever password you desire. Otherwise it will be set to `localpassword`.*
9)  To start the API, run the following command:
    * To connect to a provisioned / configured database:
        * `npm run start:dev` or `npm run start:dev -- watch` to watch for changes.
    * To connect to a local postgres database
        * Run `npm run start:local`
10) To start the UI, run the following command:
    * `ng serve` or `npm run start` 
    
11) Open browser to:
    * http://localhost:4200
    
----




    
  




