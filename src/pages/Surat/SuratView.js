import React, { Component } from 'react'
import Disposisi from './Disposisi'
import Koreksi from './Koreksi'

const SuratView = (props) => {
    const {record} = props;
    const   disposisi_mode = record.disposisi_mode || 'draf',
            tipe = disposisi_mode.toLowerCase() || record.tipe;
    if(tipe == 'draf'){
        return <Koreksi record = {record}/>
    }else{
        return <Disposisi record = {record}/>
    }
}

export default SuratView