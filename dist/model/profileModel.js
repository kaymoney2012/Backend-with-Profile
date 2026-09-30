import mongoose, { Schema } from "mongoose";
const profileSchema = new Schema({
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
        type: Date,
    },
}, {
    timestamps: true,
});
const profile = mongoose.model("profile", profileSchema);
export default profile;
//# sourceMappingURL=profileModel.js.map