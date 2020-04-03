/**
 * Required External Modules
 */
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import * as bodyParser from "body-parser";

import dbConnect from './configs/database';

const covid19 = require('./routes/covid19.route');

dotenv.config();
/**
 * App Variables
 */
if (!process.env.PORT) {
    process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10);
const app: express.Application = express();
const dbURL = String(process.env.MONGODB_LOCALHOST_URL);
dbConnect({dbURL});

/**
 *  App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
// support application/json type post data
app.use(bodyParser.json());
//support application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    res.send({ "vClue": "Build REST API with node.js" })
});
// public route
// app.use('/users', users);
// private route
app.use('/api/covid19', covid19);

// handle 404 error
app.use(function (req, res, next) {
    let err: any = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle errors
app.use(function (err: any, req: any, res:  any, next: any) {
    console.log(err);
    if (err.status === 404)
        res.status(404).json({ message: "Not found" });
    else
        res.status(500).json({ message: "Something looks wrong :( !!!" });
});


/**
 * Server Activation
 */
const server = app.listen(PORT, function(){
    console.log(`Server Listening on port ${PORT}`)
})

/**
 * Webpack HMR Activation
 */
type ModuleId = string | number;

interface WebpackHotModule {
  hot?: {
    data: any;
    accept(
      dependencies: string[],
      callback?: (updatedDependencies: ModuleId[]) => void,
    ): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    dispose(callback: (data: any) => void): void;
  };
}

declare const module: WebpackHotModule;

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}