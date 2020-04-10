import mongoose, {Document, Schema} from 'mongoose';

export interface IDailyReport extends Document {
    FIPS: number;
    Admin2: string;
    Province_State	: string;
    Country_Region: string;
    Last_Update: Date;
    Lat: number;
    Long_: number;
    Confirmed: number;
    Deaths: number;
    Recovered: number;
    Active: number;
    Combined_Key: string;
};

const DailyReportSchema: Schema = new Schema({
    FIPS: { type: Number },
    Admin2: { type: String },
    Province_State: { type: String },
    Country_Region: { type: String },
    Last_Update: { type: Date },
    Lat: { type: Number },
    Long_: { type: Number },
    Confirmed: { type: Number },
    Deaths: { type: Number },
    Recovered: { type: Number },
    Active: { type: Number },
    Combined_Key: { type: String },
    Created_Date: {type: Date, }
},{
    collection: 'daily_report',
    timestamps: { createdAt: 'Created_At', updatedAt: 'Updated_At' }
});

export default mongoose.model<IDailyReport>('DailyReport', DailyReportSchema);