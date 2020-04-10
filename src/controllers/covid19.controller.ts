import Covid19, { ICovid19 } from "../models/covid19.model";
import DailyReport, { IDailyReport } from "../models/daily-report.model";
import { Request, Response } from 'express';
import { DownloadService } from "../common/downloader";
import { ImportFileToDBService } from "../services/importFileToDB.service";

let downloadService = new DownloadService();

interface ICreateCovid19Input {
    email: ICovid19['email'];
    firstName: ICovid19['firstName'];
    lastName: ICovid19['lastName'];
}

interface IDailyReportInput {
    FIPS: IDailyReport['FIPS'];
    Admin2: IDailyReport['Admin2'];
    Province_State: IDailyReport['Province_State'];
    Country_Region: IDailyReport['Country_Region'];
    Last_Update: IDailyReport['Last_Update'];
    Lat: IDailyReport['Lat'];
    Long_: IDailyReport['Long_'];
    Confirmed: IDailyReport['Confirmed'];
    Deaths: IDailyReport['Deaths'];
    Recovered: IDailyReport['Recovered'];
    Active: IDailyReport['Active'];
    Combined_Key: IDailyReport['Combined_Key'];
}

export class Covid19Controller {

    public createDailyReport(req: Request, res: Response) {
        let data: ICreateCovid19Input;
        data = {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        };
        console.log(req.body)
        Covid19.create(data)
        .then((data: ICovid19) => {
            console.log(data);
            res.json({ status: "success", success: true, message: "Daily report added successfully!" });
        })
        .catch((error: Error) => {
            console.log(error)
            res.json({ status: "Fail", success: false, message: "Fail to add Daily Report!" });
        });
    }

    public countDailyReport(req: Request, res: Response) {
        // let newContact = new Covid19(req.body);
        // Covid19.count({
        //     role: req.params.roleName
        // }, function (err, result) {
        //     if (err)
        //         next(err);
        //     else
        //         res.json({ status: "success", success: true, message: "Daily count fetched successfully!", data: result });
        // });
        res.json({ status: "success", success: true, message: "Daily count fetched successfully!" });
    }

    public async dailyId(req: Request, res: Response) {
        try {
            // const items: Items = await ItemService.findAll();        
            res.status(200).send({ status: "success", success: true, message: "Daily count fetched successfully!", data: req.params });
          } catch (e) {
            res.status(404).send(e.message);
          }        
    }

    public async getDailyReport(req: Request, res: Response) {
        var page = parseInt(req.query.page) || 1;
        var size = parseInt(req.query.size) || 50;
        var sort = req.query.sort || 'Country_Region';
        var order = parseInt(req.query.order) || 1;
        if(page < 0 || page === 0) {
            res.status(400).send({ status: "success", success: false, message: "Invalid page number, should start with 1"});
        }

        var query: any = {};
        var options: any = {};
        options.skip = size * (page - 1);
        options.limit = size;
        options.sort = {[sort]: order};

        if( typeof req.query.Country_Region != 'undefined' ) {
            query.Country_Region = { $regex: req.query.Country_Region, $options: 'i' };
        }

        if( typeof req.query.confgt != 'undefined' ) {
            query.Confirmed = { "$gte" : req.query.confgt };
        }
        if( typeof req.query.detgt != 'undefined' ) {
            query.Deaths = { "$gte" : req.query.detgt };
        }
        if( typeof req.query.recgt != 'undefined' ) {
            query.Recovered = { "$gte" : req.query.recgt };
        }

        if( typeof req.query.conflt != 'undefined' ) {
            query.Confirmed = { "$lte" : req.query.conflt };
        }
        if( typeof req.query.detlt != 'undefined' ) {
            query.Deaths = { "$lte" : req.query.detlt };
        }
        if( typeof req.query.reclt != 'undefined' ) {
            query.Recovered = { "$lte" : req.query.reclt };
        }
        
        try {
            const count = await DailyReport.count(query);   
            const data = await DailyReport.find(query, {__v: 0}, options);        
            res.status(200).send({ status: "success", success: true, message: "Daily count fetched successfully!", data, totalRecord: count, pages: Math.ceil(count / size)});
          } catch (e) {
            res.status(404).send(e.message);
          }        
    }

    public async downloadAllCovid19Csv(req: Request, res: Response) {
        downloadService.covid19DailyCSVReport();
        // downloadService.covid19TimeSeriesCSVReport();
        // downloadService.covid19SitPDFReport();
        // downloadService.covid19SitTimeSeriesCSVReport();
        // downloadService.worldPopulationCSVReport();
        res.json({ status: "success", success: true, message: "File Successfully Downloaded!" });
    }

    public async importAllCovid19Csv(req: Request, res: Response) {
        ImportFileToDBService.covid19DailyCSVReport(req, res);
        // ImportFileToDBService.covid19TimeSeriesCSVReport(req, res);
        // ImportFileToDBService.worldPopulationCSVReport(req, res);
    }    
}

