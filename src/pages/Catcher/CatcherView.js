import React, { Component } from 'react'
import styles from './CatcherView.scss'
import { View, Text } from 'react-native'

const CatcherView = () => {
    return(
        <View style={styles.pageBackground}>
            <Text style={styles.errorTitle}>Oops...!!</Text>
            <Text style={styles.errorDesc}>Terjadi kesalahan.</Text>
        </View>
    )
}

export default CatcherView