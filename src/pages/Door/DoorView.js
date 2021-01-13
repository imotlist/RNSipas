import React, { Component, useReducer, useEffect } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native'
import {Image, Input,Button,Icon} from 'react-native-elements'
import {useForm} from 'react-hook-form'
import styles from 'src/theme'
import pageStyle from './DoorView.scss'
import {GetImage, Loading} from 'src/components'
import {doLogin,toServer, doLoginScan} from './Door'
const {pageTitle} = styles;

export default  DoorView = (props) => {    
    const {state, dispatch} = props;    
    const {register, handleSubmit, setValue, errors} = useForm();
    const onSubmit = data => {
        // console.log('Data ', data);
        doLogin(data);
    }

    useEffect(()=>{
        register('username',{required: true});
        register('password',{required: true});
    },[register])
    let imgLogo = state.showimage ? pageStyle.pageImage : pageStyle.pageImageMedium;
    return(
        <SafeAreaView style={pageStyle.pageContainer}>
            <StatusBar hidden />
            <Loading isVisible={state.showload} />
            <Text style={[pageTitle,{textAlign:'center', marginTop:20, color:'#0093C4'}]}>Sipas Enterprise</Text>            
            <GetImage source='door' style={[pageStyle.pageImage]}/>            
            <View style={pageStyle.pageContent}>
                { errors.username?.type === 'required' && 
                    <Text style={pageStyle.textDanger}>Username tidak boleh kosong </Text>
                }
                <Input
                    placeholder='Username'
                    leftIcon={
                        <Icon
                        name='mail-outline'
                        size={18}
                        color='#6f6f6f'
                        />
                    }
                    inputStyle={pageStyle.textInput}
                    inputContainerStyle = {pageStyle.inputContainer}
                    containerStyle = {pageStyle.inputOuter}
                    onChangeText = {text=>{setValue('username', text)}}
                    onFocus={()=>{dispatch({type:'showimage'})}}
                    blurOnSubmit = {false}
                    onSubmitEditing={()=>{
                        passwordRef.focus();                    
                    }}
                    returnKeyType="next"
                />
                
                { errors.username?.type === 'required' && 
                    <Text style={pageStyle.textDanger}>Password tidak boleh kosong </Text>
                }
                <Input
                    ref = {(el) => passwordRef = el}
                    placeholder='Password'
                    leftIcon={
                        <Icon
                        name='lock-outline'
                        size={18}
                        color='#6f6f6f'
                        />
                    }
                    rightIcon={
                        <Icon
                            name={state.showpass ? 'eye-slash' : 'eye'}
                            size={18}
                            type='font-awesome'
                            color='#6f6f6f'
                            iconStyle={{marginRight:10}}
                            onPress={()=>{dispatch({type:'showpass'})}}
                        />
                    }
                    inputStyle={pageStyle.textInput}
                    inputContainerStyle = {pageStyle.inputContainer}
                    containerStyle = {pageStyle.inputOuter}
                    onChangeText = {text =>{setValue('password', text)}}
                    onSubmitEditing={()=>{
                        dispatch({type:'showimage'});
                        handleSubmit(onSubmit);                    
                    }}
                    secureTextEntry={!state.showpass}                    
                    returnKeyType = "go"
                />
                                  
                <Button
                    title="MASUK"
                    buttonStyle={pageStyle.btnLogin}
                    onPress={handleSubmit(onSubmit)}
                />     

                <View style={[{paddingLeft:10,paddingRight:10,marginTop:20},pageStyle.rowContent]}>
                    <TouchableOpacity style={{flex:1, flexDirection:'row'}} onPress={()=>toServer()}>
                        <Icon name="gear" type="font-awesome" 
                              size={18}
                              containerStyle={{marginRight:10, justifyContent:'center'}}
                        />
                        <Text>Pengaturan Server</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1, flexDirection:'row-reverse'}} onPress={()=> doLoginScan()}>
                        <Text style={[styles.textInfoOutline,{textAlign:'right'}]}>Masuk via QR</Text>
                        <Icon name="qrcode" type="font-awesome" 
                              iconStyle={[styles.textInfoOutline,{fontSize:18}]}
                              containerStyle={{marginRight:10, justifyContent:'center'}}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}