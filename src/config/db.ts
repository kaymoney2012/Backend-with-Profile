import mongoose from "mongoose";

const uri = process.env.MONGOOSE_DB as string

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_DB as string)
        console.log("MONGODB connected to server")
    } catch (error) {
        console.error("MONGODB connection failed", error)
        process.exit(1)
    }
}

export default connectDB;