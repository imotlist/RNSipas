import React from 'react'
import DeviceInfo from 'react-native-device-info';
import {setStore, getStore} from './Store'
import {Connect} from 'src/system'

const Version = () => {
    const callback = {}

    callback.checkSupportVersion = () => checkSupport();
    callback.setSupportVersion = (dataArray) => setSupport(dataArray);
    callback.setAppVersion = (value) => setVersion(value);
    callback.getAppVersion = () => getVersion() ;    
    callback.checkUpdate = () => versionUpdate() ;    
    return callback;
}

const checkSupport = () => {
    let supportVersion     = JSON.parse(getStore('supportVersion')),
        // useVersion      = getStore('useVersion'),
        useVersion         = DeviceInfo.getReadableVersion() || '5.33.20200',
        split              = useVersion.split('.'),
        version            = split[0]+'.'+split[1],        
        isSupported        = false;
        
    console.log('Version Number : ',useVersion, version);
    
    supportVersion.forEach(ver => {
        if(ver == version) isSupported = true;
    });

    return isSupported;    
}

const setSupport = (dataArray) => {
    
    setStore('supportVersion',JSON.stringify(dataArray));  // save support version to storage sync
    
}

const setVersion = (value) => {
    setStore('useVersion','5.33.20300');
}

const getVersion = () => {
    return DeviceInfo.getReadableVersion();
}

const versionUpdate = () => {
    Connect({
        url:'mobile/manifest.json'
    }).then(response => {
        const {data, success, request} = response
        const {android, ios} = data;
        let curentVersion = getVersion(),
            osType = DeviceInfo.getSystemName(),
            useType = (osType == 'Android') ? android : ios;           
        console.log('Resp',data);
        

        if(useType.version > curentVersion) {
            alert('Update aplikasi tersedia')
        }
    }).catch(err => {
        console.log('Err : ',err)
    })
}


export default Version;

export {checkSupport, setSupport, setVersion, getVersion}