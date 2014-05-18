agile-tool
==========

Agile Management System. A [Sails](http://sailsjs.org) application.

Database setup
--------------
Install [MySQL](http://dev.mysql.com/downloads/mysql/) database server. Setup local instance. After that, execute following script for your MySQL server.
```
CREATE SCHEMA `agile_tool_db` ;
```

Application setup
-----------------
You need to have installed node.js and npm (included in [node.js](http://nodejs.org/) installer).
Clone repository and in repository root folder execute following commands. First of all, install node packages.
```
npm install
```
Install bower, if you haven't it yet.
```
npm install -g bower
```
Then install bower packages.
```
bower install
```
Go to the file config/connections.js. Find following lines, and replace user and password properties with your actual username and password for MySQL server instance.
```
  localMysqlServer: {
    adapter: 'sails-mysql',
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'agile_tool_db'
  },
```
And finally, launch the server.
```
node app.js
```
Thats it! Application is now available on [localhost:1337](http://localhost:1337)
