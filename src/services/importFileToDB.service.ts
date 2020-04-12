import csv from 'csvtojson';
import _ from 'lodash';
import dateformat from 'dateformat';
import fs from 'fs';
import { Request, Response } from 'express';
import chalk from "chalk";
import { COVID19_DOWNLOADED_FILE_PATH, TIME_SERIES_COVID19_CSV_REPORT, COVID19_SIT_REPO_TIME_SER_FILE_NAME, WORLD_POP_FILE_NAME } from '../configs/constants';

import WorldPopulation, { IWorldPopulation } from "../models/world-population.model";
import DailyReport, { IDailyReport } from "../models/daily-report.model";
import TimeSeries, { ITimeSeries } from "../models/time-series.model";

var errorLog = chalk.italic.red;
var successLog = chalk.italic.magenta;

export class ImportFileToDBService {

    public static async covid19DailyCSVReport(req?: Request, res?: Response) {
        await DailyReport.deleteMany({});
        let record = await DailyReport.countDocuments();
        var tdDt = new Date();
        let fileName = dateformat(tdDt.setDate(tdDt.getDate() - 1), "mm-dd-yyyy") + '.csv';
        let filePath = COVID19_DOWNLOADED_FILE_PATH.DAILY_CSV_REPORT +'/' + fileName;
        fs.access(filePath, fs.constants.F_OK, async (err) => {
            if (err) {
                console.log(errorLog("File "+ fileName +" not found!"));
                if(res !== undefined)
                    res.json({ status: "Fail", success: true, message: "Daily Report File "+ fileName +" not found!" });
            } else {
                let jsonObj = await csv().fromFile(filePath);
                await DailyReport.create(jsonObj)
                .then(async (data) => {
                    await DailyReport.deleteMany({ Admin2: {"$exists" : true, "$ne" : ""} }, function(err) {});
                    console.log(successLog("File "+ fileName +" imported successfully!"));
                    if(res !== undefined)
                        res.json({ status: "success", success: true, message: "Daily Report added successfully!" });
                })
                .catch((error: Error) => {
                    if(res !== undefined)
                        res.json({ status: "Fail", success: false, message: "Fail to add Daily Report!", error });
                });
            }            
        });
    }

    public static async covid19TimeSeriesCSVReport(req?: Request, res?: Response) {
        let importObj: any = [];
        let gConfirmed = await csv().fromFile(COVID19_DOWNLOADED_FILE_PATH.TIME_SERIES_CSV_REPORT +'/' + TIME_SERIES_COVID19_CSV_REPORT.CONFIRM_G );

        let gDeaths = await csv().fromFile(COVID19_DOWNLOADED_FILE_PATH.TIME_SERIES_CSV_REPORT +'/' + TIME_SERIES_COVID19_CSV_REPORT.DEATH_G );

        let gRecovered = await csv().fromFile(COVID19_DOWNLOADED_FILE_PATH.TIME_SERIES_CSV_REPORT +'/' + TIME_SERIES_COVID19_CSV_REPORT.RECOVER_G );

        await _.forEach(gConfirmed, function(value, key) {
            let obj = {} as any;
            obj["Province_State"] = value["Province/State"];
            obj["Country_Region"] = value["Country/Region"];
            obj["Lat"] = value["Lat"];
            obj["Long"] = value["Long"];            
            
            let deaths = _.find(gDeaths, function(gd) {
                if(value["Province/State"] == gd["Province/State"] && value["Country/Region"] == gd["Country/Region"]) {
                    delete gd["Province/State"];
                    delete gd["Country/Region"];
                    delete gd["Lat"];
                    delete gd["Long"];                  
                    return gd;
                }
            });
            obj["Deaths"] = deaths;

            let recovered = _.find(gRecovered,  function(gr) {
                if(value["Province/State"] == gr["Province/State"] && value["Country/Region"] == gr["Country/Region"]) {
                    delete gr["Province/State"];
                    delete gr["Country/Region"];
                    delete gr["Lat"];
                    delete gr["Long"];
                    return gr;
                } 
            });         
            obj["Recovered"] = recovered;

            let confirmed  = value;
            delete confirmed["Province/State"];
            delete confirmed["Country/Region"];
            delete confirmed["Lat"];
            delete confirmed["Long"];
            obj["Confirmed"] = confirmed;
            importObj.push(obj);          
        });
        console.log(successLog("Time Series imported successfully"));
        await TimeSeries.deleteMany({});
        await TimeSeries.create(importObj)
        .then(async (data) => {
            if(res !== undefined)
                res.json({ status: "success", success: true, message: "Time Sheet added successfully!" });
        })
        .catch((error: Error) => {
            if(res !== undefined)
                res.json({ status: "Fail", success: false, message: "Fail to add Time Sheet!", error });
        });
    }

    public static async covid19SitTimeSeriesCSVReport(req: Request, res: Response) {

    }

    public static async worldPopulationCSVReport(req?: Request, res?: Response) {
        await WorldPopulation.deleteMany({});
        let record = await WorldPopulation.countDocuments();
        if(!record) {
            let jsonObj = await csv().fromFile(COVID19_DOWNLOADED_FILE_PATH.WLD_POP_CSV_REPORT +'/' + WORLD_POP_FILE_NAME );
            await WorldPopulation.create(jsonObj)
            .then((data) => {
                console.log(successLog("World Population imported successfully"));
                WorldPopulation.deleteMany({ Province_State: {"$exists" : true, "$ne" : ""} }, function(err) {});  
                if(res !== undefined)
                    res.json({ status: "success", success: true, message: "World Population added successfully!" });
            })
            .catch((error: Error) => {
                if(res !== undefined)
                    res.json({ status: "Fail", success: false, message: "Fail to add World Population!", error });
            });
        } else {
            if(res !== undefined)
                res.json({ status: "Fail", success: true, message: "World Population records already present!" });
        }
    }
}