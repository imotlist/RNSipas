import React, { Component, useReducer } from 'react'
import {StatusBar, Text, View, FlatList, TouchableOpacity} from 'react-native'
import { Actions } from 'react-native-router-flux';
import { SwipeablePanel } from 'rn-swipeable-panel';
import pageStyle from './PegawaiView.scss'
import styles from 'src/theme'
import {GetImage, Button} from 'src/components'
import Setting from './Setting/Setting'
import { Icon, Overlay, Avatar, Input } from 'react-native-elements';

const swipeProps = {    
    isActive            : true,
    fullWidth           : true,
    openLarge           : true,
    // showCloseButton     : true,
    closeOnTouchOutside : false,
    onlyLarge           : true,
    barStyle            : {width:100},
    style               : {position:'absolute'},
    onClose             : ()=>{ 
        // Promise.resolve(Actions.pop()).then(() => { Actions.refresh({data:'databaru'}); });
        Actions.pop();
    }    
}

const LeftActions = () => {
    return(
        <View>
            <Text>Delete</Text>
        </View>
    )
}

const doSetPenerima = (penerima, isPenerima) =>{
    if(penerima.length < 1) return;
    Promise.resolve(Actions.pop()).then(() => { Actions.refresh({penerima:penerima, mode:'add', isPenerima:isPenerima}); });
}

const initialState = {selected:[], isNew:true, showOverlay:false, overlayData:{}}

const reducer = (state, action) => {
    switch (action.type) {
        case 'add':   
            let selected = state.selected,
                find = false;
                selected.map((item,index) =>{
                if(item.staf_id == action.data.staf_id){
                    find = true;
                }
            })
            if(!find)state.selected.push(action.data);
            return {...state}
        break;
        case 'remove':            
            let data = state.selected;            
            data.map((item,index) =>{
                if(item.staf_id == action.staf_id){
                    data.splice(index,1);
                }
            })            
            return {...state}
        break;
        case 'clear':
            return {...state, selected:[], isNew:false}
        case 'overlay':
            let useData = action.data ? action.data : {}
            return {...state,showOverlay:!state.showOverlay, overlayData:useData}
        default:
            break;
    }
}

const profileDumb = [
    {id:1 , name:'Afinda Lutfi', email:'lutfi@mail.com'},
    {id:2 , name:'Renai Azmi', email:'Renai@mail.com'},
]

const listDumb = [
    {key:1, id:1 , name:'Afinda Lutfi', email:'lutfi@mail.com'},
    {key:2, id:2 , name:'Renai Azmi', email:'Renai@mail.com'},
    {key:3, id:3 , name:'Firno', email:'Afirnoza@mail.com'},
    {key:4, id:4 , name:'Zilbis', email:'Silbiz@mail.com'},
    {key:5, id:5 , name:'Fiman', email:'Afirnoza@mail.com'},
    {key:6, id:6 , name:'Cocho', email:'Silbiz@mail.com'},
    {key:7, id:7 , name:'Maskin', email:'Afirnoza@mail.com'}
]

