import React, { Component,useState } from 'react'
import {Text,View,Alert, StyleSheet} from 'react-native'
import { Button, Overlay } from 'react-native-elements';

const Modalbox = (props) => {
    const callback = {}

    callback.showConfirm = (title,msg,onResponse) => showConfirm(title,msg,onResponse);
    callback.showMessage = (title,msg) => showMessage(title,msg);
    
    return callback;
}

const showConfirm = (title,msg,onResponse) => {
    Alert.alert(
        title,
        msg,
        [
            {text: 'OK', onPress:()=>{onResponse(true)}},
            {text: 'CANCEL',onPress:()=>{onResponse(false)}}
        ],
        {cancelable:false}
    )
}

const showMessage = (title,msg, response) => {
    if(!response){
        response= () => {};
    }
    Alert.alert(
        title,
        msg,
        [
            {text: 'OK', onPress:()=>{response()}},
        ],
        {cancelable:false}
    )
}

export default Modalbox
export {showConfirm,showMessage}