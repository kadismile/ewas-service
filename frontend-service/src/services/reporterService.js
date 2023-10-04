import { client} from '../utils/api-client'

const serverUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const reportService =  {

  registerReporter: async (data) => {
    try {
      const url = `${serverUrl}/report/`
      console.log('url -----------------------> ', url)
      const method = 'POST'
      const response = await client(url, method, data);
      if (!response)
        throw new Error("Cannot Create a reporter");
      return response
    } catch (e) {
      throw e
    }
  },

  loginReporter: async (data) => {
    try {
      const url = `${serverUrl}/report/login`
      const method = 'POST'
      const response = await client(url, method, data);
      if (!response)
        throw new Error("Cannot Login this reporter");
      return response
    } catch (e) {
      throw e
    }
  },

  getReportTypes: async (label) => {
    try {
      let url
      if (label === 'Agency') {
        url = `${serverUrl}/agency`
      } else {
        url = `${serverUrl}/report/type`
      }
      const method = 'GET'
      const response = await client(url, method);
      if (!response)
        throw new Error("Cannot Retrieve Report Types");
      return response
    } catch (e) {
      throw e
    }
  },

}