import { client} from '../utils/api-client'
import moment from 'moment'

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

  getReports: async (data) => {
    const { state, localGovt, incidentType, rawDate, filterReport } = data || {}
    const baseUrl = `${serverUrl}/report/get-advanced`;
    const queryParams = {
      "address.localGovt": localGovt,
      "address.state": state,
      ...transformReportType(filterReport),
      reportTypeId: incidentType,
      ...transformDate(rawDate),
    };

    
    try {
      const url = buildUrl(baseUrl, queryParams);
      const method = 'GET'
      const response = await client(url, method);
      if (!response)
        throw new Error("Cannot fetch Complainer");
      return response
    } catch (e) {
      throw e
    }
  },

  getNotifications:async () => {
    try {
      const url = `${serverUrl}/notification`
      const method = 'GET'
      const response = await client(url, method);
      return response
    } catch (e) {
      throw e
    }
  },

  getOneReport:async (reportSlug) => {
    if (!reportSlug ) 
    return {
      status: 'failed',
      message: '',
    }
    try {
      const url = `${serverUrl}/report/one?reportSlug=${reportSlug}`
      const method = 'GET'
      const response = await client(url, method);
      return response
    } catch (e) {
      throw e
    }
  },

  editReport: async (data) => {
    try {
      const url = `${serverUrl}/report`
      const method = 'PATCH'
      const response = await client(url, method, { ...data });
      if (!response)
        throw new Error("Cannot Edit Report");
      return response
    } catch (e) {
      throw e
    }
  },

  updateNotification: async (reportId) => {
    if (reportId) 
    return {
      status: 'failed',
      message: '',
    }
    try {
      const url = `${serverUrl}/notification?_id=${reportId}`
      const method = 'PUT'
      const response = await client(url, method);
      return response
    } catch (e) {
      throw e
    }
  },

  searchGoogleNews: async (searchParams) => {
    try {
      const url = `https://news.google.com/search?q=${searchParams}&hl=en-NG&gl=NG&ceid=NG%3Aen`
      const method = 'GET'
      const response = await client(url, method);
      return response
    } catch (e) {
      throw e
    }
  },
}

const buildUrl = (baseUrl, queryParams) => {
  const url = new URL(baseUrl);
  Object.keys(queryParams).forEach((key) => {
    if (queryParams[key] === undefined) {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, queryParams[key]);
    }
  });

  return url.toString();
}

const transformReportType = (data) => {
  return {
    sort: data?.sort === 1 ? 1 : undefined,
    exists: data?.userId === true ? true : data?.userId === false ? false : undefined,
    verified: data?.verified ? 'verified' : undefined,
  };

}

const transformDate = (rawDate) => {
  const today = moment().format('YYYY-MM-DD')
  if (!rawDate?.length)  return undefined
  if (Array.isArray(rawDate)) {
    if ( JSON.stringify(rawDate[0]) === JSON.stringify(today) 
        && JSON.stringify(rawDate[1]) === JSON.stringify(today)) {
      return undefined
    } else if (JSON.stringify(rawDate[0]) === JSON.stringify(rawDate[1])) {
      return {
        gte: rawDate[0],
      }
    } else {
      return {
        gte: rawDate[0],
        lt: rawDate[1]
      }
    }
  }

}
