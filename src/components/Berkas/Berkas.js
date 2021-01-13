import React, { Component } from 'react'
import {View, Text} from 'react-native'
import styles from 'src/theme'
import { Button } from 'react-native-elements'
const Berkas = () => {
    return(
        <View style={styles.rowBorder}>
            <View style={styles.column}>
                <Text style={styles.suratSubTitle}>Surat disertai berkas fisik</Text>
            </View>
            <View style={styles.column}>
            <Button title="Minta Berkas"
                    buttonStyle={styles.btnInfo}
                    containerStyle={styles.square}
            />
            </View>
        </View>
    )
}

export default Berkas