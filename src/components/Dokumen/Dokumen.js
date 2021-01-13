import React, { Component, useReducer } from 'react'
import DokumenView from './DokumenView'
import {Connect} from 'src/system'

const initialState = {dokumenData:false}

const reducer = (state, action) => {
    switch (action.type) {
        case 'dokumen':
            return { dokumenData: action.data}            
        default:
            break;
    }
}

const Dokumen = ({record}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    let params = {record:record, state:state, dispatch:dispatch};
    if(!state.dokumenData){
        getDocument(params);
    }
    return <DokumenView record={state.dokumenData}/>
}

const getDocument = ({record, state, dispatch}) => {

    let _dokumenFilter = [
                            {property:"dokumen_arsip",value:record.surat_arsip}
                        ];
        
    Connect({
        url     : 'server.php/sipas/dokumen/read',
        method  : 'get',
        params  : { 
            page :1 , 
            start : 0, 
            limit :100, 
            filter: _dokumenFilter
        }
    }).then(response => {
        const {data, status, config} = response;
        if(data.success){
            // console.log(data);
            dispatch({type:'dokumen', data:data.data})
        }
    }).catch(err =>{
        console.log(err)
    })
}

export default Dokumen