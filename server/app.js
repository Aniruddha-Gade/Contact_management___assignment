

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import contactRouter from './routes/contact.route.js'

export const app = express();

// middleware 
app.use(express.json()); // to parse json body
// cors => cors
app.use(
    cors({
        origin: ["http://localhost:5173", "https://contact-management-table.vercel.app/"],
        credentials: true
    })
);



// mount routes
app.use('/api/v1/contact', contactRouter);



app.use((err, req, res, next) => {
    console.error("err.message => ", err.message);
    res.status(500).json({ error: 'Server error' });
});




// Default Route
app.get('/', (req, res) => {
    // console.log('Your server is up and running..!');
    res.send(`<div>
    This is Default Route of Contact Management  
    <p>Everything is OK</p>
    </div>`);
})


// unknown route
app.all('*', (req, res, next) => {
    res.status(404).json({
        message: `Route ${req.originalUrl} not found`,
        status: 404
    })
})

