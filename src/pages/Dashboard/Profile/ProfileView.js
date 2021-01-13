import React from 'react'
import styles from './ProfileView.scss'
import { Image, Button, ListItem, Icon, Avatar } from 'react-native-elements'
import { View, Text, ImageBackground, ScrollView, Linking, TouchableOpacity} from 'react-native'
import {Router, Token, Version, Runtime} from 'src/system'
import {logout} from './Profile'
import {showMessage, Loading} from 'src/components'
import {getUniversalImage} from './Profile'
const Nav = new Router();
const callStaf = (mode) => {
    Nav.RouteTo('Pegawai',{mode:mode});
}

const ProfileView = (props) => {
    const {state, dispatch} = props;
    return(
        <ScrollView>
            <Loading isVisible = {state.showload} />            
            <View style={styles.pageContainer}>
                <ImageBackground source={require('public/img/bg-profile.png')} style={styles.bgImage}>
                    <View style={styles.headerContent}>
                        <TouchableOpacity onPress={()=>getUniversalImage()}>
                            <Avatar
                                rounded
                                source={{
                                uri: Token().getImageProfile(),
                                }}
                                size="large"                            
                            />
                        </TouchableOpacity>                        
                        <TouchableOpacity onPress={()=>Nav.RouteTo('Signature')} style={{position:'absolute', top:50, right:130}}>
                                <Icon 
                                    name='create'
                                    size = {18}                                    
                                    iconStyle = {{
                                        color:'white',
                                        borderRadius:50,
                                        borderWidth: 1,
                                        padding : 1,
                                        textAlign:'center',
                                        // paddingLeft: 1,
                                        borderColor: 'white'
                                    }}
                                />
                        </TouchableOpacity>
                        <Text style={styles.textTitle}>{Token().getData().profile.staf_nama}</Text>
                        <Text style={styles.textSub}>{Token().getData().profile.jabatan_nama}</Text>
                        <Text style={styles.textDesc}>{Token().getData().profile.unit_nama}</Text>
                    </View>            
                    <View style={styles.rowButton}>
                        <Button title="Asisten (2)" 
                            onPress={()=>{callStaf('Asisten')}}
                            buttonStyle={styles.buttonMenu} 
                            titleStyle={styles.buttonText}/>
                        <View style={{width:30}}></View>
                        <Button title="Pimpinan (2)" 
                            onPress={()=>{callStaf('Pimpinan')}}
                            buttonStyle={styles.buttonMenu}
                            titleStyle={styles.buttonText}/>
                    </View>
                </ImageBackground>
                <View style={styles.listMenu}>
                    <MenuList/>
                </View>
                <Button title="Keluar" buttonStyle={styles.buttonKeluar} titleStyle={styles.buttonTextKeluar} onPress={()=>logout()}/>

                <Text style={styles.textVersion}>6.00.203000</Text>
            </View>
        </ScrollView>
    )
}

const list = [
    {
      title: 'Pengaturan Server',
      icon: 'cloud-upload',
      page: 'Server',
      doTap : ()=>{Nav.RouteTo('Server')}
    },
    {
      title: 'Upate Aplikasi',
      icon: 'file-download',
      page: 'Server',
      doTap : ()=>{ Version().checkUpdate() }
    },
    {
        title: 'Lapor Error',
        icon: 'warning',
        page: 'Server',
        doTap : ()=>{
            let urlFeed = Runtime().getRuntimeData('urlFeedback');
            if(!urlFeed){
                alert('Link tidak ditemukan');
                return;
            }
            Linking.openURL(urlFeed).catch(err => console.error("Couldn't load page", err));
        }
    },
    {
        title: 'Bantuan',
        icon: 'help',
        page: 'Server',
        doTap : ()=>{ showMessage, Loading('Peringatan', 'Fitur belum tersedia') }
    }    
  ]

const MenuList = () => {
    return(
        <View>
            {
                list.map((item, i) => (
                <ListItem
                    key={i}
                    title={item.title}
                    leftIcon={
                        <Icon
                            name={item.icon}
                            color='#0795c6'                            
                        />
                    }
                    onPress={()=>{item.doTap()}}
                    bottomDivider
                    chevron
                />
                ))
            }
        </View>
    )
}

export default ProfileView