import { client} from '../utils/api-client'

const serverUrl = process.env.REACT_APP_API_BASE_URL ;

export const crudService =  {

  getDepts: async () => {
    try {
      const url = `${serverUrl}/department`
      const method = 'GET'
      const response = await client(url, method);
      if (!response)
        throw new Error("Cannot fetch Department");
      return response
    } catch (e) {
      throw e
    }
  },

  delDept: async (data) => {
    try {
      const url = `${serverUrl}/department`
      const method = 'DELETE'
      const response = await client(url, method, { ...data });
      if (!response)
        throw new Error("Cannot Delete Department");
      return response
    } catch (e) {
      throw e
    }
  },

  addDept: async (data) => {
    try {
      const url = `${serverUrl}/department`
      const method = 'POST'
      const response = await client(url, method, { ...data });
      if (!response)
        throw new Error("Cannot Add Department");
      return response
    } catch (e) {
      throw e
    }
  },

  editDept: async (data) => {
    try {
      const url = `${serverUrl}/department`
      const method = 'PATCH'
      const response = await client(url, method, { ...data });
      if (!response)
        throw new Error("Cannot Delete Department");
      return response
    } catch (e) {
      throw e
    }
  },

  getAgency: async () => {
    try {
      const url = `${serverUrl}/agency`
      const method = 'GET'
      const response = await client(url, method);
      if (!response)
        throw new Error("Cannot fetch Agency");
      return response
    } catch (e) {
      throw e
    }
  },

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

}