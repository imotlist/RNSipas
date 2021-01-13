import React from 'react'
import {Connect, Store} from 'src/system'
import stripJsonComments from 'strip-json-comments'

const Runtime = () => {
    const callback = {}
        callback.getRuntimeData = (key) => getRuntimeData(key);
        callback.parseRuntime = () => parseRuntime();
        callback.checkRuntime = () => checkRuntime();
        return callback;
}

const parseRuntime = () => {
    Connect({
        url     :'runtime.json'        
    }).then(response => {
        let result = JSON.parse(stripJsonComments(response.data))
        setRuntime(result);
    }).catch(err => {
        console.log(err);
    })
}

const setRuntime = (runtimeValue) => {
    Store().setStore('runtime', runtimeValue)
}

const getRuntimeData = (key) => {
    let runtimeValue = Store().getStore('runtime'),
        resultValue = runtimeValue[key] || false;
    // console.log(key, resultValue);
    // console.log(runtimeValue);
    return resultValue;
}

const checkRuntime = () => {
    let runtimeValue = Store().getStore('runtime');    
    if(runtimeValue){
        return true;
    }else{
        // parseRuntime();
        return false;
    }
}

export default Runtime