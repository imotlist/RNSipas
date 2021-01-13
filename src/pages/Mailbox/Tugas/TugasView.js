import React, { Component } from 'react'
// import pageStyle from './TugasView.scss'
import { FlatList, Item, Text } from 'react-native'
import {ItemDisposisi} from 'src/components'

const dataDumb = [
    {
        id     : 1,
        disposisi_mode   : 'disposisi',
        perihal : 'Pemberitahuan ...'
    },
    {
        id     : 2,
        disposisi_mode   : 'masuk',
        perihal : 'Perihal surat ...'
    },
    {
        id     : 3,
        disposisi_mode   : 'draf',
        perihal : 'Data terusan ...'
    },
    {
        id     : 4,
        disposisi_mode   : 'notadinas',
        perihal : 'Data notadinas ...'
    }

]

const TugasView = (props) => {
    const {dispatch} = props
    return  <FlatList
                data={props.state.data}
                extraData={props.state}
                renderItem={({ item, index }) => (                                   
                    <ItemDisposisi record={item}/>
                  )}
                keyExtractor={(item) => item.disposisi_id}
                onEndReached= {()=>dispatch({type:'next'})}
                onEndReachedThreshold={0.7}                
            />
}

export default TugasView