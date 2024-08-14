import { client } from "../utils/api-client"
import { store } from '../redux/store';

const serverUrl = process.env.REACT_APP_API_BASE_URL

export const reportService = {
  registerReporter: async (data) => {
    try {
      const url = `${serverUrl}/report/`
      const method = "POST"
      const response = await client(url, method, data)
      if (!response) throw new Error("Cannot Create a reporter")
      return response
    } catch (e) {
      throw e
    }
  },

  loginReporter: async (data) => {
    try {
      const url = `${serverUrl}/report/login`
      const method = "POST"
      const response = await client(url, method, data)
      if (!response) throw new Error("Cannot Login this reporter")
      return response
    } catch (e) {
      throw e
    }
  },

  getReportTypes: async (label) => {
    try {
      let url
      if (label === "Agency") {
        url = `${serverUrl}/agency`
      } else {
        url = `${serverUrl}/report/type`
      }
      const method = "GET"
      const response = await client(url, method)
      if (!response) throw new Error("Cannot Retrieve Report Types")
      return response
    } catch (e) {
      throw e
    }
  },

  createReports: async (data) => {
    try {
      const url = `${serverUrl}/report/create`
      const method = "POST"
      const contentType = "true"
      const response = await client(url, method, data, contentType)
      if (!response) throw new Error("Cannot Create a reporter")
      return response
    } catch (e) {
      throw e
    }
  },

  fetchUserFromStore: () => {
    let user = store?.getState()?.user?.user
    let token;
    if (user) {
      token = user.token || ''
    }
    return {
      user,
      token
    }
  },

  getUserReports: async (userId) => {
    try {
      const url = `${serverUrl}/report/user-reports?reporterId=${userId}`
      const method = 'GET'
      const response = await client(url, method);
      if (!response)
        throw new Error("Cannot fetch Reports");
      return response
    } catch (e) {
      throw e
    }
  },

  getRosources: async () => {
    try {
      const url = `${serverUrl}/article/`
      const method = 'GET'
      const response = await client(url, method);
      if (!response)
        throw new Error("Cannot fetch Articles");
      return response
    } catch (e) {
      throw e
    }
  },

  getOneRosource: async (articleId) => {
    try {
      const url = `${serverUrl}/article/one?articleId=${articleId}`
      const method = 'GET'
      const response = await client(url, method);
      if (!response)
        throw new Error("Cannot fetch Article");
      return response
    } catch (e) {
      throw e
    }
  },

  forgotPasswordEmail : async (data) => {
    try {
      const url = `${serverUrl}/auth/send-reset-password-email`
      const method = "POST"
      const response = await client(url, method, data)
      if (!response) throw new Error("password Rset Failed")
      return response
    } catch (e) {
      throw e
    }
  },

  resetPassword :async (data) => {
    try {
      const url = `${serverUrl}/auth/reset-password`
      const method = 'POST'
      const response = await client(url, method, { ...data });
      return response
    } catch (e) {
      throw e
    }
  },

  verifyPasswordToken:async (data) => {
    try {
      const url = `${serverUrl}/auth/verify-passwordToken`
      const method = 'POST'
      const response = await client(url, method,data);
      return response
    } catch (e) {
      throw e
    }
  },
}
