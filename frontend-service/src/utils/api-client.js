import appStorage from '@/redux/customStorage'
export const  client = async (url, method, reqBody = undefined, contentType) => {

  const { token } = appStorage.getItem('user')
  const headers = {
    'Authorization': `Bearer ${ token }`
  }
  
  reqBody = contentType ? reqBody : JSON.stringify(reqBody) 

  const config = {
    method,
    body: reqBody,
    headers,
  };
  try {
    const response = await window.fetch(url, config);
    return response.json()
  } catch (err) {
    console.log('Client Error -------> ', err)
  }
}
