import { Injectable } from '@angular/core';
import { AxiosInstance, AxiosInterceptorManager, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';

@Injectable()
// @ts-ignore
export abstract class HttpService implements AxiosInstance {
  // (config: AxiosRequestConfig) => AxiosPromise;
  // (url: string, config?: AxiosRequestConfig) => AxiosPromise;

  abstract defaults: AxiosRequestConfig;
  abstract interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
  abstract delete(url: string, config?: AxiosRequestConfig): AxiosPromise<any>;
  abstract get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
  abstract head(url: string, config?: AxiosRequestConfig): AxiosPromise<any>;
  abstract patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
  abstract post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
  abstract put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
  abstract request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>;
}
