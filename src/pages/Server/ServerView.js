import React, { Component } from 'react'
import pageStyle from './ServerView.scss'
import styles from 'src/theme'
import { View, Text, StatusBar,TextInput, TouchableOpacity } from 'react-native'
import {Image,Icon, Input, Button} from 'react-native-elements'
import {checkServer,saveServer,urlServer} from './Server'
import {Router} from 'src/system'
import { Actions } from 'react-native-router-flux'
import {Loading} from 'src/components'


export default ServerView = (props) => {
    const {server,state} = props;
    return(
        <View style={pageStyle.pageContainer}>
            <StatusBar hidden />          
            <Loading isVisible={state.isVisible}/>
            <View style={styles.rowContent}>
                <TouchableOpacity onPress={()=>{Router().RouteBack()}} >
                    <Icon name='angle-left' type='font-awesome' style={{paddingRight:15,paddingTop:22, paddingLeft:15}} iconStyle={pageStyle.pageTitle}/>
                </TouchableOpacity>
                <Text style={pageStyle.pageTitle}>Server Setting</Text>
            </View>
            <Image
                source={ require('public/img/server-page.png')}
                style={pageStyle.pageImage}
            />
            <View style={pageStyle.pageContent}>        
                <Text style={pageStyle.textTitle}>New Server</Text>
                <Input
                    placeholder='Server'
                    leftIcon={
                        <TouchableOpacity onPress={()=>Actions.push('Scanner',{tipe:'server'}) }>
                            <Icon
                                name='qrcode'
                                type="font-awesome"                                
                                iconStyle={[styles.textInfoOutline,{fontSize:18}]}
                            />
                        </TouchableOpacity>
                    }                    

                    rightIcon={
                        <TouchableOpacity onPress={()=>saveServer()}>
                            <Icon
                            name='save'
                            size={18}
                            color='#6f6f6f'
                            />
                        </TouchableOpacity>
                    }
                    onChangeText={(text)=>urlServer(text)}
                    inputStyle={pageStyle.textInput}
                    inputContainerStyle = {pageStyle.inputContainer}
                    containerStyle = {pageStyle.inputOuter}
                />
                <Text style={pageStyle.textTitle}>Server Used</Text>
                <Input
                    placeholder='Server Used'
                    rightIcon={
                        <TouchableOpacity onPress={()=>checkServer()}>
                            <Icon
                                name='send'
                                size={18}
                                color='#6f6f6f'
                            />
                        </TouchableOpacity>
                    }
                    value={server}
                    inputStyle={pageStyle.textInput}
                    inputContainerStyle = {pageStyle.inputContainer}
                    containerStyle = {pageStyle.inputOuter}
                />
                <Text style={pageStyle.textDesc}>Catatan : ...</Text>
            </View>                          
        </View>
    )
}