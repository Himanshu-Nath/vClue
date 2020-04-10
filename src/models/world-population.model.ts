import mongoose, {Document, Schema} from 'mongoose';

export interface IWorldPopulation extends Document {
    UID: number;
    iso2: string;
    iso3: string;
    code3: number;
    FIPS: number;
    Admin2: string;
    Province_State: string;
    Country_Region: string;
    Lat: number;
    Long_: number;
    Combined_Key: string;
    Population: number;
};

const WorldPopulationSchema: Schema = new Schema({
    UID: { type: Number, unique: true },
    iso2: { type: String },
    iso3: { type: String },
    code3: { type: Number },
    FIPS: { type: Number },
    Admin2: { type: String },
    Province_State: { type: String },
    Country_Region: { type: String },
    Lat: { type: Number },
    Long_: { type: Number },
    Combined_Key: { type: String },
    Population: { type: Number },
},{
    collection: 'world_population',
    timestamps: { createdAt: 'Created_At', updatedAt: 'Updated_At' }
});

export default mongoose.model<IWorldPopulation>('WorldPopulation', WorldPopulationSchema);