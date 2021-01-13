import React, { Component, useReducer } from 'react'
import ResponseView from './ResponseView'

let datadumb = [
    {id:1, pesan:'Siap Laksana', selected:false},
    {id:2, pesan:'Siap', selected:false},
    {id:3, pesan:'Sesuai', selected:false},
    {id:4, pesan:'Terima Kasih', selected:false},
    {id:5, pesan:'Baik', selected:false}
]


const initialState = {responseOpt:datadumb, loadReponse: false, selected:[]}

const reducer = (state, action) => {
    switch (action.type) {
        case 'select':
                let dDumb = state.responseOpt;
                if(action.id){                    
                    dDumb.map((item, index)=>{
                        if(action.id == item.id){
                            dDumb[index].selected = !item.selected
                        }
                    })
                }
                return {...state, responseOpt:dDumb}
            break;    
        default:
            break;
    }
}


const Response = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const newProps = {...props, state: state, dispatch :  dispatch}
    return <ResponseView  {...newProps}/>
}

export default Response