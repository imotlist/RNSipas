import React from 'react'
import Spinner from 'react-native-loading-spinner-overlay';

const Loading = (props) => {
    let {isVisible} = props
    if(isVisible == 'undefined'){
        isVisible = false;
    }
    
    return(
        <Spinner
          visible={isVisible}
          textContent={'Loading...'}
          textStyle={{color:'#FFF'}}
        />
    )
}

export default Loading