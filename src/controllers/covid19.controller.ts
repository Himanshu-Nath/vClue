import Covid19, { ICovid19 } from "../models/covid19.model";
import { Request, Response } from 'express';

interface ICreateCovid19Input {
    email: ICovid19['email'];
    firstName: ICovid19['firstName'];
    lastName: ICovid19['lastName'];
}

export class Covid19Controller {

    public createDailyReport(req: Request, res: Response) {
        let data: ICreateCovid19Input;
        data = {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        };
        console.log("------1")
        console.log(req.body)
        Covid19.create(data)
        .then((data: ICovid19) => {
            console.log("------2")
            console.log(data);
            res.json({ status: "success", success: true, message: "Daily report added successfully!" });
        })
        .catch((error: Error) => {
            console.log("------3")
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
        console.log("------4")
        res.json({ status: "success", success: true, message: "Daily count fetched successfully!" });
    }
}

