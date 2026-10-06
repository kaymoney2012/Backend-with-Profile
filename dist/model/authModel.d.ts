import mongoose, { type Document } from "mongoose";
export interface Iauth extends Document {
    email: string;
    password: string;
    isVerified: boolean;
    otp?: string;
    otpExpires?: Date;
}
declare const auth: mongoose.Model<Iauth, {}, {}, {}, Document<unknown, {}, Iauth, {}, mongoose.DefaultSchemaOptions> & Iauth & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, Iauth>;
export default auth;
//# sourceMappingURL=authModel.d.ts.map