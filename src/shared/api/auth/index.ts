import { httpClient } from "shared/api/http-client";
import { Tokens } from "shared/lib/token";

export interface LoginCredentials {
    email: string;
    password: string;
}

const loginByCredentials = (credentials: LoginCredentials): Promise<Tokens> => {
    return httpClient.post(`/auth/login`, credentials);
};

const logout = () => {
    return httpClient.post("/auth/logout");
};

export const authApi = {
    loginByCredentials,
    logout
};
