import { httpClient } from "shared/api/http-client";
import { Tokens } from "shared/lib/token";
import { User } from "shared/lib/types";

export interface RegisterUserBody {
    email: string;
    password: string;
}

const registerUser = (body: RegisterUserBody): Promise<Tokens> => {
    return httpClient.post(`user/register`, body);
};

// interface CheckEmailForRegistrationResponse {
//     noValid: boolean;
//     exists: boolean;
// }

// const checkEmailFormRegistration = (
//     email: string
// ): Promise<CheckEmailForRegistrationResponse> => {
//     return httpClient.get(`users/email/single?email=${email}`);
// };

const getCurrentUser = (): Promise<User> => {
    return httpClient.get(`user/me`);
};

// export interface UpdateUserPasswordBody {
//     oldPassword: string;
//     newPassword: string;
// }

// const changeUserPassword = (body: UpdateUserPasswordBody): Promise<boolean> => {
//     return httpClient.post("users/update-password", body);
// };

// interface SendResetPasswordLinkBody {
//     callbackUrl: string;
//     email: string;
// }

// const sendResetPasswordLink = (
//     body: SendResetPasswordLinkBody
// ): Promise<boolean> => {
//     return httpClient.post("users/reset-password/links", body);
// };

// interface ResetPasswordBody {
//     code: string;
//     newPassword: string;
// }

// const resetPassword = (body: ResetPasswordBody): Promise<boolean> => {
//     return httpClient.post("users/reset-password", body);
// };

export const userApi = {
    registerUser,
    getCurrentUser,
    // checkEmailFormRegistration,
    // changeUserPassword,
    // sendResetPasswordLink,
    // resetPassword,
};
