import mongoose, { type Document } from "mongoose";
export interface Iprofile extends Document {
    name: string;
    username: string;
    phone: string;
    nationality: string;
    email: string;
    dateOfBirth: Date;
}
declare const profile: mongoose.Model<Iprofile, {}, {}, {}, Document<unknown, {}, Iprofile, {}, mongoose.DefaultSchemaOptions> & Iprofile & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, Iprofile>;
export default profile;
//# sourceMappingURL=profileModel.d.ts.map