import React from 'react'
import styles from './TugasView.scss'
import { Text, View,TouchableOpacity, FlatList } from 'react-native'
import {ItemDisposisi} from 'src/components'
import { Image, Button } from 'react-native-elements'
import {Button as Btn} from 'src/components'
import {Router} from 'src/system'
import {doReload} from './Tugas'

const Nav = new Router();

const TugasView = ({data}) => {
    return(
        <View style={styles.pageComponent}>
            {(!data) && <TugasLoading/> }
            {(data == 'error') && <TugasError/>}
            {(data.length == 0) && <TugasDefault/>}
            {(data.length != 0) && (data != 'error') && <TugasList records={data} />}
        </View>
    )
}

const TugasList = ({records}) => {
    let data = records == 'error' ? [] : records;
    return(
        <>
            <View style={styles.titleBar}>
                <Text style={styles.textTitle}>Daftar Tugas</Text>
                <TouchableOpacity onPress={()=>{
                        Nav.RouteTo('Mailbox');
                        console.log('tap');
                    }} 
                    style={{width:200, height:40, alignItems:'flex-end'}}>

                    <Text style={styles.textSubTitle}>Lihat Semua </Text>
                    
                </TouchableOpacity>
            </View>
            <View style={{}}>
                <FlatList
                    keyExtractor ={data.disposisi_masuk_id}
                    data    = {data}
                    renderItem = {({item, index})=>(
                        <ItemDisposisi record={item} />
                    )}
                />
            </View>
            <View>
                <Text style={styles.textNote}>Menampilkan 3 dari 5 tugas</Text>
            </View>
        </>
        
    )
}

const TugasDefault = () => {
    return (
        <View>
            <Image
                source={ require('public/img/worker.png')}
                style={styles.imgContent}
            />
            <Text style={styles.textDesc}>Selamat</Text>
            <Text style={styles.textDesc}>anda tidak memiliki tugas</Text>
            <Button 
                onPress={()=>{Nav.RouteTo('Mailbox')}}
                title="Lihat Semua Surat"
                buttonStyle={styles.btnLihat}
                titleStyle={styles.btnText} />
        </View>
    )
}

const TugasLoading = () =>{
    return(
        <View style={{height:400}}>
            <Text>Loading</Text>
        </View>
    )
}

const TugasError = () =>{
    return(
        <View style={{height:400, padding:30}}>
            <Text style={{textAlign:'center',color:'red', margin:25}}>Terjadi Kesalahan</Text>
            <Btn text="Coba Lagi" rounded={true} ontap={()=>{doReload()}}/>
        </View>
    )
}


export default TugasView
