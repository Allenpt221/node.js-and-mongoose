import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/roduct.model.js';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json()); // allow u to accept JSON data in the req.body

app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});
    } catch(error){
        res.status(500).json({success: false, message: "Server Error"});
    }
});

app.post("/api/products", async (req, res) => {
 const product = req.body; // user will send this data

 if(!product.name || !product.price || !product.image){
    return res.status(400).json({ success:false, message: "Please provide all fields"});
 }
 const newProduct = new Product(product);

 try{
    await newProduct.save();
    res.status(201).json({success: true, data: newProduct});
 } catch(error){
    console.error("Error in saving product:", error.message);
    res.status(500).json({success: false, message: "Server Error"});
 }
});

app.delete("/api/products/:id", async (req, res) =>{
    const { id } = req.params;

    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted"});
    } catch(error){

    }
})

app.listen(5000, () =>{
    connectDB();
    console.log("Server is started at http://localhost:5000");
});