import React from 'react'
import {getStore,setStore} from './Store'
import {decode, encode} from 'base-64'

const Token = () => {
    const callback = {}

    callback.setToken = (token) => setToken(token);
    callback.getToken = () => getToken();
    callback.getData = () => getData();
    callback.getImageProfile = (id) => getImageProfile(id);
    return callback;
}

const getData = () => {
    let token       = getToken();
    if(!token) return null;

    let dataStr     = token.split('.'),
        dataToken   = dataStr[1],
        result      = decode(dataToken),
        data        = JSON.parse(result);
    return data;
}

const setToken = (token) =>{
    setStore('token',token);
}

const getToken = () => {
    return getStore('token');
}

const getImageProfile = (id) => {
    //https://teo.pttimah.co.id/dev/server.php/sipas/staf/get_image/foto?id=d21f6b8cf8e644fa9bd70d3aa17499f6
    let idUser = id ? id : getData().profile.staf_id,
        server = getStore('server'),
        link   = server+'server.php/sipas/staf/get_image/foto?id='+idUser;
    console.log(link);
    return link;
}

export default Token

export {getData, setToken}