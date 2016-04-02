Repository for prezi-data-provider micro service
Welcome to prezi-data-provider micro service!
===================

Hey! 

This repository contains a little REST-API to providing input data for another web services.
It's created by **JavaScript** with **Node.js v.5.1.0** and **npm v3.3.12**. 


----------


How to install
-------------

Firstly you have to install nodejs and npm on your computer.
Find help for installations under:

 - https://nodejs.org
 - https://www.npmjs.com/

When you're done with the installations go to the main folder and execute `./start.sh`. 
If you can't run shell scripts due to some reasons you can install and start the server manually by the following commands:

 1. In the main foder: `npm install`
 2. Under the server folder: `node server.js`

> **Note:**

> You might have to set proxy to the npm by

>  `npm config set proxy http://proxy.company.com:8080`
>  `npm config set https-proxy http://proxy.company.com:8080`


----------


Features
-------------

There are three main features of this API:

 1. List all presentations by `/prezis` like http://localhost:8080/prezis
 2. Search for a presentation by title like
 http://localhost:8080/prezis?title=fugiat%20anim%20proident%20dolor
 3. Order presentations by the date of creation with `/prezis/sortByDate` 
 http://localhost:8080/prezis/sortByDate
