import React, { Component } from 'react'
import styles from 'src/theme'
import pageStyle from './ResponseView.scss'
import {View, Text, TouchableOpacity} from 'react-native'
import { Input, Icon, Avatar, Divider } from 'react-native-elements'
import {Button} from 'src/components'
import {dateParse} from 'src/library'
import {Token} from 'src/system'

const opt = [
    {id:1, pesan:'Siap Laksana'},
    {id:2, pesan:'Siap'},
    {id:3, pesan:'Sesuai'},
    {id:4, pesan:'Terima Kasih'},
    {id:5, pesan:'Baik'}
]

const ResponseView = (props) => {
    const {jenis, data} = props
    if(jenis == 'draf'){
        return <ApprovalItem {...props}/>
    }else{
        return <ResponItem data={data} {...props}/>
    }
}


const ResponItem = (props) => {
    const {data, state, dispatch} = props
    
    return(
    <View style={styles.listTimeLine}>
        <View style={pageStyle.rowContent}>
            <View style={pageStyle.leftColumn}>
                <Avatar
                    rounded
                    source={{
                        uri: Token().getImageProfile(),
                    }}
                    size="medium"
                />                
            </View>
            <View style={pageStyle.rightColumn}>
                <Text style={styles.headTitle}>{data.disposisi_pengirim_nama}</Text>
                <Text>{data.disposisi_pengirim_jabatan_nama}</Text>  
                <Text style={styles.suratSubTitle}>Diterima pada {dateParse(data.disposisi_tgl, 'DD MMM YYYY, h:mm:ss')}</Text>
            </View>
        </View>
        <View style={styles.horizontalSeparator}/>    
        <View style={styles.paddingComponent}>
            <Text>Respon</Text>
            <View>
                <Input 
                    inputStyle={{fontSize:16}}
                    placeholder="Berikan respon ..."                     
                    rightIcon={
                        <Icon
                            name='send'
                            size={18}
                            // type='font-awesome'
                            color='#6f6f6f'
                            iconStyle={{marginRight:5}}
                            onPress={()=>{}}
                        />
                    }
                />
            </View>
            <View style={[styles.rowContent,{paddingLeft:10}]}>
                {
                    state.responseOpt.map(({id,pesan, selected})=>(
                        <TouchableOpacity onPress={()=>dispatch({type:'select', id: id})}>
                            <Text style={[selected ? styles.badgeInfo : styles.badgeDefault,{fontSize:12}]}>{pesan}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </View>
    </View>
    )
}

const ApprovalItem = (props) =>{
    const {data} = props;
    return (
        <View style={[styles.listTimeLine,{display:data.disposisi_masuk_status == 0 ? 'flex' : 'none'}]}>
            <View style={[styles.rowContent,{marginBottom:10}]}>
                <View style={pageStyle.leftColumn}>
                    <Avatar
                        rounded
                        source={{
                            uri: data.pengirim_image_preview,
                        }}
                        size="medium"                    
                    />
                </View>
                <View style={pageStyle.rightColumn}>
                    <Text style={styles.headTitle}>{data.disposisi_masuk_penerima_jabatan_nama}</Text>
                    <Text>{data.disposisi_masuk_penerima_nama}</Text>       
                    <Text style={styles.textInfo}>Diterima pada {dateParse(data.disposisi_masuk_terima_tgl,'DD MMM YYYY, h:mm:ss')}</Text>                           
                </View>
            </View>
            <Divider/>
            <View style={styles.paddingComponent}>
                <Text>Respon</Text>
                <View>
                    <Input 
                        placeholder="Komentar anda ..."                        
                    />
                </View>
                <View style={pageStyle.rowContent}>
                    <View style={styles.column}>                
                        <Button text="Revisi" ui="btnDanger" />
                    </View>
                    <View style={styles.column}>
                        <Button text="Setuju" ui="btnSuccess" />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ResponseView