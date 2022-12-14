import { API_URL } from "shared/lib/config";
import { TokenStorage } from "shared/lib/token";
import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    Method,
} from "axios";

export type AxiosRequestPayload = any;
export type AxiosRequestParams = any;
type AxiosResponseWithRetry = AxiosResponse & {
    _retry: boolean;
};

type AxiosPath = string;

export interface ServerError<E> {
    error: string;
    message: string;
    statusCode: number;
}

let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: any, token?: string) => {
    failedQueue.forEach((prom: any) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

const responseConfig = (config: any): Promise<ApiError> => {
    return new Promise((resolve, reject) => {
        return axios
            .request(config)
            .then((response: any) => {
                resolve(response);
            })
            .catch((error: AxiosError<ApiError>) => {
                reject(error.response?.data);
            });
    });
};

interface HttpClientInterface {
    service: AxiosInstance;

    handleResponseSuccess(response: AxiosResponse): AxiosResponse;

    handleResponseError(error: AxiosError): Promise<unknown>;

    get(
        path: AxiosPath,
        params?: AxiosRequestParams,
        configs?: AxiosRequestConfig
    ): Promise<AxiosResponse>;
    patch(
        path: AxiosPath,
        payload?: AxiosRequestPayload,
        configs?: AxiosRequestConfig
    ): Promise<AxiosResponse>;
    post(
        path: AxiosPath,
        payload?: AxiosRequestPayload,
        configs?: AxiosRequestConfig
    ): Promise<AxiosResponse>;
    put(
        path: AxiosPath,
        payload?: AxiosRequestPayload,
        configs?: AxiosRequestConfig
    ): Promise<AxiosResponse>;
    delete(
        path: AxiosPath,
        configs?: AxiosRequestConfig
    ): Promise<AxiosResponse>;
    request(
        method: Method,
        path: AxiosPath,
        configs?: AxiosRequestConfig
    ): Promise<AxiosResponse>;
}

export class HttpClientService implements HttpClientInterface {
    public service: AxiosInstance;

    constructor() {
        const service = axios.create({
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        });

        service.defaults.baseURL = API_URL;

        service.interceptors.request.use(this.handleRequest);
        service.interceptors.response.use(
            this.handleResponseSuccess,
            this.handleResponseError
        );

        this.service = service;
    }

    public handleRequest = (request: AxiosRequestConfig) => {
        if (TokenStorage.getToken()) {
            request.headers!.Authorization = TokenStorage.getBearer()!;
        }
        return request;
    };

    public handleResponseSuccess = (response: AxiosResponse): AxiosResponse => {
        return response;
    };

    public handleResponseError = (
        error: AxiosError<ApiError> & { config: AxiosResponseWithRetry }
    ): Promise<ApiError> => {
        if (
            (error.response && error.response.status !== 401) ||
            error.config._retry
        ) {
            return new Promise((resolve, reject) => {
                reject(error.response!.data);
            });
        }

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            })
                .then(() => {
                    error.config.headers.Authorization =
                        TokenStorage.getBearer()!;
                    return responseConfig(error.config);
                })
                .catch((error_) => error_);
        }
        if (error.config.headers.Authorization !== TokenStorage.getBearer()) {
            error.config.headers.Authorization = TokenStorage.getBearer()!;
            return responseConfig(error.config);
        }

        error.config._retry = true;
        isRefreshing = true;

        // @ts-ignore
        return TokenStorage.refreshToken()
            .then((token) => {
                const config = error.config;
                processQueue(null, token); // Resolve queued
                config.headers.Authorization = `Bearer ${token}`;

                return responseConfig(config);
            })
            .catch(
                (error_: AxiosError & { config: AxiosResponseWithRetry }) => {
                    if (error_.response && error_.response?.status === 401) {
                        processQueue(error_); // Resolve queued
                        TokenStorage.clear();
                        const currentPath = `${window.location.pathname}${window.location.search}`;
                        window.location.replace(`${currentPath}`);
                    }
                }
            )
            .finally(() => {
                isRefreshing = false;
            });
    };

    public get(
        url: string,
        params?: AxiosRequestParams,
        configs?: AxiosRequestConfig
    ) {
        return this.service
            .request({
                url,
                params,
                method: "GET",
                responseType: "json",
                ...configs,
            })
            .then(this.processResponse);
    }

    public patch(
        url: AxiosPath,
        data?: AxiosRequestPayload,
        configs?: AxiosRequestConfig
    ) {
        return this.service
            .request({
                url,
                data,
                method: "PATCH",
                responseType: "json",
                ...configs,
            })
            .then(this.processResponse);
    }

    public post(
        url: AxiosPath,
        data?: AxiosRequestPayload,
        configs?: AxiosRequestConfig
    ) {
        return this.service
            .request({
                url,
                data,
                method: "POST",
                responseType: "json",
                ...configs,
            })
            .then(this.processResponse);
    }

    public put(
        url: AxiosPath,
        data?: AxiosRequestPayload,
        configs?: AxiosRequestConfig
    ) {
        return this.service
            .request({
                url,
                data,
                method: "PUT",
                responseType: "json",
                ...configs,
            })
            .then(this.processResponse);
    }

    public delete(url: AxiosPath, configs?: AxiosRequestConfig) {
        return this.service
            .request({
                url,
                method: "DELETE",
                responseType: "json",
                ...configs,
            })
            .then(this.processResponse);
    }

    public request(
        method: Method,
        url: AxiosPath,
        configs?: AxiosRequestConfig
    ) {
        return this.service.request({
            url,
            method,
            ...configs,
        });
    }

    private processResponse = (response: AxiosResponse) => {
        return response.data;
    };
}

export const httpClient = new HttpClientService();
