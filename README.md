# PBFalcon CRM

Open-Source Web application for managing customers and resources.


#
Requirements
--------------
    * Angular
    * NestJS
    * NodeJS
    * Postgres Database
    * Docker (if running locally)
    * @HiddenTemple/Api-Interfaces
    
 
Install Instructions
--------------------

[ For local installation and development ]
1) Download / Clone Repository
1) Download and Install NodeJS
2) Download and Install AngularCLI
    * `npm i -g @angular/cli:10.1.1`
3) Download and Install NestJS/CLI
    * `npm i -g @nestjs/cli:7.0.0`
4)
5) Run `npm install` in the following project folders: 
    * `/../pb-crm-api/`
    * `/../pb-crm-ui/`
    
6) To configure the database connection: 
    * Create a new `.env.dev` file in `./pb-crm-api/config/` folder
    * Add the following properties: 
    
        ```
            DB_TYPE=<db-type>
            DB_HOST=<db-host-or-ip>
            DB_PORT=<db-port-number>
            DB_USR=<db-user>
            DB_PWD=<db-password>
            DB_NAME=<your-db-name-here>
            DB_DROP=true (optional - drops schema on each change)
        ```
      
7) Configure Docker for local development:
    * Run the following command: 
        * On MacOS / Linux:
            * `run command here`
        * On Windows: 
            * `run command here`
      
8)  To start the API, run the following command:
    * To connect to a provisioned database:
        * `npm run start:dev` or `npm run start:dev -- watch` to watch for changes.
    * To connect to a local postgres database
        * Run `npm run start:local`
9) To start the UI, run the following command:
    * `ng serve` 
    
10) Open browser to:
    * http://localhost:4200
    
----



[ For production deployment ]

1) 
    *
2)
    *
3)
    *
    
____


Features
--------------------------
##### Contacts
    *
    *
    *
    *
##### Invoices
    *
    *
    *
    *



    
    

    





