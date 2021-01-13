import React, { Component } from 'react'
import styles from 'src/theme'
import { CheckBox as Check} from 'react-native-elements'

const CheckBox = (props) => {
    let { text = "CheckBox Item", textStyle=styles.textCheckBox, check=false, iconRight=false, onTap=()=>{}} = props    
    return (
        <Check
            checked         = { check }
            title           = { text }
            textStyle       = { [styles.textCheckBox,textStyle]}
            containerStyle  = {[styles.noBorder,{backgroundColor:'transparent',padding:0}]}            
            iconRight       = { iconRight }
            onPress         = { onTap}
        />
    )
}

export default CheckBox