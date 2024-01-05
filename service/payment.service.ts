// lib
import axios, { AxiosResponse } from 'axios'

const httpClient = axios.create({ baseURL: 'http://localhost:4040' })

export const getConfigPayment = async (): Promise<AxiosResponse<any, any>> => {
  const response = await httpClient.get('/config')
  return response.data
}
