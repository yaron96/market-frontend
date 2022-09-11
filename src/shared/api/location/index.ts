import { httpClient } from "shared/api/http-client";

const searchByCity = (query: string) => {
    return httpClient.get(`/location/${query}`);
};


export const locationApi = {
    searchByCity
};
