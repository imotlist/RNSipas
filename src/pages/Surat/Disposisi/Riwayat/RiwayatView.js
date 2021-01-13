import React, { Component } from 'react'
import { View, Text, StatusBar, TouchableOpacity, FlatList } from 'react-native'
import {Icon} from 'react-native-elements'
import styles from 'src/theme'
import {Router} from 'src/system'
import {ItemDisposisi} from 'src/components'


const RiwayatView = (props) => {
    return(
        <View style={{height:'80%', flex:1}}>
            <StatusBar hidden />
            <View style={styles.detailHeadDisposisi}>
                <View style={styles.navTitle}>
                    <TouchableOpacity onPress={()=>{Router().RouteBack()}}>
                        <Icon name='angle-left' type='font-awesome' style={{paddingRight:10}}/>
                    </TouchableOpacity>
                    <Text style={styles.headTitle}>Riwayat Disposisi</Text>
                </View>        
            </View>
            <FlatList
                data={props.state.dataRiwayat}
                renderItem={({ item, index }) => (                                   
                    <ItemDisposisi record={item}/>
                  )}
                keyExtractor={(item) => item.disposisi_id}                
            />
        </View>
    )
}

export default  RiwayatView