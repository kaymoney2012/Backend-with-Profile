import mongoose from "mongoose";
const uri = process.env.MONGOOSE_DB;
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_DB);
        console.log("MONGODB connected to server");
    }
    catch (error) {
        console.error("MONGODB connection failed", error);
        process.exit(1);
    }
};
export default connectDB;
//# sourceMappingURL=db.js.map