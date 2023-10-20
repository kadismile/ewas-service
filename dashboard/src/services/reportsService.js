import { client} from '../utils/api-client'

const serverUrl = process.env.REACT_APP_API_BASE_URL ;

export const reportService =  {

  getReporter: async () => {
    try {
      const url = `${serverUrl}/report/reporter`
      const method = 'GET'
      const response = await client(url, method);
      if (!response)
        throw new Error("Cannot fetch Complainer");
      return response
    } catch (e) {
      throw e
    }
  },

  getReports: async () => {
    try {
      const url = `${serverUrl}/report`
      const method = 'GET'
      const response = await client(url, method);
      if (!response)
        throw new Error("Cannot fetch Complainer");
      return response
    } catch (e) {
      throw e
    }
  },

  getOneReport:async (reportID) => {
    if (!reportID ) 
    return {
      status: 'failed',
      message: '',
    }
    try {
      const url = `${serverUrl}/report/one?_id=${reportID}`
      const method = 'GET'
      const response = await client(url, method);
      return response
    } catch (e) {
      throw e
    }
  },

  acceptReport:async (data) => {
    try {
      const url = `${serverUrl}/report/accept`
      const method = 'POST'
      const response = await client(url, method, { ...data });
      if (!response)
        throw new Error("Cannot Accept  Report");
      return response
    } catch (e) {
      throw e
    }
  },

  verifyReport:async (data) => {
    try {
      const url = `${serverUrl}/report/verify`
      const method = 'POST'
      const response = await client(url, method, { ...data });
      if (!response)
        throw new Error("Cannot Add Department");
      return response
    } catch (e) {
      throw e
    }
  },

  
}