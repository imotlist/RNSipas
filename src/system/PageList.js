import React, { Component } from 'react'
import Connect from './Connect'

const apis = {
    tugas : 'server.php/sipas/kotak_masuk/tugassaya'
}

const baseParams = {
    dashboard  :{ offset:0, page:0} ,
    tugas      :{ offset:0, page:0} ,
    masuk      :{ offset:0, page:0} ,
    terkirim   :{ offset:0, page:0} ,
    koreksi    :{ offset:0, page:0} 
}

const PageList = () =>{
    const callback ={}

    callback.loadList = (list) => loadList(list)

    return callback;
}

const load = (list) => {

    let useParam = baseParams[list] || baseParams['dashboard'];
    
    //Request to server

    /*if response true
        increase baseParams value for the next request
    */
    
}

export default PageList