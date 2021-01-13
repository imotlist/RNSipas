import React, { Component, useReducer } from 'react'
import MailboxWakilView from './MailboxWakilView'
import {Connect } from 'src/system'
const wakil = [
    {staf_id:1, name:'Zack Moon', number:18},
    {staf_id:2, name:'Jiran Antra', number:27},
    {staf_id:3, name:'Koel Xion', number:23},
]

const InitialState = {expand:false, dataWakil:[], hasLoad:false}

const reducer = (state, action) => {
    switch (action.type) {
        case 'expand':
            console.log('do expand')
            return {...state, expand:!state.expand}
            break;    
        case 'select':
            let data = state.dataWakil;
            data.map(item => {
                item.selected = (item.staf_id == action.id) ? true : false;                  
            })
            return {...state, expand:!state.expand, dataWakil:data}
        case 'wakil':
            return {...state, dataWakil:action.data, hasLoad:true};
        default:
            break;
    }
}

const MailboxWakil = (props) => {
    const [state, dispatch] = useReducer(reducer, InitialState);
    const newProps = {...props, state:state, dispatch:dispatch}
    if(!state.hasLoad){
        getAsisten(dispatch);
    }
    return <MailboxWakilView {...newProps} />
}

const getAsisten = (dispatch) => {
    let _sorter = [{property:"staf_wakil_asisten", direction:"ASC"}],
        sorter = JSON.stringify(_sorter),        
        _filter = [{property:"staf_wakil_staf",value:"ae2933ff986fa41e316b87a368d5caf8"}],
        filter = JSON.stringify(_filter);

    Connect({
        url     : 'server.php/sipas/staf_wakil/asisten',
        method  : 'get',
        params  : {
            page    : 1,
            start   : 0,
            limit   : 0,
            sort    : _sorter,
            filter  : _filter
        }
    }).then(response=>{
        let {data, status, responseText, request} = response;
        if(data.success){
            dispatch({type:'wakil',data:data.data})
        }else{
            dispatch({type:'wakil',data:[]})
        }
        
    }).catch(e=> {
        console.error('Error Wakil:',e)
    })
}

export default MailboxWakil