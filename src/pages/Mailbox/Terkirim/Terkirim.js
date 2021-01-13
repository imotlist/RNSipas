import React, { Component, useReducer } from 'react'
import TerkirimView from './TerkirimView'
import {Connect} from 'src/system'

const initialState = {data:[], isLoad:false}

const reducer = (state, action) => {
    switch (action.type) {
        case 'terkirim':
            return {...state, data:action.data, isLoad:true}
        default:
            break;
    }
}

const Terkirim = (props) => {
    props = {};
    const [state, dispatch] = useReducer(reducer, initialState);
    const newProps = {...props, state: state, dispatch: dispatch}
    if(!state.isLoad) getTerkirimData(newProps)
    return <TerkirimView {...newProps}/>
}

const getTerkirimData = (props) => {
    const {dispatch} = props;
    const _sorter   = [
        {property:"disposisi_masuk_ispengingat ",direction:"DESC"},
        {property:"disposisi_masuk_isbaca",direction:"ASC"},
        {property:"disposisi_masuk_isprioritas ",direction:"DESC"},
        {property:"disposisi_masuk_terima_tgl ",direction:"DESC"},
    ];
    
    Connect({
        url : 'server.php/sipas/kotak_masuk/surat_all',
        params: {
            page    : 1,
            start   : 0,
            limit   : 25,
            sort    : _sorter
        }
    }).then(response => {
        const {data, success, request} = response
        if(data.success){
            dispatch({type:'terkirim', data: data.data});
        }
    }).catch(err =>{
        console.log(err)
    })
}


export default Terkirim
