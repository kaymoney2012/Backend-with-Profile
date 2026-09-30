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
const profile = mongoose.model("auth", authSchema);
export default profile;
//# sourceMappingURL=authModel.js.map