import React,{useReducer} from 'react'
import DashboardView from './DashboardView'
import {Connect} from 'src/system'

const initialState = {active:'dashboard', dataWakil:[], loadWakil:false}

const reducer = (state, action) => {
  switch (action.type) {
    case 'notifikasi':
        return {...state, active:action.type, loadWakil:false};
    case 'profile':
        return {...state, active:action.type};
    case 'dashboard':
        return {...state, active:action.type};
    case 'wakil':
        // let curentData = state.dataWakil,
        //     temp = [];

        return {...state, dataWakil:action.data, loadWakil:true};
    default:
      throw new Error();
  }
}

const Dashboard = () =>{
    const [state, dispatch] = useReducer(reducer, initialState);
    if(!state.loadWakil){
        getAsisten(dispatch);
    }
    return <DashboardView dispatch={dispatch} state={state}/>
}

const getAsisten = (dispatch) => {
    let _sorter = [{property:"staf_wakil_asisten", direction:"ASC"}],                
        _filter = [{property:"staf_wakil_staf",value:"ae2933ff986fa41e316b87a368d5caf8"}];        

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
            console.log(data.data.length);
            console.log(request);
            dispatch({type:'wakil',data:data.data})
            // console.log(JSON.parse(responseText));
        }else{
            console.log(data.message);
            dispatch({type:'wakil',data:[]})
        }
        
    }).catch(e=> {
        console.error('Error Wakil:',e)
        // dispatch({type:'wakil',data:[]})
    })
}

export default Dashboard