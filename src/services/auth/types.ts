export type LoginFormValues = {
    email: string;
    password:string;
};
export type RegisterFormValues = {
    username:string;
    email: string;
    password:string;
    mobile:string;
    code:string;
};

export type ForgotPasswordValues = {
    email: string;
}
export type VerificationValues = {
    otp: number;
}

