import { reportService } from '../services/reporterService';
import appStorage from '@/redux/customStorage'
export const  client = async (url, method, reqBody = undefined) => {

  const { token } = appStorage.getItem('user')
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ token }`
  }
  const config = {
    method,
    body: reqBody ? JSON.stringify(reqBody) : undefined,
    headers,
  };
  try {
    const response = await window.fetch(url, config);
    return response.json()
  } catch (err) {
    console.log('Client Error -------> ', err)
  }
}
