import React from 'react'
import SyncStorage from 'sync-storage';

export default Store = () => {
    const callback = {}

    callback.getStore = (key) => getStore(key);
    callback.setStore = (key,value) => setStore(key,value);
    callback.removeStore = (key) => removeStore(key);
    callback.clearStore = () => clearStore();

    return callback;
}

const getStore = (key) => {
    return SyncStorage.get(key);
}

const setStore = (key,value) => {
    SyncStorage.set(key, value).then(res=>{console.log('Success: ',res)}).catch(err=> {console.warn('Error :',err)});
}

const removeStore = (key) => {
    SyncStorage.remove(key);
}

const clearStore = () => {
    let allKey = Store();

    allKey.forEach(key => {
        SyncStorage.remove(key)
    });
}

export {getStore,setStore,removeStore,clearStore}