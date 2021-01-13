import React from 'react'
import pageStyle from './DashboardView.scss'
import styles from  'src/theme'
import { View, Text, TouchableOpacity, StatusBar } from 'react-native'
import {Tabs, Tab, Icon, Badge, Avatar} from 'react-native-elements'
import Home from './Home'
import Notification from './Notification'
import Profile from './Profile'
import { GetImage } from 'src/components'
import {Router, Token} from 'src/system'

const DashboardView = (props) => {
    const {dispatch,state} = props;
    return(
        <View style={pageStyle.pageContainer}>    
            <StatusBar hidden />
            {state.active == 'dashboard' && <Home {...props}/>}        
            {state.active == 'notifikasi' && <Notification/>}        
            {state.active == 'profile' && <Profile/>}        
            {state.active == 'dashboard' &&
                <View style={{position:'absolute', bottom:75,right:10, flexDirection:'row'}}>
                    {
                        state.dataWakil.map(item=> (
                            <View style={{marginRight:5}}>
                                <TouchableOpacity onPress={()=>Router().RouteTo('MailboxWakil')}>
                                <Avatar
                                    rounded
                                    source={{
                                    uri: item.staf_image_preview,
                                    }}
                                    size="medium"
                                />
                                <Badge
                                    value = {2}
                                    status="error"
                                    containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                                />
                                </TouchableOpacity>
                            </View>
                        ))
                    }                    
                </View>
            }
            <View style={pageStyle.pageFooter}>
                <TouchableOpacity style={pageStyle.pageMenu} onPress={()=>dispatch({type:'dashboard'})}>
                    <Icon name='home' type='antdesign' iconStyle={pageStyle.iconMenu} />
                    <Text style={pageStyle.textMenu}>Beranda</Text>
                </TouchableOpacity>
                <TouchableOpacity style={pageStyle.pageMenu} onPress={()=>dispatch({type:'notifikasi'})}>
                    <Icon name='notifications-none' type='material' iconStyle={pageStyle.iconMenu}/>
                    <Text style={pageStyle.textMenu}>Notifikasi</Text>
                </TouchableOpacity>
                <TouchableOpacity style={pageStyle.pageMenu} onPress={()=>dispatch({type:'profile'})}>
                    <Icon name='user-circle-o' type='font-awesome' iconStyle={pageStyle.iconMenu} />
                    <Text style={pageStyle.textMenu}>Saya</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DashboardView