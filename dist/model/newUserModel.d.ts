import mongoose, { type Document } from "mongoose";
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
declare const newUser: mongoose.Model<InewUser, {}, {}, {}, Document<unknown, {}, InewUser, {}, mongoose.DefaultSchemaOptions> & InewUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, InewUser>;
export default newUser;
//# sourceMappingURL=newUserModel.d.ts.map