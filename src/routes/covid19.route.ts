import express from 'express';
import {Covid19Controller} from "../controllers/covid19.controller";

const router : express.Router = express.Router();
let covid19Controller = new Covid19Controller();

router.get('/daily', covid19Controller.countDailyReport);
router.post('/addreport', covid19Controller.createDailyReport);
router.put('/daily/:id', covid19Controller.dailyId);
router.get('/download', covid19Controller.downloadAllCovid19Csv);
router.get('/import', covid19Controller.importAllCovid19Csv);

router.get('/dailyreport', covid19Controller.getDailyReport);

export default router;