 // mongo port 27888
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';

import userRoutes from "./routes/user.routes.js";


dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({ 
    origin: ['http://localhost:3000'],
    method: ['GET', 'POST'] 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/', {
    dbName: 'CCDB',
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => err ? console.log(err) : console.log('Connected to database'));

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})


app.use('/user', userRoutes);

app.set('query parser', 'simple');

app.get('/', (req, res) => {
    res.send("Hello from homepage");
});

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));