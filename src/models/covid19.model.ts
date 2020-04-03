import mongoose, {Document, Schema} from 'mongoose';

export interface ICovid19 extends Document {
    email: string;
    firstName: string;
    lastName: string;
};

const Covid19Schema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});

export default mongoose.model<ICovid19>('Covid19', Covid19Schema);