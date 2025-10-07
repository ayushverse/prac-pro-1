import "dotenv/config"
import connectDB from "./db/db.js";
import {dbname} from "./constant.js";

(async () => {
    try{
        await connectDB();
        console.log(`Connected to DB ${dbname}`);
    }catch(err){
        console.log("App is terminated due to database connection error")
    }
})()

