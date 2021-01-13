import React from 'react'

const FeatureList = {
    login_user : true,
    server_setting : false,
    menu_notifikasi : true
}

const Featureable = (key) => {
    let result = false;
    Object.entries(FeatureList).map(([keymap,value])=>{
        if(keymap == key){
            result = true
        }
    })

    return result;
}

export default Featureable