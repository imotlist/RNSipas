import React,{useReducer} from 'react'
import TugasView from './TugasView'
import {Connect, ErrorHandler} from 'src/system'

const list = [
    {
        id:1,
        name: 'Amy Farha',
        subtitle: 'Vice President',
        tipe : 'masuk'
    },
    {
        id:2,
        name: 'Chris Jackson',
        subtitle: 'Vice Chairman',
        tipe : 'draf'
    },
    {
        id:3,
        name: 'Doni Exal',
        subtitle: 'Chairman',
        tipe : 'masuk'
    },
]

const initState = {datalist:[], hasload: false}

const reducer = (state, action) => {
    switch (action.type) {
        case 'loadsuccess':
            return { datalist: action.data, hasload: true }
        break;
        case 'loaderror':
            return { datalist: 'error', hasload: true}
        break;
        case 'reload':
            return {...state, hasload:false}
        break;
        default:
            throw new Error();
        break;
    }
}


const getTugasList = (dispatch) => {
    let _sorter = [
                    {property:"disposisi_masuk_ispengingat",direction:"DESC"},
                    {property:"disposisi_masuk_isbaca",direction:"ASC"},
                    {property:"disposisi_masuk_isprioritas",direction:"DESC"},
                    {property:"disposisi_masuk_terima_tgl",direction:"DESC"}
                ];
        
    Connect({
        url : 'server.php/sipas/kotak_masuk/tugassaya',
        method:'get',
        params : {
            limit   : 5,
            start   : 0,
            page    : 1,
            sort    : _sorter
        }
    }).then(response => {
        // console.log('Data: ',response.data.data.length);
        const {data, status, config} = response;
        if(data.success){
            dispatch({type:'loadsuccess', data:data.data});
        }else{
            dispatch({type:'loaderror'});
        }
        
    }).catch(err=>{
        dispatch({type:'loaderror'});
        // console.error(err);
        ErrorHandler(err);
    })
}

let globalDispatch;

const Tugas = () => {
    const [state, dispatch] = useReducer(reducer, initState);
    globalDispatch = dispatch;
    if(!state.hasload){
        getTugasList(dispatch);
    }
    return <TugasView data={state.datalist}/>  
}

export const doReload = () => {
    globalDispatch({type:'reload'})
}

export default Tugas