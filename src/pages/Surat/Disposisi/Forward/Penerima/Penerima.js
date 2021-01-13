import React, { Component, useReducer } from 'react'
import PenerimaView from './PenerimaView'

const InitialState = {dataPenerima:[],useParent: false, initMode:true}

const reducer = (state, action) => {
    switch (action.type) {
        case 'add':
            if(action.data.length > 0){
                let data = action.data;
                data.map(item => {
                    state.dataPenerima.map(record =>{
                        if(item.staf_id == record.staf_id) item.status == true;
                    })
                    if(!item.status) state.dataPenerima.push(item);
                })
            }
            return {...state, useParent:!state.useParent};
        case 'remove':
                let penerima = state.dataPenerima;
                // console.log(action.id);
                penerima.map((item,index) =>{
                    if(item.staf_id == action.id){
                        penerima.splice(index,1);
                    }
                })   
            return {...state}
        case 'reset':
            return {...state,dataPenerima:[], useParent:false, initMode:false}        
        case 'berkas':
                let data = state.dataPenerima;
                data.map(item=> {
                    if(item.staf_id == action.id){
                        let status = item.berkas ? true :  false;
                        item.berkas = !status;
                    }
                })
            return {...state, dataPenerima:data};
            break;
        case 'tindasan':
            let d = state.dataPenerima;
            d.map(item=> {
                if(item.staf_id == action.id){
                    let status = item.tindasan ? true :  false;
                    item.tindasan = !status;
                }
            })
        return {...state, dataPenerima:d};
        break;
        default:
            break;
    }
}

let globalState= {};

const Penerima = (props) => {

    const [state, dispatch] = useReducer(reducer, InitialState)
    globalState = state;
    const newProps = {...props, state:state, dispatch:dispatch};
    const mode = props.mode || 'init';
    let useRecords = props.records;
    let status = (props.isNew == state.useParent) ? true : false;
    console.log('Kondisi : ',props.isNew, state.useParent, mode, status, useRecords)

    if(mode == 'add' && status && useRecords.length > 0){
        console.log('add Data');
        dispatch({type:'add',data:useRecords})              
    }else if(mode =='init' && state.initMode){
        console.log('reset ')
        dispatch({type:'reset'})
    }
    return <PenerimaView {...newProps}/>
}

export const getValue = () => {
    return globalState;
}

export default Penerima