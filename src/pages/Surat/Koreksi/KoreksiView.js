import React, { Component } from 'react'
import { ScrollView, View, Text, TouchableOpacity, StatusBar } from 'react-native'
import styles from 'src/theme/MainTheme'
import {Dokumen,Surat, TimeLine, Response} from 'src/components'
import { Icon, Button } from 'react-native-elements'
import {Router} from 'src/system'
import {GetImage} from  'src/components'

const KoreksiView = ({record}) => {
    return(
        <>  
            <StatusBar hidden />
            <ScrollView style={[styles.bgGrey200]}>
                <View style={styles.detailHeadKoreksi}>
                    <View style={styles.absoluteIcon}>
                        <GetImage source='mailbox' style={styles.detailHeadImage} />
                    </View>
                    <View style={styles.navTitle}>
                        <TouchableOpacity onPress={()=>{Router().RouteBack()}}>
                            <Icon name='angle-left' type='font-awesome' style={{paddingRight:10}}/>
                        </TouchableOpacity>
                        <Text style={styles.headTitle}>Detail Draf</Text>
                    </View>
                    <Text numberOfLines={1} style={styles.detailHeadTitle}>Perihal diedarkan pada rapat mendatang</Text>
                    <Text style={styles.detailSubTitle}>Gubernur kepulauan bangka belitung</Text>      
                    <View style={[styles.rowContent,{paddingTop:15}]}>
                        <Text style={styles.badgeDanger}>DIV_SAU</Text>
                        <Text style={styles.badgeWarning}>MO-Memo</Text>
                    </View>          
                </View>
                <Dokumen record={record}/>
                <Surat record={record}/>
                <StatusPenyetuju /> 
                <UrutanPenyetuju record={record}/>
            </ScrollView>            
        </>
    )
}


const UrutanPenyetuju = ({record}) => {
    return(
        <View style={{backgroundColor:'white',marginTop:20,padding:10}}>
            <View style={styles.navTitle}>
                <Text style={styles.headTitle}>Urutan Penyetuju</Text>
            </View>
            <TimeLine record={record}/>     
            <Response jenis="draf" data={record} />
        </View>
    )
}

const StatusPenyetuju = () => {
    return(
        <View style={{backgroundColor:'white',marginTop:20,padding:10}}>
            <View style={styles.navTitle}>
                <Text style={styles.headTitle}>Status Penyetuju</Text>
            </View> 
        </View>
    )
}

export default KoreksiView