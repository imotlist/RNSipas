import React from 'react'
import { Image } from 'react-native-elements'
import AssetList from '../../public/AssetList'


const GetImage = ({source,style={height:100}}) =>{
    
    let item = getItem(source);
    return(
        <Image
            source={ item.path }
            style={ style }
        />        
    )
}

const getItem = (name) => {
    let result = {},
        asset = AssetList();
        
    asset.map((item,index)=>{
        if(item.name == name){
            result = item;
        }
    })

    return result;
}

export default GetImage