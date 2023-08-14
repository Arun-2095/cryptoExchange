import axios, { type AxiosInstance } from 'axios'
import { type RequestObj } from './Types'
const AXIOS = (auth = false): AxiosInstance => {
  const AxiosInstance = axios?.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 2000,
    headers: {
      'Access-Control-Allow-Origin': 'https://bittrexglobal.com',
      'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
      Vary: 'Access-Control-Request-Headers',
      'Access-Control-Allow-Headers': 'Content-Type, Accept'
    }
  })

  // Add a response interceptor
  AxiosInstance?.interceptors?.request?.use((request) => {
    return request
  })

  // Add a response interceptor
  AxiosInstance?.interceptors?.response?.use(
    (response) => {
      return response.data
    },
    async (error) => {
      // handle 401 response
      if (error.response === undefined) {
        error.message = 'Network error. Try again after sometime.'
      }
      return await Promise.reject(error)
    }
  )

  return AxiosInstance
}

export default async function ApiCall (config: RequestObj): Promise<any> {
  const { method, endpoint, data, params } = config
  return await new Promise((resolve, reject) => {
    const AxiosInstance = AXIOS()

    AxiosInstance[method](endpoint, data, params)
      .then((res) => {
        resolve(res)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
