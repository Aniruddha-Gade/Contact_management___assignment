import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();


export const connectDB = () => {
    mongoose.connect(process.env.DATABASE_URI)
        .then(() => {
            console.log('Database connected succcessfully');
        })
        .catch(error => {
            console.log(`Error while connecting server with Database`);
            console.log(error);
            process.exit(1);
        })
};
