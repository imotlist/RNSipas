import React, { Component } from 'react'
import { View, Text, Dimensions } from 'react-native'
import {Avatar, Divider} from 'react-native-elements'
import {Button as Btn, GetImage, CheckBox, Button} from 'src/components'
import styles from 'src/theme'

const fullWidth = Dimensions.get('window').width-21;

const SettingView = (props) => {
    const {overlayData} = props
    return(
        <View style={{width:fullWidth, borderRadius:100}}>
            <View style={[styles.rowContent,{paddingBottom:20, paddingTop:10}]}>
                <View style={{justifyContent:'center'}}>
                    <Avatar
                        rounded
                        source={{
                            uri: overlayData.staf_image_preview,
                        }}
                        size="medium"
                    />
                </View>
                <View style={[styles.column, {paddingLeft:20, paddingTop:0}]}>
                    <Text style={styles.textTitle}>{overlayData.staf_nama}</Text>
                    <Text style={styles.textInfo}>{overlayData.jabatan_nama}</Text>
                    <Text style={styles.textInfo}>{overlayData.unit_nama}</Text>
                </View>                        
            </View> 
            <Divider/>
            <View style={{paddingTop:10}}>
                <CheckBox iconRight={true} 
                    // check={state.rahasia}
                    text="Tandai Sebagai PLT" 
                    textStyle={{width:270,textAlign:'left'}}
                    onTap={()=>{}} />
                <CheckBox iconRight={true} 
                    // check={state.rahasia}
                    text="Batasi Waktu" 
                    textStyle={{width:270,textAlign:'left'}}
                    onTap={()=>{}} />
            </View>
            <View style={{paddingLeft:30,paddingTop:5, paddingBottom:10}}>
                <View style={[styles.rowContent,{padding:5}]}>
                    <View style={[styles.column]}>
                        <Text style={styles.textInfo}>Mulai</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.textInfo}>12 September 2020</Text>
                    </View>
                </View>
                <View style={[styles.rowContent,{padding:5, paddingTop:10}]}>
                    <View style={styles.column}>
                        <Text style={styles.textInfo}>Selesai</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.textInfo}>30 September 2020</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.rowContent, {paddingBottom:20,paddingTop:10}]}>
                <View style={styles.column}>
                    <Button text="Batal" ui="btnNetral" />
                </View>
                <View style={styles.column}>
                <Button text="Simpan" ui="btnSuccess" />
                </View>
            </View>
        </View>
    )
}

export default SettingView