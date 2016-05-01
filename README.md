# Strends

## What is Strends?

* With Strends you can stream interesting Twitter hashtags, and compare them. It is great for example defining trends in some field. Strends is created in Node with Express.js. For data transfer the app uses [Streamr](https://www.streamr.com).

## How to use Strends?
* Navigate to the main directory of Strends
* Edit the files twitter.js and streamr.js in the directory /config. Replace the tokens with yours.
* When running the app first time, run `npm install`
* After the installation, run `npm start`
* If you want to set the port used, run `PORT=<port> npm start`, otherwise the port is 3000
* The app opens in localhost in the set port

I'm going to make the usage easier in the future, especially for Streamr's stream part.

## Contents
* /bin/www - the main class
* /config - the config files for Twitter and Streamr
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
