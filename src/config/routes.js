import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {StackViewStyleInterpolator} from 'react-navigation-stack';
import {
    Scene,
    Router,
    Actions,
    ActionConst,
    Overlay,
    Tabs,
    Modal,
    Drawer,
    Stack,
    Lightbox,
} from 'react-native-router-flux';

//import component
import AppInit from 'src/pages/AppInit'
import Catcher from 'src/pages/Catcher'
import Door from 'src/pages/Door'
import Dashboard from 'src/pages/Dashboard'
import Forward from 'src/pages/Surat/Disposisi/Forward'
import Intro from 'src/pages/Intro'
import Mailbox from 'src/pages/Mailbox'
import MailboxWakil from 'src/pages/MailboxWakil'
import Pegawai from 'src/pages/Pegawai'
import Riwayat from 'src/pages/Surat/Disposisi/Riwayat'
import Server from 'src/pages/Server'
import Support from 'src/pages/Support'
import Surat from 'src/pages/Surat'

//component
import Scanner from 'src/components/Scanner'
import {Camera} from 'src/components'
import Signature from 'src/components/Signature'

const Stacks = createStackNavigator();

const opt = {
    headerShown: false,
    headerMode: 'none'
}

const RoutesBu = () => {
    return(
        <NavigationContainer>
            <Stacks.Navigator>
                
                <Stacks.Screen name="AppInit" component={AppInit} options={opt}/>
                <Stacks.Screen name="Door" component={Door} options={opt}/>
                <Stacks.Screen name="Server" component={Server} options={opt}/>

                <Stacks.Screen name="Dashboard" component={Dashboard} options={opt}/>
                <Stacks.Screen name="Support" component={Support} options={opt}/>
                <Stacks.Screen name="Mailbox" component={Mailbox} options={opt}/>
            </Stacks.Navigator>
        </NavigationContainer>
    )
}

const transitionConfig = () => ({
    screenInterpolator: StackViewStyleInterpolator.forFadeFromBottomAndroid,
});

const Routes = () => {     
    return(
        <Router>            
            <Overlay key="overlay">
                <Modal key="modal" hideNavBar transitionConfig={transitionConfig}>
                    <Lightbox key="lightbox">
                        <Stack key="root" hideNavBar={true}>
                            <Scene key="AppInit" component={AppInit} title="AppInit"/>                          
                            <Scene key="Intro" component={Intro} title="Intro"/>
                            <Scene key="Door" component={Door} title="Door"/>
                            <Scene key="Server" component={Server} title="Server"/>
                            <Scene key="Dashboard" component={Dashboard} title="Dashboard"/>
                            <Scene key="Support" component={Support} title="Support"/>
                            <Scene key="Mailbox" component={Mailbox} title="Mailbox"/>
                            <Scene key="MailboxWakil" component={MailboxWakil} title="MailboxWakil"/>
                            <Scene key="Surat" component={Surat} title="Surat"/>
                            <Scene key="Forward" component={Forward} title="Forward"/>
                            <Scene key="Camera" component={Camera} title="Camera"/>
                            <Scene key="Signature" component={Signature} title="Signature"/>
                            <Scene key="Riwayat" component={Riwayat} title="Riwayat"/>
                        </Stack>
                        {/* <Scene key="demo_lightbox" component={DemoLightbox} /> */}                        
                        <Scene key="Scanner" component={Scanner} title="Scanner"/>
                        <Scene key="Pegawai" component={Pegawai} title="Pegawai"/>
                        
                    </Lightbox>
                </Modal>
            </Overlay>            
        </Router>
    )
}

export default Routes
