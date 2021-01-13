import React from 'react'

import pageStyle from './HomeView.scss'
import styles from 'src/theme'
import { View ,Text, Dimensions, ScrollView, TouchableOpacity} from 'react-native'
import {Image, SearchBar, Button, Input, Icon} from 'react-native-elements'
import Tugas from './Tugas'
import Tutorial from './Tutorial'
import {Avatar} from 'react-native-elements'
import {showMessage} from 'src/components'
import {Token} from 'src/system'

const HomeView = (props) => {
    const {height, width} = Dimensions.get('window');
    // console.log('Y : ',height)
    const {dispatch}  = props;
    return(
        <ScrollView style={{height:'100%'}}>
        <View style={{height:1550}}>
            <View style={pageStyle.bgHeader}/>
            <View style={pageStyle.contentHeader}>
                <TouchableOpacity onPress={()=>dispatch({type:'profile'})}>
                    <Avatar
                        rounded
                        source={{
                        uri: Token().getImageProfile(),
                        }}
                        size="medium"
                        containerStyle={{margin:5}}
                    />
                </TouchableOpacity>
                <View>
                    <Text style={pageStyle.textProfile}>{Token().getData().profile.staf_nama}</Text>
                    <Text style={pageStyle.subtextProfile}>{Token().getData().profile.jabatan_nama}</Text>
                </View>               
            </View>
            {/* <SearchBar
                placeholder="Cari surat anda..." 
                inputStyle={pageStyle.inputSearch}
                inputContainerStyle={pageStyle.inputContainerSearch}
                containerStyle={pageStyle.containerSearch}                
            /> */}
            <Input
                    placeholder='Cari surat anda ...'
                    leftIcon={
                        <TouchableOpacity onPress={()=>Actions.push('Scanner',{tipe:'server'}) }>
                            <Icon
                                name='search'
                                type="font-awesome"                                
                                iconStyle={[styles.textInfoOutline,{fontSize:18}]}
                            />
                        </TouchableOpacity>
                    }                    

                    rightIcon={
                        <TouchableOpacity onPress={()=>saveServer()}>
                            {/* <Icon
                            name='save'
                            size={18}
                            color='#6f6f6f'
                            /> */}
                        </TouchableOpacity>
                    }
                    // onChangeText={(text)=>urlServer(text)}
                    inputStyle={[pageStyle.inputSearch,{borderRadius:50}]}
                    inputContainerStyle = {pageStyle.inputContainerSearch}
                    containerStyle = {pageStyle.containerSearch}
                />
            <Tugas/>
            <View style={pageStyle.separator}/>

            <Tutorial/>
            <View style={pageStyle.separator}/>

            <View style={pageStyle.sendBox}>
                <View>
                    <Text style={pageStyle.textTitle}>Anda Masih Bingung?</Text>
                    <Text style={pageStyle.textSub}>Yuk jangan malu-malu, kirim pesan dengan menekan tombol dibawah ini</Text>
                    <Button buttonStyle={[pageStyle.btnPesan,styles.square]}
                            onPress={()=>{ showMessage('Peringatan','Fitur belum tersedia')}}
                            containerStyle = {styles.square}
                            title="Tulis Pesan" titleStyle={{textTransform:'uppercase'}}/>
                    
                </View>
            </View>
            <View style={pageStyle.footer}>
                <Text style={pageStyle.textVersion}>Sipas 6.00.20000</Text>
            </View>
        </View>
        </ScrollView>
    )
}

export default HomeView
