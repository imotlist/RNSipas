import React from 'react'

import pageStyle from './IconSurat.scss'
import styles from 'src/theme'
import { View,Text } from 'react-native'
import { ListItem,Image } from 'react-native-elements'
import {GetImage} from  'src/components'
const IconSurat = ({data}) =>  {
    const {disposisi_mode} = data;
    let mode = disposisi_mode || 'draf',
        tipe = mode.toLowerCase();
    tipe = (tipe == 'nota dinas') ? 'nodin' : tipe;
    let useIconStyle = tipe == 'draf' ? styles.iconDraf : styles.iconMasuk,
          useIcon      = tipe == 'draf' ? <GetImage source='iconkeluar' style={pageStyle.iconStaf} /> : <GetImage source='iconmasuk' style={pageStyle.iconStaf} /> ;
    if(tipe == 'disposisi') useIconStyle = styles.iconDisposisi;
    return(    
        <>    
            <View style={useIconStyle}>
                {useIcon}
            </View>
            <Text style={pageStyle.textTipe}>{tipe}</Text>
        </>
    )
}

export default IconSurat