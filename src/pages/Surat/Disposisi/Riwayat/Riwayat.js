import React, {Component, useReducer} from 'react'
import RiwayatView from './RiwayatView'
import {Connect, ErrorHandler} from 'src/system'

const initialState = {isLoad: false, dataRiwayat: []}

const reducer = (state, action) => {
    switch (action.type) {
        case 'riwayat':
                return {...state, dataRiwayat: action.data, isLoad:true}

        default:
            break;
    }
}

const Riwayat = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const newProps = {...props, state: state, dispatch : dispatch};
    if(!state.isLoad)getDataRiwayat(newProps);

    return(
        <RiwayatView {...newProps} />
    )
}

const getDataRiwayat = (props) => {
    const {dispatch, record} = props;
    const disposisi_id = record.disposisi_induk || record.disposisi_id;
    Connect({
        url : 'server.php/sipas/disposisi/read',
        params :{
            start : 0,
            limit : 25,
            filter : [{property:"disposisi_induk", value : disposisi_id}]
        }
    }).then(response=> {
        const {data, success, request} = response
        console.log(data.data);
        if(data.success){
            dispatch({type:'riwayat', data: data.data});
        }
    }).catch(err=> {
        ErrorHandler(err);
    })
}


export default Riwayat