import mongoose, { Schema } from "mongoose";
const authSchema = new Schema({
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
}, {
    timestamps: true,
});
const auth = mongoose.model("auth", authSchema);
export default auth;
//# sourceMappingURL=authModel.js.map