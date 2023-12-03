import { reportService } from '../services/reporterService';

export const  client = async (url, method, reqBody = undefined) => {

  const { token } = reportService.fetchUserFromStore()
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
