import { type AxiosRequestConfig } from 'axios'
export enum RequestMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
}
export interface RequestObj extends AxiosRequestConfig {
  method: RequestMethod
  endpoint: string
  data?: any
  params?: Record<string, string | string[]>
}
