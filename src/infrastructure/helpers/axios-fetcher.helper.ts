import axios, { AxiosInstance, AxiosResponse } from "axios";
import { AxiosException } from "../exceptions/axios.exception";

export class AxiosFetcherHelper {
    private axios: AxiosInstance;

    constructor(url: string, authToken: string) {
        this.axios = axios.create({
            baseURL: url,
            headers: {
                'Authorization': `Bearer ${authToken}`
            }         
        });  
    }

    async get<T = any>(endpoint: string, query: Record<string, any> = {}): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axios.get(
                endpoint,
                {
                    params: query
                }
            );
            return response.data;
        } catch (error: any) {
            throw new AxiosException(error.message, error.response?.status);
        }
    }

    async post<T = any>(endpoint: string, data: any): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axios.post(endpoint, data);
            return response.data;
        } catch (error: any) {
            throw new AxiosException(error.message, error.response?.status);
        }
    }

    async put<T = any>(endpoint: string, data: any): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axios.put(endpoint, data);
            return response.data;
        } catch (error: any) {
            throw new AxiosException(error.message, error.response?.status);
        }
    }

    async patch<T = any>(endpoint: string, data: any): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axios.patch(endpoint, data);
            return response.data;
        } catch (error: any) {
            throw new AxiosException(error.message, error.response?.status);
        }
    }

    async delete<T = any>(endpoint: string): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axios.delete(endpoint);
            return response.data;
        } catch (error: any) {
            throw new AxiosException(error.message, error.response?.status);
        }
    }
}
