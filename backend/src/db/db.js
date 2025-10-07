import mongoose from "mongoose";

const connectDB = async () => {

    try{
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}`)
        // console.log(`Connected to MongoDB ${conn.connection.host}`);
    }catch(err){
        console.log("connection error : ", err)
        process.exit(1);
    }
}
export default connectDB;