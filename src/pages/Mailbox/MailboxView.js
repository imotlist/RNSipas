import React, { Component, useState } from 'react'
import { View, Text,StatusBar,Dimensions, TouchableOpacity } from 'react-native'
import {Image, SearchBar, Button, Icon} from 'react-native-elements'
import { TabViewAnimated, TabBar,TabView, SceneMap } from 'react-native-tab-view';
import styles from 'src/theme'
import pageStyle from './MailboxView.scss'
import { Actions } from 'react-native-router-flux';

import Tugas from './Tugas'
import Terkirim from './Terkirim'

const TugasRoute = () => <Tugas/>

const MasukRoute = () => <Tugas />

const TerkirimRoute = () => <Terkirim />

const KoreksiRoute = () => <Terkirim />

const MailboxView = () => {

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: '1', title: 'Tugas' },
        { key: '2', title: 'Masuk' },
        { key: '3', title: 'Terkirim' },
        { key: '4', title: 'Draf' },
    ]);

    const renderScene = SceneMap({
        1 : TugasRoute,
        2 : MasukRoute,
        3 : TerkirimRoute,
        4 : KoreksiRoute
    });

    const getBadge = (input,  type) => {
        if(input <= 0 || !input) return <></>
        return(
            <View style= {[styles.badge, {backgroundColor:'white', marginTop:8}]}>
                <Text style={{ color:'blue', fontSize:10}}>
                    {input}
                </Text>
            </View>
        )
    }

    const renderBadgeBar = SceneMap({
        1: ()=>getBadge(24),
        2: ()=>getBadge(2),
        3: ()=>getBadge(0),
        4: ()=>getBadge(0),
    })

    return (
        <View style={[styles.fullPageContainer]}>
            <StatusBar hidden />
            <View style={styles.mailboxHeader}>
                <View style={styles.rowContent}>
                    <TouchableOpacity onPress={()=>Actions.pop()} style={{justifyContent:'center', alignItems:'center',paddingLeft:10}}>
                        <Icon name='angle-left' type='font-awesome' color='white'/>
                    </TouchableOpacity>
                    <Text style={[styles.headTitleLight,{margin:10}]}>Daftar surat saya</Text>
                </View>
                <SearchBar
                    placeholder="Cari surat anda..." 
                    inputStyle={pageStyle.inputSearch}
                    inputContainerStyle={pageStyle.inputContainerSearch}
                    containerStyle={pageStyle.containerSearch}                
                />         
            </View>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={props => 
                    <TabBar {...props} style={styles.tabBar} 
                            tabStyle={styles.tabItem}
                            indicatorStyle={styles.tabIndicator}
                            renderBadge ={renderBadgeBar}
                    />
                }
                initialLayout={{ width: Dimensions.get('window').width }}
            />            
        </View>
    )
}

export default MailboxView