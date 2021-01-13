import React, { Component } from 'react'
import { FlatList, Item, Text } from 'react-native'
import {ItemDisposisi} from 'src/components'

const TerkirimView = (props) => {
    return  <FlatList
                data={props.state.data}
                renderItem={({ item }) => (                    
                    <ItemDisposisi record={item}/>
                  )}
                keyExtractor={(item) => item.disposisi_masuk_id}
            />
}

export default TerkirimView