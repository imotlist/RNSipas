import React from 'react'
import license from 'public/required/license.json'
import { call } from 'react-native-reanimated';

const License = () => {
    let callback = {};
    
    callback.checkLicense   = () => checkLicense();
    callback.getLicense     = (keyFind) => getLicense(keyFind);

    return callback;
}

const checkLicense = () => {
    let licensedTill = getLicense('licensedTill'),
        licenseDate  = new Date(licensedTill),
        today        = new Date(),
        month        = today.getMonth()+1,
        useMonth     = month.length == 1 ? '0'+month : month,
        date         = today.getDate(),
        useDate      = date.length == 1 ? '0'+date : date,
        dateNow = today.getFullYear()+'-'+useMonth+'-'+useDate,
        isLicense = (today < licenseDate) ? true: false;
    
    return isLicense;
}

const getLicense = (keyFind) => {
    let Result = false;

    Object.keys(license).map((key,index) => {
        if(key == keyFind){
            Result = license[key];
        }        
    });

    return Result;
}

export default License