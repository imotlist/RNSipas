import React, {useReducer} from 'react'
import DoorView from './DoorView'
import {Router, Authenticator,Token, ErrorHandler } from 'src/system'
import { showToast} from 'src/components'


const initialState = {usericon:false,passicon:false,showpass:false,showimage:true, showload : false}

const reducer = (state, action) => {
    switch (action.type) {
        case 'usericon':
            return {...state, usericon : !state.usericon}            
        case 'passicon':
            return {...state, passicon : !state.passicon}            
        case 'showpass':
            return {...state, showpass : !state.showpass}            
        case 'showimage':
            return {...state, showimage : !state.showimage}            
        case 'toggleloading':
            return {...state, showload: !state.showload}
        default:
            throw new Error();
    }
}

let globalDispatch, globalState;

const Door = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    globalDispatch  = dispatch;
    globalState     = state;

    const newProps = {...props, state:state, dispatch:dispatch}
    return <DoorView {...newProps}/>
}

const doLogin = (data) => {
    globalDispatch({type:'toggleloading'})
    Authenticator().doAuth(data)
    .then(response =>{
        let {data, status, responseText} = response;
        if(data.success){
            Token().setToken(data.token);
            new Router().RouteReplace('Dashboard');
        }else{
            console.log('gagal');
            showToast({
                title : 'Gagal',
                text  : data.message,
                type  : 'error',
                top   : true
            })
        }
        globalDispatch({type:'toggleloading'})
    })
    .catch(err=>{
        // console.log('Error : ',err)
        ErrorHandler(err);
        globalDispatch({type:'toggleloading'})
    })
    // new Router().RouteReplace('Dashboard');
}

const doLoginScan = () => {
    Router().RouteTo('Scanner',{tipe:'login'})
}

const toServer = () => {
    new Router().RouteTo('Server');
}

export {doLogin,toServer, doLoginScan}

export default Door