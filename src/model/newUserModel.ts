import mongoose, { Schema, type Document } from "mongoose";


export interface InewUser extends Document {
    name: string;
    username: string;
    phone: string;
    nationality: string;
    email: string;
    dateOfBirth: Date;
    password: string;
    isVerified: boolean;
    otp?: string;
    otpExpires?: Date;
}

const newUserSchema = new Schema<InewUser>({
    name: {
        type: String,
    },
    username: {
        type: String,
        unique: true,
        sparse: true,
    },
    phone: {
        type: String,
        unique: true,
    },
    nationality: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    dateOfBirth: {
        type: Date,
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

const newUser = mongoose.model<InewUser>("newUser", newUserSchema);

export default newUser;