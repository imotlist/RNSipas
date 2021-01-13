import React, { Component, useReducer} from 'react'
import PegawaiView from './PegawaiView'
import {Connect, Token} from 'src/system'

const initialState = {dataPegawai:[], hasLoad:false, reset: 0}

const reducer = (state, action) => {
    switch (action.type) {
        case 'pegawai':            
        return {...state, dataPegawai:action.data, hasLoad:true}
            break;    
        case 'reset':            
        return {...state, hasLoad:false, reset:state.reset++}
            break;    
        default:
            break;
    }
}

const Pegawai = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const newProps = {...props, parentState:state, parentDispatch: dispatch}
    const {isNew} = props;
    console.log('Status :',state);
    // if(isNew && state.hasLoad) {dispatch({type:'reset'})}
    if(!state.hasLoad) { getPegawai(dispatch) }
    return <PegawaiView {...newProps} />
}

const getPegawai = (dispatch) => {
    Connect({
        url     : 'server.php/sipas/staf/penerima_disposisi_custom/staf',
        method  : 'get',
        param   : {id : Token().getData().profile.staf_id}
    }).then(res =>{
        const {data, response, responseText} = res;
        if(data.success){
            dispatch({type:'pegawai',data:data.data})
        }else{
            dispatch({type:'pegawai',data:[]})
        }
    }).catch(err=> {
        // console.log(err)        
        alert('Terjadi Kesalahan')
    })
}


export default Pegawai