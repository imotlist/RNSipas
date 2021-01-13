import React, { Component } from 'react'
import {Connect} from 'src/system'

const APILOG = {
    create : 'server.php/sipas/disposisi_masuk_log/create',
    update_disposisi : 'server.php/disposisi/log/update',
    update_koreksi : 'server.php/sipas/koreksi_masuk/update'
}

const koreksiUrl = {
    create : 'server.php/sipas/disposisi_masuk_log/create',
    update : 'server.php/sipas/koreksi_masuk/update'
}

const Logger = () => {
    // let record = props.record || {},
    //     data   = props.data   || {},
    //     params = props.params || {},
    //     type   = props.type   || false,
    //     mode   = props.mode   || 'save';
    
    // if(!type) return;

    // let config = {
    //     record : record,
    //     data   : data,
    //     params : params,
    //     mode   : mode
    // };

    let callback = {};

    callback.save = (config) => createLog(config);
    callback.disposisiUpdate = (config) => updateLog('disposisi',config);
    callback.koreksiUpdate = (config) => updateLog('koreksi',config);

    // if(type == 'disposisi'){
    //     config.url = (mode == 'save') ? disposisiUrl.create : disposisiUrl.update;        
    // }else{
    //     config.url = (mode == 'save') ? koreksiUrl.create : koreksiUrl.update;        
    // }
    // doConnect(config);
    return callback;
}


const createLog = (config) => {
    config.url = APILOG.create;
    doConnect(config);
}

const updateLog = (type, config) => {
    if(type == 'disposisi'){
        config.url = APILOG.disposisiUpdate;
    }else{
        config.url = APILOG.koreksiUpdate;
    }

    doConnect(config);
}

const doConnect = (config) => {
    Connect({
        url     : config.url,
        method  : 'post',
        params  : params,
        data    : {...config.record, ...config.data}
    }).then(result => {
        const {data, request, response} = result;
        let getData = Ext.decode(response);
        console.log('Response Log :',getData);
    }).catch(err=> {
        console.err(err)
    })
}

export default Logger