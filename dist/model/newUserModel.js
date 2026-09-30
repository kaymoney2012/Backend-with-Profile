import mongoose, { Schema } from "mongoose";
const newUserSchema = new Schema({
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
}, {
    timestamps: true,
});
const newUser = mongoose.model("newUser", newUserSchema);
export default newUser;
//# sourceMappingURL=newUserModel.js.map