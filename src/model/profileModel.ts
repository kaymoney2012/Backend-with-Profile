import mongoose, { Schema, type Document } from "mongoose";

export interface Iprofile extends Document {
  name: string;
  username: string;
  phone: string;
  nationality: string;
  email: string;
  dateOfBirth: string;
}

const profileSchema = new Schema<Iprofile>(
  {
    name: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      unique: true,
      trim: true,
    },
    nationality: {
      type: String,
      trim: true,
    },
    dateOfBirth: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const profile = mongoose.model<Iprofile>("profile", profileSchema);

export default profile;
