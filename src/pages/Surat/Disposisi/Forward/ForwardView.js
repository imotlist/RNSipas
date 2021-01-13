import React, { Component, useReducer } from 'react'
import { ScrollView, View, Text, TouchableOpacity, TextInput, StatusBar, FlatList } from 'react-native'
import styles from 'src/theme'
import pageStyle from './ForwardView.scss'
import { Icon, Button, Input } from 'react-native-elements'
import {Button as Btn, GetImage, CheckBox} from 'src/components'
import {Router} from 'src/system'
import Pegawai from 'src/pages/Pegawai'
import { Actions } from 'react-native-router-flux'
import { SwipeListView } from 'react-native-swipe-list-view'
import Penerima,{getValue} from './Penerima/Penerima'
import {doForward} from './Forward'

const arahanOpt = [
                    {id:1 , checked : false, text : 'Teruskan'},
                    {id:2 , checked : false, text : 'Laksanakan'},
                    {id:3 , checked : false, text : 'Terima Kasih'},
                    {id:4 , checked : false, text : 'Jangan'}
                  ]

const initState = { jenis : 'disposisi', 
                    arahan : arahanOpt, 
                    rahasia: false,
                    loadPenerima : true
                }
let pesanText = '';

const reducer = (state, action) => {
    switch (action.type) {
        case 'disposisi':
            return { ...state, jenis:'disposisi'};        
        case 'notadinas':
            return { ...state, jenis:'notadinas'};
        case 'teruskan':
            return { ...state, jenis:'teruskan'};
        case 'arahan' :
            let tempArahan = state.arahan;
            tempArahan.map((item,index)=>{
                if(item.id == action.id ){                   
                    tempArahan[index].checked = !item.checked;
                }
            })
            return {...state, arahan : tempArahan }
        case 'rahasia' :
            return {...state, rahasia : !state.rahasia}
        case 'pegawai' :
            return {...state, loadPenerima: !state.loadPenerima}
      default:
        throw new Error();
    }
}

const handlePesan = (text) => {
    pesanText = text;
}

const doAddPegawai = (state, dispatch) => {
    Actions.push('Pegawai',{isNew:true,isPenerima:state.loadPenerima})    
}

const doGetDataPenerima = (state, record) => {
   let listPenerima = getValue().dataPenerima,
       strList = '',
       props = {};
    
    props.state = state;
    props.penerima = listPenerima;
    props.record = record;
    props.pesan = pesanText;
    doForward(props);
    // listPenerima.map(item=>{
    //     strList+= item.staf_nama+', '
    // })
    // console.log(listPenerima)
    // console.log(strList)
    // if(listPenerima.length < 0) return;

    // alert("Kirim disposisi kepada : "+strList);

}

