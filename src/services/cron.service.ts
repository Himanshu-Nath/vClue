import { CronJob } from 'cron';
import chalk from "chalk";

import { ImportFileToDBService } from "./importFileToDB.service";
import { DownloadService } from "../common/downloader";

let downloadService = new DownloadService();
var errorLog = chalk.italic.red;
var successLog = chalk.italic.magenta;

export default () => {

    // Download service
    const downloadCovid19Job = new CronJob('00 00 05 * * *', function() {        
        console.log(successLog("Download servie started at 4:00am"));
        downloadService.covid19DailyCSVReport();
        downloadService.covid19TimeSeriesCSVReport();
        downloadService.covid19SitPDFReport();
        downloadService.covid19SitTimeSeriesCSVReport();
        downloadService.worldPopulationCSVReport();
    });
    downloadCovid19Job.start();

    // Import service
    const importCovid19Job = new CronJob('00 30 05 * * *', function() { 
    // const importCovid19Job = new CronJob('*/45 * * * * *', function() {
        console.log(successLog("Download servie started at 4:30am"));
        ImportFileToDBService.covid19DailyCSVReport();
        ImportFileToDBService.covid19TimeSeriesCSVReport();
        ImportFileToDBService.worldPopulationCSVReport();
    });
    importCovid19Job.start();
}