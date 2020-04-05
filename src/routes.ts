import express, { Application } from 'express';
import router from './routes/covid19.route';

export type TRoutesInput = {
    app: Application;
};

export default ({app}: TRoutesInput) => {
    app.use('/api/covid19', router);
};