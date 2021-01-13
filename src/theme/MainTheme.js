import React, { Component } from 'react'
import {StyleSheet,Dimensions} from 'react-native'
import Store from 'src/system'
import light from './lightMode.scss'
import dark  from './darkMode.scss'

// let themeMode = new Store().getStore('themeMode') || 'light';
let styles;

// if(themeMode == 'light'){
    styles  = light;
// }else{
//     styles = dark;
// }

export default  styles