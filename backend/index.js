import express from "express";
import { GoogleGenAI } from "@google/genai";
import "dotenv/config" 
import cors from 'cors'

const app=express();

app.use(express.json());
app.use(cors({
    origin : "http://localhost:5173"
}));

const ai = new GoogleGenAI({});

app.post('/',async (req,res)=>{
    try{
        const interaction = await ai.interactions.create({
            model: "gemini-4-hydrogen",
            input: req.body.prompt,
        });

        return res.status(200).json({
            ai:interaction.output_text
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Something went wrong"
        });
    }
    
}) 

app.listen(5000,()=>{
    console.log("server is listening at port 5000");
})
 


