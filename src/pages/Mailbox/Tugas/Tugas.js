import React, { Component, useReducer } from 'react'
import TugasView from './TugasView'
import {Connect, ErrorHandler} from 'src/system'

const initialState = {data:[], isLoad:false, page:1, start:0, total:0}

const reducer = (state, action) => {
    switch (action.type) {
        case 'tugas':
            let resData = action.data;
            resData.map(record => {
                state.data.push(record)
            })
            return {...state, isLoad:true, page:state.page++,start:state.start+=10,total:action.total}
        case 'next':
            
            if(state.total <= state.data.length){
                return {...state}
            }else{
                return {...state, isLoad:false}
            }
        default:
            break;
    }
}

const Tugas = (props) => {
    props = {};
    const [state, dispatch] = useReducer(reducer, initialState);
    const newProps = {...props, state: state, dispatch: dispatch}
    if(!state.isLoad) getTugasData(newProps)
    return <TugasView {...newProps}/>
}

const getTugasData = (props) => {
    const {state, dispatch} = props;
    const _sorter   = [
        {property:"disposisi_masuk_ispengingat ",direction:"DESC"},
        {property:"disposisi_masuk_isbaca",direction:"ASC"},
        {property:"disposisi_masuk_isprioritas ",direction:"DESC"},
        {property:"disposisi_masuk_terima_tgl ",direction:"DESC"},
    ];
    console.log("Load List Tugas")
    Connect({
        url : 'server.php/sipas/kotak_masuk/tugassaya',
        params: {
            page    : state.page,
            start   : state.start,
            limit   : 10,
            sort    : _sorter
        }
    }).then(response => {
        const {data, success, request} = response
        if(data.success){
            dispatch({type:'tugas', data: data.data, total:data.total});
        }
    }).catch(err =>{
        // console.log(err)
        ErrorHandler(err);
    })
}

export default Tugas