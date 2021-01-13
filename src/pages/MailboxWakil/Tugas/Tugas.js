import React, { Component, useReducer } from 'react'
import TugasView from './TugasView'
import {Connect} from 'src/system'

const initialState = {data:[], isLoad:false}

const reducer = (state, action) => {
    switch (action.type) {
        case 'tugas':
            return {...state, data:action.data, isLoad:true}
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
    const {dispatch} = props;
    const _sorter   = [
        {property:"disposisi_masuk_ispengingat ",direction:"DESC"},
        {property:"disposisi_masuk_isbaca",direction:"ASC"},
        {property:"disposisi_masuk_isprioritas ",direction:"DESC"},
        {property:"disposisi_masuk_terima_tgl ",direction:"DESC"},
    ];
    
    Connect({
        url : 'server.php/sipas/kotak_masuk/tugassaya',
        params: {
            page    : 1,
            start   : 0,
            limit   : 25,
            sort    : _sorter
        }
    }).then(response => {
        const {data, success, request} = response
        if(data.success){
            console.log(data.data.length)
            console.log(data.data)
            dispatch({type:'tugas', data: data.data});
        }
    }).catch(err =>{
        console.log(err)
    })
}

export default Tugas