import React, { Component, useReducer } from 'react'
import { View,TouchableOpacity } from 'react-native';
import styles from 'src/theme'
import { RNCamera } from 'react-native-camera';
import { Avatar, Icon } from 'react-native-elements';
import {Connect, Token} from 'src/system'


const initialState = {flashModeOn:false, backCamera:true, data:false }

const reducer = (state, action) => {
    switch (action.type) {
        case 'flash':           
            return {...state, flashModeOn:!state.flashModeOn}
        case 'mode':            
            return {...state, backCamera:!state.backCamera}
        case 'setImage':
            return {...state, data:action.data}
        default:
            break;
    }
}

const takePicture = async (camera,dispatch) => {
    const options = { quality: 0.5, base64: true };
    let data = await camera.takePictureAsync(options)    
    // console.log(data);
    // console.log(data.uri);
    dispatch({type:'setImage', data: data})
}

const doUpload = (state) => {
    const {data} = state;
    console.log(data.fileName);
    let image = {"foto" : {
        name: data.fileName,
        type: data.type,
        uri : data.uri,
        type: 'image/jpeg', // it may be necessary in Android. 
    }}
    Connect({
        url : 'server.php/sipas/staf/set_image/foto',
        headers: {
            'Content-Type': 'multipart/form-data;'
        },
        // method: 'POST',
        params: {
            id:Token().getData().profile.staf_id
        },
        data : image,
        
    }).then(response=> {
        const {data, success, request} = response
        // console.log('Data : ',data) ;
        // console.log('Req : ', request);
        if(success){
             console.log('Data : ',data) ;
        }else{
            console.log('Message : ',data) ;
            // data.map(item=> {
            //     console.log(item)
            // })
        }
    }).catch(err=> {
        console.log('Err : ',err)
    })

}


const CameraView = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    console.log('render camera')
    return (
        <View style={{
            flex: 1,
            // height:500,
            flexDirection: 'column',
            backgroundColor: 'black',
            }}
        >
            
            <RNCamera
                style={{
                        flex:1,
                        // height:300,
                    }}
                type={state.backCamera ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front}
                flashMode={state.flashModeOn ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
                androidCameraPermissionOptions={{
                    title: 'Izinkan penggunaan kamera',
                    message: 'Kamera digunakan untuk scanner qrcode',
                    buttonPositive: 'Izinkan',
                    buttonNegative: 'Tolak',
                }}
                useNativeZoom={true}
                onPictureTaken={()=>{}}
                
            >                
            {({ camera, status, recordAudioPermissionStatus }) => {
                return(
                <>
                <View style={{top:20,left:10}}>
                    {state.data &&
                        <TouchableOpacity onPress={()=>doUpload(state)}>
                            <Avatar
                                // rounded
                                size="medium"
                                source={{
                                    uri: state.data.uri,
                                }}
                            />
                        </TouchableOpacity>
                    }
                </View>
                <View style={[styles.rowContent,{position:'absolute', bottom:20}]}>
                    <View style={styles.column}>
                        <TouchableOpacity onPress={()=>dispatch({type:'mode'})}>
                            <Icon name="refresh-cw"  color="white" size={24} type="feather"/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.column}>
                        <TouchableOpacity onPress={()=>{ takePicture(camera, dispatch) }}>
                            <Icon name="camera"  color="white" size={40} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.column}>
                        <TouchableOpacity onPress={()=>dispatch({type:'flash'})}>
                            <Icon name={state.flashModeOn ? "zap" : "zap-off" } color="white" type="feather" size={24}/>
                        </TouchableOpacity>
                    </View>
                </View>
                </>
            )}}
            </RNCamera>
        </View>
    )
}


export default CameraView