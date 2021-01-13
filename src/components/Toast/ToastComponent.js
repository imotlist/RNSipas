import React from 'react'
import Toast from 'react-native-toast-message';
import ToastView from './ToastView'

const ToastComponent = (props) => {
    return <ToastView {...props}/>
}

const showToast = (props) => {
    let onPress = () => { console.log('On Toast Prss')}
    
    let config = {
        type            : props.type || 'info', //success | error | info
        position        : props.top ? 'top' : 'bottom', // top | bottom
        text1           : props.title || 'Notifikasi',
        text2           : props.text || 'Tidak ada pesn',
        visibilityTime  : props.timeout || 3000,
        autoHide        : true,
        topOffset       : 20,
        bottomOffset    : 20,
        onPress         : props.onPress || onPress,
        onHide          : () => {},
        onShow          : () => {}
    }

    Toast.show(config);
}

export default ToastComponent
export {showToast}