import React, { Component, useReducer } from 'react'
import {Connect} from 'src/system'


import DisposisiView from './DisposisiView'

const Disposisi = ({record}) => {
    return <DisposisiView record={record}/>
}

export default Disposisi