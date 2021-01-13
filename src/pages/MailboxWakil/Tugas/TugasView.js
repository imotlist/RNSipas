import React, { Component } from 'react'
// import pageStyle from './TugasView.scss'
import { FlatList, Item, Text } from 'react-native'
import {ItemDisposisi} from 'src/components'

const dataDumb = [
    {
        id     : 1,
        disposisi_mode   : 'disposisi',
        periha : 'Pemberitahuan ...'
    },
    {
        id     : 2,
        disposisi_mode   : 'masuk',
        periha : 'Perihal surat ...'
    },
    {
        id     : 3,
        disposisi_mode   : 'draf',
        periha : 'Data terusan ...'
    },
    {
        id     : 4,
        disposisi_mode   : 'notadinas',
        periha : 'Data notadinas ...'
    }

]

const TugasView = (props) => {
    return  <FlatList
                data={props.state.data}
                renderItem={({ item }) => (                    
                    <ItemDisposisi record={item}/>
                  )}
                keyExtractor={(item) => item.disposisi_masuk_id}
            />
}

export default TugasView