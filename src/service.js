import axios from 'axios';
import config from './config';

/**
* Method for calling APIs.
* @param {String} method : Method using which the api is called(GET, POST, etc.)
* @param {String} url : URL of the API
* @param {Object} obj : Object/data to be sent as input.
* @returns {Promise} Promise
*/
const call = (method, url, obj = {}) => {
  return new Promise((resolve, reject) => {
    let args = {
      method: method,
      url: config.baseUrl + url,
      data: obj
    }
    try {
      axios(args).then(response => {
        if (response.data.success)
          resolve(response.data.data);
      }).catch(e => {
        reject(e);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export default call;
