import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import productsRoutes from "./routes/product.route.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json()); // allow u to accept JSON data in the req.body

app.use("/api/products", productsRoutes);

app.listen(PORT, () =>{
    connectDB();
    console.log("Server is started at http://localhost:" + PORT);
});