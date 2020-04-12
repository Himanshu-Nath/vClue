import express from 'express';
import {Covid19Controller} from "../controllers/covid19.controller";

const router : express.Router = express.Router();
let covid19Controller = new Covid19Controller();

router.get('/daily', covid19Controller.countDailyReport);
router.post('/addreport', covid19Controller.createDailyReport);
router.put('/daily/:id', covid19Controller.dailyId);
router.get('/download', covid19Controller.downloadAllCovid19Csv);

//Import
router.get('/importdr', covid19Controller.importDailyCsvReport);
router.get('/importtsr', covid19Controller.importTimeSerCsvReport);
router.get('/importwpr', covid19Controller.importWldPopCsvReport);

router.get('/dailyreport', covid19Controller.getDailyReport);
router.get('/worldpopulation', covid19Controller.getWldPopReport);
router.get('/timeseries', covid19Controller.getTimeSerReport);

export default router;