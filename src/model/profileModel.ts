import mongoose, { Schema, type Document } from "mongoose";


export interface Iprofile extends Document {
    name: string;
    username: string;
    phone: string;
    nationality: string;
    email: string;
    dateOfBirth: Date;
}

const profileSchema = new Schema<Iprofile>({
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
},
    {
        timestamps: true,
    }
);

const profile = mongoose.model<Iprofile>("profile", profileSchema);

export default profile;