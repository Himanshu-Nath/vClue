import express from 'express';
import {Covid19Controller} from "../controllers/covid19.controller";

let covid19Controller = new Covid19Controller();


const router = express.Router();
router.get('/daily', covid19Controller.countDailyReport);
router.post('/addreport', covid19Controller.createDailyReport);

module.exports = router;