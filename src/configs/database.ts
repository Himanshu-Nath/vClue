import {MONGODB_LOCALHOST_URL} from './constants';
import Promise from 'bluebird';
import mongoose from 'mongoose';
import chalk from "chalk";
Promise.promisifyAll(require("mongoose"));

var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;

type TInput = {
    dbURL: string;
}

export default ({dbURL}: TInput) => {

    console.log("======4")
    mongoose.connect(dbURL);

    const conn: any = mongoose.connection;

    conn.on('error', function(err: any) {
        console.log("======1")
        console.log(error("Mongoose default connection has occured "+err+" error"));
    });
    conn.once('connected', function() {
        console.log("======2")
        console.log(connected("Mongoose default connection is open to ", dbURL));
    });
    conn.once('connected', function() {
        console.log("======3")
        console.log(disconnected("Mongoose default connection is disconnected"));
    });
    process.on('SIGINT', function() {  
        mongoose.connection.close(function () { 
            console.log(termination("Mongoose default connection is disconnected due to application termination"));
            process.exit(0); 
        }); 
    });
}