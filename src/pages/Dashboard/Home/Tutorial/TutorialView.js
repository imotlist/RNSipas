import React from 'react'
import styles from './TutorialView.scss'
import { View, Text } from 'react-native'
import {Image} from 'react-native-elements'

const TutorialView = () => {
    return(
        <>
        <View style={styles.titleBar}>
            <Text style={styles.textHeader}>Tutorial Untuk Anda</Text>            
        </View>
        <View style={styles.pageComponent}>
            <View style={styles.rowContent}>
                <Image
                    source={ require('public/img/isometric.jpg')}
                    style={styles.imgTumb}
                />
                <View style={styles.rightContent}>
                    <Text style={styles.textTitle}>Tutorial Pengguna Baru</Text>
                    <Text style={styles.textSub}>Lorem ipsum dolor sit amen</Text>
                </View>
            </View>

            <View style={styles.rowContent}>
                <Image
                    source={ require('public/img/isometric-ii.jpg')}
                    style={styles.imgTumb}
                />
                <View style={styles.rightContent}>
                    <Text style={styles.textTitle}>Tutorial Asistensi</Text>
                    <Text style={styles.textSub}>Lorem ipsum dolor sit amen</Text>
                </View>
            </View>

            <View style={styles.rowContent}>
                <Image
                    source={ require('public/img/isometric-iii.jpg')}
                    style={styles.imgTumb}
                />
                <View style={styles.rightContent}>
                    <Text style={styles.textTitle}>Tutorial SIPAS</Text>
                    <Text style={styles.textSub}>Lorem ipsum dolor sit amen</Text>
                </View>
            </View>
        </View>
        </>
    )
}

export default TutorialView