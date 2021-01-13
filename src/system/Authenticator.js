import React from 'react'
// import Connect from './Connect'
import {md5} from 'src/library'
import {Connect, Runtime} from 'src/system'

const Authenticator = () => {
    const callback = {}
    callback.doAuth = (data) => doAuth(data);
    return callback;
}

const doAuth = (data) => {
    const useHashLoginPassword = new Runtime().getRuntimeData('useHashLoginPassword');    
    if(useHashLoginPassword) data = {...data, password:md5(data.password)}    
    return Connect({
        url     :   'server.php/sipas/account/login/token',
        method  :   'post',
        data    :   data
    })
}

export default Authenticator