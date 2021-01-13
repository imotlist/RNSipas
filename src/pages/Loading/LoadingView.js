import React, { Component } from 'react'
import { View,Text } from 'react-native'
import { Image } from 'react-native-elements';
import style from './LoadingView.scss'

const LoadingView = () => {
    return(
        <View>
            <Image
                source={ require('public/img/gear.png')}
                style={style.loadImage}
            />
        </View>
    )
}

export default  LoadingView