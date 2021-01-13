import React, { Component, useReducer } from 'react'
import TimeLineView from './TimeLineView'
import {Connect} from 'src/system'

const initialState = {loadUrutanDisposisi:false,dataUrutanDisposisi:[], loadUrutanPenyetuju:false, dataUrutanPenyetuju:[]}

const reducer = (state, action) => {
    switch (action.type) {
        case 'disposisi':            
                action.data.shift();                
                return {...state, dataUrutanDisposisi:action.data, loadUrutanDisposisi:true}
            break;        
        case 'koreksi' :
                return {...state, dataUrutanPenyetuju:action.data, loadUrutanPenyetuju:true}
        case 'fail':
            return {...state}
            break
        default:
            break;
    }
}


const TimeLine = (props) => {
    //linier expedisi / urutan koreksi
    const [state, dispatch] = useReducer(reducer, initialState);

    console.log('State', state)
    const newProps = {...props, state: state, dispatch:dispatch}
    const {record} = props;
    let _tipe = record.disposisi_mode || 'Tipe',
        tipe = _tipe.toLowerCase() ; 
           
    if(tipe == 'disposisi' && !(state.loadUrutanDisposisi)){
        getUrutanDisposisi(newProps)
    }else if(tipe == 'draf' && !(state.loadUrutanPenyetuju)){
        getUrutanPenyetuju(newProps)
    }
    
    return<TimeLineView {...newProps} />
}

const getUrutanDisposisi = (newProps) => {
    const {record, dispatch} = newProps;
    console.log('id : ', record.disposisi_masuk_id);
    Connect({
        url     : 'server.php/sipas/surat_ekspedisi/linier_ekspedisi',
        method  : 'get',
        params  : {
            id : record.disposisi_masuk_id,
            page : 1, 
            start : 0
        }
    }).then(response => {     
        const {data, status, config} = response;
        console.log('Resp : ',data.success)
        if(data.success){
            dispatch({type:'disposisi', data: data.data})
        }else{
            console.log(data.message);
        }
    }).catch(err=> {
        console.error('Urutan Dispo Error : ', err)
        dispatch({type:'fail'})
    })
}

const getUrutanPenyetuju = (newProps) => {
    const {record, dispatch} = newProps;
    const _sorter = [{property:"disposisi_tgl", direction:"asc"}],
          _filter = [{property:"disposisi_surat", value:record.disposisi_surat}];
    Connect({
        url     : 'server.php/sipas/koreksi_masuk/riwayat',
        method  : 'get',
        params  : {
            page : 1, 
            start : 0,
            sort : _sorter,
            filter : _filter
        }
    }).then(response => {     
        const {data, status, config} = response;
        console.log('Resp : ',data.success)
        if(data.success){
            dispatch({type:'koreksi', data: data.data})
        }else{
            console.log(data.message);
        }
    }).catch(err=> {
        console.error('Urutan Koreksi Error : ', err)
        dispatch({type:'fail'})
    })
}

export default TimeLine