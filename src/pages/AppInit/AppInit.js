import React from 'react'
import AppInitView from './AppInitView'
import store from 'src/config/store'
import {Router, Server, Version, Token, Language, License, Store, Runtime} from 'src/system'
import to from 'await-to-js';

export default AppInit = () => {
    initRequired();
    return <AppInitView/>
}

const Nav = new Router();

const initRequired = async() => {
    let err,isconnect,islicense,isruntime,islanguage,isauth,isstore,isserver,isversion;
    //init store local
    [err,isstore] = await to(store());
    if(err) console.error('Store : ',err);
    
     //check intro
     let intro = Store().getStore('firstload');
     // Store().setStore('firstload',false);
     if(!intro){
         Nav.RouteReplace('Intro');
         return;
     }  

    // chek server input
    isserver = new Server().getServer();
    console.log('Server : ',isserver);
    if(isserver == null){ Nav.RouteReplace('Server'); return};

    //check Server Connection
    [err,isconnect] = await to(new Server().serverCheck());
    if(err) console.error('Connect : ',err);
    if(isconnect == null || !isconnect){ Nav.RouteReplace('Server'); return};
    if(isconnect) console.log('Connect :',isconnect);
        
    // check support version
    isversion = new Version().checkSupportVersion();
    if(!isversion){ Nav.RouteReplace('Support'); return};

    //check licence
    islicense = new License().checkLicense();
    console.log('License : ',islicense);
    // if(!islicense) return;
    // Store().setStore('firstload',0);

    //check runtime
    isruntime = Runtime().checkRuntime();
    if(!isruntime) Runtime().parseRuntime();
    //check language
    
     
    
    //check auth if true goto dashboard if false goto door
    if(Token().getToken()){
        Nav.RouteReplace('Dashboard');
    }else{
        Nav.RouteReplace('Door');
    }
}