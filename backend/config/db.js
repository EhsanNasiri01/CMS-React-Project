import mongoose from "mongoose";
import { uri } from "./config.js";
export function connect(){
    try {
        mongoose.connect(uri);
        console.log('db cms connected')
    } catch (error) {
        console.log(error);
    }
    
};