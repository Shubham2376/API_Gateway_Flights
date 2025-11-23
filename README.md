
`src` -> Inside the src folder all the actual source code regarding the project will reside this will not include any kind of tests. (you might want to make separate tests folder)

Lets take look inside the `src` folder

- `config` -> In this folder anything and everything regarding any configuration or setup of library or module will be done. For example: setting up `dotenv` so that we can use the environment variable anywhere in a clearner fashion this is done in the `server-config.js`. one more example can be to setup you logging library that can help you to prepare meaningfull logs, so configuration for this library should also be done here

- `routes` -> In the route folder, we register a route and the corresponding middleware and controllers to it

- `middlewares` -> they are just going to intercept the incoming requests where we can write our validatores,authenicators etc.

- `controllers` -> they are kind of last middleware as post then you call business layer to execute the business logic. In controllers we just receive the incoming requests and data and then pass it to the business layer, and once business layer returns an output, we structure the API response in controllers and send the output

- `repositories` -> this folder contains all the logic using which we interact the DB by writing queries all the raw queries or ORM queries will go here 

- `services` -> contains the business logic and interacts with repositories for data from database

-`utils` -> contains the helper methods,error classess etc.

### Setup the project
- In the root directory create a `.env` file and add the following env variables
```
    PORT = <port number of your choice>
```
ex:
```
    PORT = 3000
```
-go inside the `src` folder and execute the following command:
```
    npx sequelize init
```
- By executing the above command you will get the migrations and seeder folder along with a config.json folder inside the config folder
- If you're setting up your development environment then write the username of you db,password of your db and in dialect mention whatever db you are using for ex: mysql, mariadb etc
- If you're setting up test or prod environment, make sure you also replace the host with the hosted db url.

- To run the server execute
```
npm run dev
```