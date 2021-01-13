import React,{useReducer} from 'react'
import ServerView from './ServerView'
import {getStore} from 'src/system/Store'
import {serverSet,serverCheck} from 'src/system/Server'
import {showMessage, showConfirm, showToast} from 'src/components'
import {Router, Store} from 'src/system'
import RNRestart from 'react-native-restart'

let url, globalState, globalDispatch;

const initialState = {isVisible:false}


const reducer = (state, action) => {
    switch (action.type) {
        case 'toggleLoading':
            return { ...state, isVisible:!state.isVisible}            
        default:
            break;
    }
}

export default Server = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    globalDispatch = dispatch;
    globalState = state;
    let newProps = {...props, state: state, server:getStore('server') }
    return <ServerView {...newProps}/>
}

const checkServer = async() =>{
    globalDispatch({type:'toggleLoading'})
    let isConnect = await serverCheck();    

    if(isConnect){
        // showMessage('Perhatian','Berhasil terhubung dengan server!!');
        showToast({
            title : 'Perhatian',
            text  : 'Berhasil terhubung dengan server!',
            top   : true,
            type  : 'success'
        })

        globalDispatch({type:'toggleLoading'})
    }else{
        // showMessage('Perhatian','Gagal terhubung dengan server!!');
        showToast({
            title : 'Peringatan',
            text  : 'Gagal terhubung dengan server!',
            top   : true,
            type  : 'error'
        })
        globalDispatch({type:'toggleLoading'})
    }
}

const saveServer = () => {
    console.log('do Url :',url);
    if(!url){ 
        // showMessage('Perhatian','Alamat server tidak boleh kosong!!'); 
        showToast({
            title : 'Peringatan',
            text  : 'Alamat server tidak boleh kosong!',
            top   : true,
            type  : 'error'
        })
        return
    };
    showConfirm('Perhatian','Simpan server baru ?',(response)=>{
        globalDispatch({type:'toggleLoading'})
        if(response){
            console.log('Save Server : ',url);
            let result = serverSet(url);
            let notif = result ? 'Save Success' : 'Save Error';
            if(result){
                showMessage('Perhatian','Berhasil mengubah server!!', ()=> { Store().removeStore('token');  RNRestart.Restart() });                
                // new Router().Initialize('AppInit');                
            }

        }
    })
}

const urlServer = (text) => {
    url = text;
}

const goBack = () => {
    new Router().RouteBack();
}

export {checkServer, saveServer, urlServer, goBack}