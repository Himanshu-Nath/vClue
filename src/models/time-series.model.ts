import mongoose, {Document, Schema} from 'mongoose';

export interface ITimeSeries extends Document {
    "Province/State": string;
    "Country/Region": string;
    Lat	: number;
    Long: number;
    Confirmed: any;
    Deaths: any;
    Recovered: any;
};

const TimeSeriesSchema: Schema = new Schema({
    "Province/State": { type: String },
    "Country/Region": { type: String },
    Lat: { type: Number },
    Long: { type: Number },
    Confirmed: [],
    Deaths: [],
    Recovered: []
},{
    collection: 'time_series',
    timestamps: { createdAt: 'Created_At', updatedAt: 'Updated_At' }
});

export default mongoose.model<ITimeSeries>('TimeSeries', TimeSeriesSchema);