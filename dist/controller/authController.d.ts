import type { Request, Response } from "express";
interface iTokenPayload {
    id: string;
    email: string;
}
export declare const generateNewToken: (payload: iTokenPayload) => string;
export declare const signup: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const verifyOTP: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const resendOTP: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const signin: (req: Request, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=authController.d.ts.map