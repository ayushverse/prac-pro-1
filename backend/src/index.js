import "dotenv/config"
import {clerkMiddleware} from "@clerk/express";
import connectDB from "./db/db.js";
import {dbname} from "./constant.js";
import fileUpload from "express-fileupload";
import path from "path";

import express from "express";
import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import authRoutes from "./routes/auth.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statRoutes from "./routes/stat.route.js";


const app = express()
const PORT = process.env.PORT
const __dirname = path.resolve()

app.use(clerkMiddleware()) //this will add auth to req obj
app.use(express.json()); //to parse json data
app.use(fileUpload({
    useTempFiles: true,
    tempFilePath: path.join(__dirname, "tmp"),
    createParentPath: true,
    limit:{
        fileSize:10 * 1024 * 1024, //10MB max file size
    }
}))



app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

app.use((err,req,res,next) => {
    res.status(500).json({message:process.env.NODE_ENV === "production" ? "Internal Server error" : err.message});
})


app.listen(PORT, () => {
    console.log("running at " + PORT);
    (async () => {
        try{
            await connectDB();
            console.log(`Connected to DB ${dbname}`);
        }catch(err){
            console.log("App is terminated due to database connection error")
        }
    })()
});

