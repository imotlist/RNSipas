import React from 'react'
import {View, ScrollView} from 'react-native'
import ItemDisposisi from 'src/components/ItemDisposisi/ItemDisposisi'
import styles from './NotificationView.scss'
import { Text,SearchBar } from 'react-native-elements'

const NotificationView = () => {
    return(
        <View style={styles.pageContainer}>
            <View style={styles.pageHeader}>
                <Text style={styles.textTitle}>Notifikasi</Text>
                <SearchBar
                    placeholder="Cari Pesan atau Disposisi..." 
                    inputStyle={styles.inputSearch}
                    inputContainerStyle={styles.inputContainerSearch}
                    containerStyle={styles.containerSearch}                
                />
                <Text style={styles.textSub}>Minggu Terakhir</Text>
            </View>
            <ScrollView style={styles.listView}>
                <NotifList />
            </ScrollView>
        </View>
    )

}

const list = [1,2,3,4,5,6]

const NotifList = () => {
    return(
        <View style={{marginBottom:150}}>
            {
                list.map((item, index) => (
                    <ItemDisposisi record={item}/>
                ))
            }
        </View>
    )
}

export default NotificationView