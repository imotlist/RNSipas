import React, { Component } from 'react'
import {LogBox} from 'react-native'
import Routes from 'src/config/routes'
import {Toast} from 'src/components'
const Main = () => {
    LogBox.ignoreAllLogs(true);
    return(
        <>
            <Routes/>        
            <Toast/>
        </>
    )
}

export default Main