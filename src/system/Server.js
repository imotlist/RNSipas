import React, { Component } from 'react'
import {getStore, setStore} from './Store'
import Version from './Version'
import axios from 'axios'
import to from 'await-to-js'
import {Runtime} from 'src/system'
import { ErrorHandler } from './Connect'
var checkApi = 'server.php/sipas/api/info';

export default Server = () => {
    const callback = {}

    callback.serverCheck = () => serverCheck();
    callback.serverSet = (url) => serverSet(url);
    callback.getServer = () =>  serverGet();

    return callback;
}

const serverCheck = async(baseUrl=getStore('server')) => {
    console.log('Server Check in Progress!!',baseUrl);
    if(!baseUrl) return null;

    let err,result;
    [err,result] = await to(axios({url : baseUrl+checkApi, method:'get'}));
    // console.warn(err);
    if(err){
        ErrorHandler(err);
        return false;
    }

    let res      = result.data,
        isSuccess   = res.success ? true : false;        
    console.log(res.mobile_version);
    new Version().setSupportVersion(res.mobile_version);
    // version.setAppVersion(res.mobile_version); //save support version
    return isSuccess;  

}

const serverSet = (url) =>{
    // check server fisrt
    let callServer = serverCheck(url);
    if(callServer) {
        setStore('server',url);
        Runtime().parseRuntime();
    };
    return callServer;
    // then if true set to store
    // if false return false (warn user)
}

const serverGet = () =>{
    let server = getStore('server');    
    return server;
}

export {serverCheck, serverSet, serverGet}