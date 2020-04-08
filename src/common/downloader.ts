import download from 'download-git-repo';
import chalk from "chalk";
import { COVID19_DOWNLOADED_FILE_PATH, TIME_SERIES_COVID19_CSV_REPORT, COVID19_SIT_REPO_TIME_SER_FILE_NAME, WORLD_POP_FILE_NAME } from '../configs/constants';

var errorLog = chalk.italic.red;
var successLog = chalk.italic.magenta;

export class DownloadService {
    public covid19DailyCSVReport() {
        download('direct:'+ process.env.COVID19_DAILY_REPORTS_PATH +'01-22-2020.csv', COVID19_DOWNLOADED_FILE_PATH.DAILY_CSV_REPORT, function (err) {
            console.log(err ? errorLog('Error while downloading Daily report') : successLog('Daily report downloaded Successfully'));
        });
    }

    public covid19TimeSeriesCSVReport() {
        Object.keys(TIME_SERIES_COVID19_CSV_REPORT).map(key => {
            download('direct:'+ process.env.COVID19_TIME_SERIES_PATH + TIME_SERIES_COVID19_CSV_REPORT[key], COVID19_DOWNLOADED_FILE_PATH.TIME_SERIES_CSV_REPORT, function (err) {
                console.log(err ? errorLog('Error while downloading Time Series') : successLog(TIME_SERIES_COVID19_CSV_REPORT[key] + ' downloaded Successfully'));
            });
        });        
    }

    public covid19SitPDFReport() {
        download('direct:'+ process.env.COVID19_SITUATION_PDF_REPORTS_PATH +'20200123-sitrep-3-2019-ncov.pdf', COVID19_DOWNLOADED_FILE_PATH.SITE_PDF_REPORT, function (err) {
            console.log(err ? errorLog('Error while downloading Site PDF') : successLog('Site PDF downloaded Successfully'));
        });
    }

    public covid19SitTimeSeriesCSVReport() {
        download('direct:'+ process.env.COVID19_SITUATION_REPORTS_TIME_SERIES_PATH + COVID19_SIT_REPO_TIME_SER_FILE_NAME, COVID19_DOWNLOADED_FILE_PATH.SITE_TIME_SERIES_CSV_REPORT, function (err) {
            console.log(err ? errorLog('Error while downloading Site Time Series') : successLog('Site Time Series downloaded Successfully'));
        });
    }

    public worldPopulationCSVReport() {
        download('direct:'+ process.env.WORLD_POPULATION_PATH + WORLD_POP_FILE_NAME, COVID19_DOWNLOADED_FILE_PATH.WLD_POP_CSV_REPORT, function (err) {
            console.log(err ? errorLog('Error while downloading World Population') : successLog('World Population downloaded Successfully'));
        });
    }
}