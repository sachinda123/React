How to setup

ensure you have running docker version on machine

open project folder in terminal

Run source .env

Run Docker-compose up -d

Run docker ps
idenified id of wire-api-container container

Run docker exec -it sh container ID

Inside of container Run npx sequelize-cli db:migrate

Run DB seed inside of container npx sequelize-cli db:seed:all

now you have created table and default user values insert to DB

you will find phpmyadmin http://localhost:44065

User name and password will be root

Run npm test for run test case

Note
All documents -> in document folder (answer sheet/ Postman collection etc)
All funtcion not cover by test cases .Only sample done
User password store as plain text due to testing purpose

Below user avilable you will able to login

User Role :- owner
User name :- owner
Password :- 123

User Role :- managers
User name :- managers
Password :- 123

User Role :- cashiers
User name :- cashiers
Password :- 123
