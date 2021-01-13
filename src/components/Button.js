import React from 'react'
import {Button as Btn, Icon} from 'react-native-elements'
import styles from 'src/theme'

const Button = (props) => {
    let { text = 'Button', textStyle = false, textUI = 'textButton', type = 'solid', ui = 'btnDefault', ontap=()=>{}, 
          rounded=false, btnStyle = styles.btnDefaultDummy, loading=false, raised=false,
          iconName=false, iconType='', iconRight = true, iconStyle = styles.iconBtnStyle
        } = props; 
    
    let fullRounded = rounded == 'full' ? true : false;
    let isRounded = {};

    if(fullRounded){
        isRounded = styles.fullrounded;
    }else{
        isRounded = rounded ? styles.rounded : styles.square;
    }

    // console.log('Round', isRounded, fullRounded);

    let useIcon   = false,
        isOutline = type == 'outline' ? true : false;

    // let classText  = isOutline && textUI == 'textButton' ? 'textDefault' : textUI ;
        ui         = isOutline ? ui+'Outline' : ui ;        
        textUI     = isOutline ? textUI+'Outline' : textUI;
        btnStyle   = isOutline ? {} : btnStyle;
    // console.log('Text Ui :', textUI);
    if(iconName){
        let useIconStyle =  type == 'icon' ? {} : styles[textUI];
        useIcon = {
                name        : iconName,
                // size        : 28,
                // color       : "white",
                iconStyle   : [{marginLeft:15},iconStyle, useIconStyle ,{fontSize:22}],
                type        : iconType
        }        
    }

    if(type == 'icon'){
        // console.log(useIcon)
        return (
            <Icon {...useIcon} iconStyle={[styles[ui]]}/>
        )
    }else{
        let useTextStyle = textStyle ? textStyle : {};
        return(
            <Btn
                title           = {text}
                titleStyle      = {[styles[textUI],useTextStyle]}
                type            = {type}
                buttonStyle     = {[styles[ui], isRounded, btnStyle]}
                containerStyle  = {[isRounded,btnStyle]}
                onPress         = {ontap}
                loading         = {loading}
                raised          = {raised}
                icon            = {useIcon}
                iconRight       = {iconRight}
            />
        )
    }
    
    
/*
                      input  / default
    text            : string / 'Text',
    textStyle       : inputStyle / staticStyle,
    type            : outline / clear / icon/ solid,
    ui              : class / primary,
    onpress         : function / empty function
    rounded         : true  / square,
    buttonStyle     : inputStyle / staticStyle,
    containerStyle  : none /staticStyle,
    disabled        : true / false,
    loading         : true / false,
    raised          : true / false,
    
    iconName    : string || false,
    iconRight   : true || false,
    
*/

}

export default Button