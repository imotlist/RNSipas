import React, { Component } from 'react'
import { ScrollView, View, Text, TouchableOpacity, StatusBar } from 'react-native'
import {debounce} from 'lodash';
import styles from 'src/theme'
import { Icon, Button } from 'react-native-elements'
import {Button as Btn, GetImage, Dokumen,Surat, TimeLine, Response} from 'src/components'
import {Router} from 'src/system'

// const nav = new Router
const DisposisiView = ({record}) => {
    return(
        <>
        <StatusBar hidden />
        <ScrollView style={[styles.bgGrey200,{marginBottom:70}]}>
            <View style={styles.detailHeadDisposisi}>
                <View style={styles.absoluteIcon}>
                    <GetImage source='inmail' style={styles.detailHeadImage} />
                </View>
                <View style={styles.navTitle}>
                    <TouchableOpacity onPress={()=>{Router().RouteBack()}}>
                        <Icon name='angle-left' type='font-awesome' style={{paddingRight:10}}/>
                    </TouchableOpacity>
                    <Text style={styles.headTitle}>Detail Disposisi</Text>
                </View>
                <Text numberOfLines={1} style={styles.detailHeadTitle}>{record.surat_perihal || 'Perihal disposisi'}</Text>
                <Text style={styles.detailSubTitle}>{record.disposisi_pengirim_unit_nama}</Text>      
                <View style={[styles.rowContent,{paddingTop:15}]}>
                    <Text style={styles.badgeDanger}>DIV_SAU</Text>
                    <Text style={styles.badgeWarning}>MO-Memo</Text>
                </View>          
            </View>
            <Dokumen record={record}/>
            <Surat record={record}/>       
            <UrutanPenerima record={record}/>
        </ScrollView>
        <FootBar record={record}/>
        </>
    )
}

const FootBar = ({record}) => (    
    <View style={styles.footerBar}>
        <View style={styles.pageMenu}>
            <Btn 
                text = "Riwayat"
                type = "outline"
                ui   = "btnInfo"
                iconName = "timer"
                textUI = "textInfo"
                ontap = {
                    debounce(
                        ()=>Router().RouteTo('Riwayat',{record:record}),
                        500,
                        { leading: true, trailing: false }
                    )
                }                            
            />
        </View>
        <View style={styles.pageMenu}>
            <Btn 
                text = "Disposisi"
                ui   = "btnInfo"
                iconName = "angle-right"
                iconType = "font-awesome"
                ontap = {
                    debounce(
                        ()=>Router().RouteTo('Forward',{record:record,mode:'init'}),
                        500,
                        { leading: true, trailing: false }
                    )
                }
            />
        </View>
    </View>
)

const UrutanPenerima = ({record}) => {
    let title = record.disposisi_mode == 'Disposisi' ? 'Detail Disposisi' : 'Respon Anda'
    return(
        <View style={{backgroundColor:'white',marginTop:20,padding:10}}>
            <View style={styles.navTitle}>
            <Text style={styles.headTitle}>{title}</Text>
            </View>
            { record.disposisi_mode == 'Disposisi' && <TimeLine record={record}/> }
            <Response jenis="disposisi" data={record} />
        </View>
    )
}

export default DisposisiView