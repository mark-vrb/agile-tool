agile-tool
==========

Agile Management System. A [Sails](http://sailsjs.org) application.

Database setup
--------------
Download and install [MongoDB](http://www.mongodb.org/) database server. Follow instructions on MongoDB site to launch local instance.

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
Go to the file config/connections.js. Find following lines, and write correct port and db name, if necessary.
```
  localMongodbServer: {
    adapter: 'sails-mongo',
    host: 'localhost',
    port: 27017,
    // user: 'username',
    // password: 'password',
    database: 'agile_tool_db'
  },
```
And finally, launch the server.
```
node app.js
```
Thats it! Application is now available on [localhost:1337](http://localhost:1337)