const ForwardView = (props) => {   
    
    // penerimaStore = [...penerimaStore, ...penerima];
    // penerimaStore = penerima;
    const [state, dispatch] = useReducer(reducer, initState);
    const {record, mode} = props;
    const isPenerima = props.isPenerima;          
    if(isPenerima == state.loadPenerima) {dispatch({type:'pegawai'})}
    const penerima = props.penerima || [];
    // if(state.loadPenerima){ dispatch({type:'pegawai',status:false})}
    return(
        <ScrollView style={[styles.bgGrey200]} scrollEnabled={!state.showPegawai}>
            <StatusBar hidden />            
            <View style={styles.forwardHead}>
                <View style={styles.navTitle}>
                    <TouchableOpacity onPress={()=>{Router().RouteBack()}}>
                        <Icon name='angle-left' type='font-awesome' style={{paddingRight:10}} color='white'/>
                    </TouchableOpacity>
                    <Text style={[styles.headTitle,{color:'white'}]}>Kirim Disposisi</Text>
                </View>                     
            </View>
            <View style={pageStyle.headerPane}>
                <Text numberOfLines={1} style={[styles.textTitle,{fontWeight:'bold'}]}>{record.surat_perihal}</Text>
                <Text style={styles.textInfo}>{record.disposisi_pengirim_unit_nama}</Text>   
            </View>

            <View style={pageStyle.pane}>
                <View style={styles.rowContent}>                    
                    <View style={state.jenis == 'disposisi' ? styles.columnHighLight : styles.columnBlock} 
                        onTouchStart={()=>{ dispatch({type:'disposisi'})}}>
                        <GetImage source='mail-1' style={pageStyle.iconJenis}/>
                        <Text>Disposisi</Text>
                    </View>                
                
                    <View style={state.jenis == 'notadinas' ? styles.columnHighLight : styles.columnBlock}
                        onTouchStart={()=>{ dispatch({type:'notadinas'})}}>
                        <GetImage source='mail-2' style={pageStyle.iconJenis}/>
                        <Text>Nota Dinas</Text>
                    </View>                
                
                    <View style={state.jenis == 'teruskan' ? styles.columnHighLight : styles.columnBlock}
                        onTouchStart={()=>{ dispatch({type:'teruskan'})}}>
                        <GetImage source='mail-3' style={pageStyle.iconJenis}/>
                        <Text>Teruskan</Text>
                    </View>
                    
                </View>
                <View style={{padding:5,paddingTop:10}}>
                    <Text style={styles.textTitle}>Arahan</Text>
                    {
                        state.arahan.map((item)=>{
                            return (<CheckBox text={item.text} check={item.checked} onTap={()=>{dispatch({type:'arahan',id:item.id})}} />)
                        })
                    }                   
                                        
                    <TextInput
                        style={[styles.textAreaContainer,{textAlignVertical : "top"}]}
                        multiline={true}
                        placeholder="Uraian ..."          
                        onChangeText = {(text) => handlePesan(text)}
                    />

                    <View style={styles.rowContentReverse}>                    
                        <CheckBox iconRight={true} 
                                  check={state.rahasia}
                                  text="Rahasiakan perintah dan pesan" 
                                  textStyle={state.rahasia ? {color:'red'} : {}}
                                  onTap={()=>dispatch({type:'rahasia'})} />
                    </View>
                </View>
            </View>
            <View style={[pageStyle.pane,{paddingLeft:15}]}>             
                <View style={styles.rowContent}>
                    <Text style={styles.textTitle}>Kepada</Text>
                    <View style={[styles.column,{alignItems:'flex-end',paddingRight:10}]}>
                        <TouchableOpacity onPress={()=>doAddPegawai(state, dispatch)}>
                            <Icon name="add"/>
                        </TouchableOpacity>         
                    </View>                                    
                </View>
                <Penerima records={penerima} mode={mode} isNew={state.loadPenerima} />
                {/* <View>
                    <SwipeListView
                        data={penerimaStore}
                        renderItem={ (data, rowMap) => (
                            <>
                                <View style={[styles.rowContent, {backgroundColor:'white'}]}>
                                    <View>
                                        <GetImage style={styles.iconProfile} source="init-page"/>
                                    </View>
                                    <View style={styles.column}>
                                        <Text style={styles.textTitle}>{data.item.name}</Text>
                                        <Text style={styles.textInfo}>Sipas</Text>
                                        <Text style={styles.textInfo}>Mobile</Text>
                                    </View>
                                </View>
                            </>
                        )}
                        renderHiddenItem={ (data, rowMap) => (
                            <TouchableOpacity onPress={()=>{alert('Do Delete')}}>
                                <View style={{backgroundColor:'red',height:60, justifyContent:'center'}}>
                                    <Text style={{color:'white',paddingLeft:10}}>Delete</Text>                            
                                </View>
                            </TouchableOpacity>
                        )}
                        leftOpenValue={75}
                        // rightOpenValue={-75}
                    />                    
                </View>    */}
            </View>
            <View style={[pageStyle.pane,{paddingLeft:15,height:100}]}>
                <Btn text="Kirim" ui="btnInfo" ontap={()=>doGetDataPenerima(state, record)}/>
                <Text style={styles.textInfo}>* Pastikan perintah dan penerima sudah sesuai</Text>
            </View>
            
        </ScrollView>
    )
}

const LeftActions = () => {
    return(
        <View>
            <Text>Delete</Text>
        </View>
    )
}

export default ForwardView