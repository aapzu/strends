# Strends

## What is Strends?

* With Strends you can stream interesting Twitter hashtags, and compare them. It is great for example defining trends in some field. Strends is created in Node with Express.js.

## How to use Strends?
* Navigate to the main directory of Strends
* When running the app first time, run `npm install`
* After the installation, run `npm start`
* If you want to set the port used, run `PORT=<port> npm start`, otherwise the port is 3000
* The app opens in localhost in the set port

## Contents
* /bin/www - the main class
* /public - static directories visible in the web app
  * /css - styles
  * /js
    * /app - the web app
  * /plugins - 3rd party plugins in the web app
* /src - the js functionality used by node app
* /routes - route files of the project
* /views - views of the project
* /plugins - 3rd party plugins in the node app
* app.js - central app file of the project
* package.json - package info of the project (for node)
