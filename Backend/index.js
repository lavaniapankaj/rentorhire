/** This is root file of our node application */
const express       	= require('express');
const cors          	= require('cors');
const app           	= express();

/** Import all custom files */
require('./config/global_constants');
require('dotenv').config();
require('./utility');

/** enable cors to fetch api call from cross origin */
app.use(cors());

/**  Connection of our database */
const connection    = require('./config/connection');
connection.connectToServer((err)=>{
    if (err) throw err;
    //configure our routes with database
    const routes = require('./routes/web');
    routes.configure(app);
});

/** start server listen on specified host and server */
const port = process.env.PORT || PORT;

var server = app.listen(port, function () {
    console.log(`Server is running on port ${port}`);
});

/** Function to get unhandled errors and prevent to stop nodejs server **/
process.on("uncaughtException", function (err) {
	console.log("error name ---------"+err.name);    // Print the error name
	console.log("error date ---------"+new Date());    // Print the error name
	console.log("error message ---------"+err.message); // Print the error message
	console.log("error stack ---------"+err.stack);   // Print the stack trace
	setTimeout(function(){
		// process.exit(1);
	},1000);
});
