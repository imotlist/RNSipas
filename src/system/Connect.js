import React from 'react';
import axios from 'axios';
import NetInfo from "@react-native-community/netinfo";
import Server from './Server'
import Store from './Store'
import Token from './Token';
// import https from 'https'
// const https = require('https');
/*  RESPONSE Axios
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
*/

const Connect = (config) => {

    let baseUrl = new Server().getServer(),
        token = new Token().getToken();

    if(config.params){
        let params = config.params;
        if(params.sort){
            config.params.sort = JSON.stringify(params.sort)
        }

        if(params.filter){
            config.params.filter = JSON.stringify(params.filter)
        }
    }

    let opt = {
        url             : baseUrl + config.url,
        method          : config.method || 'get',
        timeout         : config.timeout || 30000,
        data            : handleData(config.data || {}),
        params          : config.params || {},
        headers         : {
            'Authorization' : 'Bearer '+token,
            'Access-Control-Allow-Origin'   : '*'
        },
        withCredentials : true  //handle CORS        
        // httpsAgent: new https.Agent({ keepAlive: true }),
        // httpsAgent: new https.Agent({
        //     rejectUnauthorized: false
        // })
    }
    
    if(config.headers){
        let passHeader = config.headers;        
        Object.keys(passHeader).map(key => {
            opt.headers[key] = passHeader[key];
        })
    }
    
    // console.log('Options:', JSON.stringify(opt));
    return axios(opt);    
}

const handleData = data => {
    const FD = new FormData();
    if(!data) return {};    
    Object.keys(data).map(key => FD.append(key,data[key]));       
    return FD;
}

const Porting = async (config) => {
    let opt = {
        url             : config.url,
        method          : config.method || 'get',
        timeout         : config.timeout || 30000,
        data            : handleData(config.data || {}),
        params          : config.params || {},
        withCredentials : true  //handle CORS        
    }

    try {
        let result = axios(opt);
        if(result){
            return result;
        }
    } catch (error) {
        return error;
    }
     
}

const isOnline = () => {
    NetInfo.fetch()
}


const ErrorHandler = (error) => {

    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }

      console.log(error.config);

}


export default Connect
export { Porting, ErrorHandler }
