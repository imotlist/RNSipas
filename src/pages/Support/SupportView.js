import React, { Component } from 'react'
import { View, Text,StatusBar, TouchableOpacity } from 'react-native'
import {Image} from 'react-native-elements'
import styles from './SupportView.scss'
import {Router} from 'src/system'

const SupportView = () => {
    return(
        <View style={styles.pageContainer}>
            <StatusBar hidden />
            <Image
                source={ require('public/img/not-support.png')}
                style={styles.pageImage}
            />
            <Text style={styles.pageTitle}>Deprecated App</Text>
            <Text style={styles.pageText}>Please contact your support team</Text>
            <TouchableOpacity onPress={()=>{Router().RouteTo('Server')}}>
                <Text style={styles.pageText}>or go to setting</Text>            
            </TouchableOpacity>
        </View>
    )
}

export default SupportView