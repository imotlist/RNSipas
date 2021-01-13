import React from 'react'
import {Text} from 'react-native'
import {Language} from 'src/system'

const Lang = ({title = '',name='',type='text',active = true ,styles={}}) => {

    let renderText = active ? <Text style={styles}>{Language(name)}</Text> : <Text style={styles}>{title}</Text>;

    return renderText
}

export default Lang