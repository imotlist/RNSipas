import React, { Component } from 'react'
import { View, Text,StatusBar } from 'react-native'
import {goTo,goBack} from './AppInit'
// import styles from './AppInitView.scss'
import styles from 'src/theme'
import {GetImage} from  'src/components'

const AppInitView = () => {
    return(
        <View style={styles.fullPageContainer}>
            <StatusBar hidden />
            <GetImage source='init-page' style={styles.pageImage} />
            <Text style={[styles.textTitle,{textAlign:'center'}]}>App Initializing</Text>
            <Text style={[styles.textDesc,{textAlign:'center'}]}>Please wait ...</Text>
            {/* <Text style={[styles.textInfo,{textAlign:'center'}]}>Process required (1/5) completed</Text>
            <Text style={[styles.textDanger,{textAlign:'center'}]}>Failed : source not found!!</Text> */}
        </View>
    )
}

export default AppInitView