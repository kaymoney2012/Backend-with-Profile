import mongoose, { Schema, type Document } from "mongoose";


export interface Iauth extends Document {
    email: string;
    password: string;
    isVerified: boolean;
    otp?: string;
    otpExpires?: Date;
}

const authSchema = new Schema<Iauth>({
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: String,
    },
    otpExpires: {
        type: Date,
    },
},
    {
        timestamps: true,
    }
);

const profile = mongoose.model<Iauth>("auth", authSchema);

export default profile;