import React, { Component } from 'react'
import { View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Actions } from 'react-native-router-flux';
import {decode, encode} from 'base-64'
import {Connect, Server, Router, Token} from 'src/system'
import RNRestart from 'react-native-restart'

const onBarcodeScanner = (props) => {
    const {data, rawData, type, bounds, tipe} = props;

    console.log('Data : ', data);
    console.log('Tipe : ', tipe);
    
    let  result = '';

    try{
        let res = decode(data);
        result = JSON.parse(res); // {deviceId:'', url:''}
    }catch(e){
        result = data;
    }

    if(tipe == 'login'){
        doLogin(result);
        Promise.resolve(Actions.pop()).then(() => { doLogin(result); });
    }else{
        console.log('Scan :', result);
        saveServer(result);        
    }

    if(rawData){
        Actions.pop();
    }

}

const ScannerView = (props) => {
    console.log('Open Scanner');
    const {tipe} = props;
    console.log(tipe);
    return (
        <View style={{alignSelf:'center', position:'absolute', top:200}}>
            <RNCamera
                style={{
                    width:220,
                    height:200
                  }}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.off}
                androidCameraPermissionOptions={{
                  title: 'Izinkan penggunaan kamera',
                  message: 'Kamera digunakan untuk scanner qrcode',
                  buttonPositive: 'Izinkan',
                  buttonNegative: 'Tolak',
                }}

                onBarCodeRead={(props)=>onBarcodeScanner({...props, tipe:tipe})}
            />
        </View>
    )
}

const doLogin = (data) => {
    console.log('Data', data);
    Connect({
        url : 'server.php/sipas/account/deviceLogin',
        params : {
            id : data.deviceId
        }
    }).then(response=> {
        const {data, success, request} = response        
        console.log(data.success);
        // console.log(data.token);
        if(data.success){
            
            Token().setToken(data.token);
            Router().RouteReplace('Dashboard');
        }else{
            alert(data.message);
            Router().RouteBack();
        }
    }).catch(err => {
        console.log('Error : ',err)
        Router().RouteBack();
    })

}

const saveServer = (props) => {
    let url = typeof props == 'string' ? props : props.url;
    let isServer = Server().serverSet(url);
    if(isServer){        
        RNRestart.Restart();  
    }else{
        console.log('Server Gagal ', url);
    }
}

export default ScannerView