const PegawaiView = (props) => {
        const [state, dispatch] = useReducer(reducer, initialState);
        const {isNew, isPenerima, mode, parentState, parentDispatch} = props;
        const useMode = mode || 'Penerima';
        const newProps = {...props, state:state, dispatch:dispatch};
        if(isNew && state.isNew){
            dispatch({type:'clear'});
        }
        return(        
            <SwipeablePanel {...swipeProps}>
                { useMode == 'Penerima' && <RenderPenerima {...newProps} />}
                { (useMode == 'Asisten' || useMode == 'Pimpinan') && <RenderAsisten {...newProps} />}
                <View style={styles.horizontalSeparator}/>
                <View style={{marginTop:10, marginBottom:10}}>
                    <Input
                        placeholder='Cari pegawai ...'
                        leftIcon={
                                <Icon
                                    name='search'
                                    type="font-awesome"                                
                                    iconStyle={[styles.textDefaultOutline,{fontSize:18}]}
                                />
                        }                    
                        // onChangeText={(text)=>urlServer(text)}
                        inputStyle={pageStyle.textInput}
                        inputContainerStyle = {pageStyle.inputContainer}
                        containerStyle = {pageStyle.inputOuter}
                    />
                </View>
                <View style={{padding:15, paddingTop:5}}>                   
                    <FlatList
                        data={parentState.dataPegawai}                        
                        renderItem={({ item }) => (               
                                <>
                                    <View style={styles.rowContent}>
                                        <View>
                                        <Avatar
                                            rounded
                                            source={{
                                                uri: item.staf_image_preview,
                                            }}
                                            size="medium"
                                            containerStyle={{marginTop:8}}
                                        />
                                        </View>
                                        <View style={styles.column}>
                                            <Text style={styles.textTitle}>{item.staf_nama}</Text>
                                            <Text style={styles.textInfo}>{item.jabatan_nama}</Text>
                                            <Text style={styles.textInfo}>Mobile</Text>
                                        </View>
                                        <View style={{justifyContent:'center'}}>
                                            <Button text='+ Pilih'
                                                    ui='btnSuccess'
                                                    // iconName='add'
                                                    textStyle={{fontSize:10}}
                                                    rounded="full"
                                                    btnStyle={{height:30}}
                                                    iconRight={false}
                                                    ontap = {()=>{dispatch({type:'add',data:item})}}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.horizontalSeparator}/>
                                </>
                            )}
                        keyExtractor={(item) =>  item.staf_id || item.id}
                    /> 
                </View>
            </SwipeablePanel>        
    )
}

const RenderPenerima = ({state, dispatch, isPenerima}) => {
    return(
        <View style={{padding:20, paddingTop:5}} >
            <Text style={styles.headTitle}>Daftar Penerima</Text>
            <FlatList
                style={{height:70}}
                data={state.selected}
                horizontal={true}
                renderItem={({ item }) => (               
                        <TouchableOpacity onPress={()=>dispatch({type:'remove', id: item.staf_id})}>
                            <Avatar
                                rounded
                                source={{
                                    uri: item.staf_image_preview,
                                }}
                                size="medium"
                                containerStyle={{margin:5}}
                            />
                        </TouchableOpacity>
                    )}
                keyExtractor={(item) =>  item.staf_id}
            /> 
            <View style={{height:10}}/>
            <Button  text="Tambah Penerima" ui='btnInfo' rounded={true} ontap={()=>doSetPenerima(state.selected, isPenerima)}/>
        </View>
    )
}

const doToggleSetting = (dispatch, data) => {
    // console.log('doOverlay');
    dispatch({type:'overlay', data:data});
}


const RenderAsisten = ({state, dispatch, isPenerima, mode}) => {
    return(
        <View style={{padding:20, paddingTop:5, paddingBottom:5}} >
            <Text style={styles.headTitle}>Tambah {mode}</Text>
            <Overlay 
                overlayStyle={{bottom:0, position:'absolute'}}
                isVisible={state.showOverlay}
                onBackdropPress={()=>{doToggleSetting(dispatch)}}>
                <Setting {...state}/>
            </Overlay>
            <FlatList                
                data={state.selected}
                renderItem={({ item, index }) => (               
                    <View style={styles.rowContent}>
                        <View style={{justifyContent:'center'}}>
                            <Avatar
                                rounded
                                source={{
                                    uri: item.staf_image_preview,
                                }}
                                size="medium"                                
                                containerStyle={{marginTop:8}}
                            />
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.textTitle}>{item.staf_nama}</Text>
                            <Text style={styles.textInfo}>{item.jabatan_nama}</Text>
                            <Text style={styles.textInfo}>{item.unit_nama}</Text>
                        </View>
                        <TouchableOpacity onPress={()=>{doToggleSetting(dispatch, item)}} style={{justifyContent:'center'}}>
                            <View style={{width:50,height:50}}>                            
                                <Icon name="angle-right" type="font-awesome"/>                            
                            </View>
                        </TouchableOpacity>
                    </View>
                    )}
                keyExtractor={(item) =>  item.staf_id}
            /> 
            <View style={{height:30}}/>            
        </View>
    )
}

export default PegawaiView