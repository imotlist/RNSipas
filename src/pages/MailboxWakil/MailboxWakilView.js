import React from 'react'
import {View, ScrollView, TouchableOpacity, StatusBar, FlatList} from 'react-native'
import {ItemDisposisi, GetImage, showMessage} from 'src/components'
import styles from 'src/theme'
import pageStyle from './MailboxWakilView.scss'
import { Text,SearchBar, Icon, Avatar, Badge, Divider } from 'react-native-elements'
import {Router} from 'src/system'

const MailboxWakilView = (props) => {
    return(
        <View>
            <StatusBar hidden />            
            <View style={[styles.navTitle,styles.detailHeadDisposisi]}>
                <TouchableOpacity onPress={()=>{Router().RouteBack()}}>
                    <Icon name='angle-left' type='font-awesome' style={{paddingRight:10}}/>
                </TouchableOpacity>
                <Text style={styles.headTitle}>Asistensi</Text>
            </View>
            <View style={[styles.detailHeadDisposisi,{height:220, paddingLeft:0}]}> 
                <StafWakil {...props}/>
                <Menu />
            </View>
            <View style={[styles.rowContent,{height:70}]}>
                <View style={[styles.column,{justifyContent:'center', paddingLeft:10}]}>
                    <Text style={styles.headTitle}>Selesaikan tugas anda</Text>
                </View>
                <View style={{justifyContent:'center'}}>
                    <TouchableOpacity onPress={()=>{ showMessage('Peringatan','Fitur belum tersedia') }} >
                        <Text style={styles.linkText}>Lihat Semua </Text>                    
                    </TouchableOpacity>
                </View>        
            </View>       
            <ScrollView style={styles.listView}>
                <NotifList />
            </ScrollView>
        </View>
    )
}

const list = [1,2,3,4,5,6]


const StafWakil = ({state, dispatch}) => {
    // console.log('State : ',state)
    let dataWakil = state.dataWakil;
        dataWakil.map((item, index) =>{
            if(item.selected && index != 0){
                [dataWakil[0], dataWakil[index]] = [dataWakil[index], dataWakil[0]]
            }
        })

    let useData = state.expand ? dataWakil : [dataWakil[0]];    
    

    let useStyle = {
        position:'absolute',
        top:0,
        zIndex: 3,
        elevation: 5
    }
    if(dataWakil.length < 1) useData = [{staf_nama:'(Tidak ada staf)', jabatan_nama:'-', unit_nama:'-', staf_image_preview:'https://i.pravatar.cc/202'}]
        
    return(
        <View style={[useStyle,{backgroundColor:'white',padding:10, width:'95%',borderRadius:5,alignSelf:'center'}]}>   
            <TouchableOpacity onPress={()=>{dispatch({type:'expand'})}} style={{justifyContent:'center', position:'absolute', right:10, top:20, zIndex:2}}>   
                <Icon name={state.expand ?'chevron-circle-down':'chevron-circle-right'} type='font-awesome' color='grey'/>             
            </TouchableOpacity>  
            <FlatList                                
                data={useData}                        
                style={state.expand ? {height:120} : {}}
                renderItem={({ item, index }) => (              
                    <TouchableOpacity onPress={()=>dispatch({type:'select', id:item.staf_id})}>
                        <View style={[styles.rowContent]}>
                            <View style={{justifyContent:'center'}}>
                                <Avatar
                                    rounded
                                    source={{
                                        uri: item.staf_image_preview,
                                    }}
                                    size="medium"
                                    containerStyle={item.selected ? {borderWidth:1, borderColor:'green'} : {}}
                                />
                            </View>
                            <View style={[styles.column, {paddingLeft:20, paddingTop:0}]}>
                                <Text style={styles.textTitle}>{item.staf_nama}</Text>
                                <Text style={styles.textInfo}>{item.jabatan_nama}</Text>
                                <Text style={styles.textInfo}>{item.unit_nama}</Text>
                            </View>                        
                        </View> 
                    </TouchableOpacity>
                    )}
                keyExtractor={(item) =>  item.staf_id}
            />               
        </View>   
    )
}

const Menu = () => {
    return(
        <View style={[{backgroundColor:'white',padding:10, marginTop:85, width:'95%', height:120,borderRadius:5,alignSelf:'center'}]}>  
            <View style={{ height:55}}>
                <SearchBar
                    placeholder="Cari Pesan atau Disposisi..." 
                    inputStyle={[styles.inputSearch]}
                    inputContainerStyle={[styles.inputContainerSearch,{height:40}]}
                    containerStyle={[styles.containerSearch,{height:40,padding:0}]}                
                />
            </View>
            <View style={[styles.rowContent]}>
                <View style={styles.column}>
                    <Icon name="create" />
                    <Text style={[styles.textInfo,{textAlign:'center'}]}>Koreksi</Text>                
                    <Badge
                        value = {3}
                        status="error"
                        containerStyle={{ position: 'absolute', top: -4, right: 15 }}
                    />
                </View>
                <View style={styles.column}>
                    <Icon name="mail"/>
                    <Text style={[styles.textInfo,{textAlign:'center'}]}>Masuk</Text>
                </View>
                <View style={styles.column}>
                    <Icon name="send"/>
                    <Text style={[styles.textInfo,{textAlign:'center'}]}>Terkirim</Text>
                    <Badge
                        value = {1}
                        status="error"
                        containerStyle={{ position: 'absolute', top: -4, right: 15 }}
                    />
                </View>
                <View style={styles.column}>
                    <Icon name="notifications"/>
                    <Text style={[styles.textInfo,{textAlign:'center'}]}>Notifikasi</Text>
                    <Badge
                        value = {5}
                        status="error"
                        containerStyle={{ position: 'absolute', top: -4, right: 15 }}
                    />
                </View>
            </View>

        </View>
    )
}

const NotifList = () => {
    return(
        <View style={{marginBottom:150}}>
            {/* {
                list.map((item, index) => (
                    <ItemDisposisi record={item}/>
                ))
            } */}
        </View>
    )
}

export default MailboxWakilView