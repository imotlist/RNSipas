import React, {useReducer} from 'react'
import ProfileView from './ProfileView'
import {showConfirm} from 'src/components'
import RNRestart from 'react-native-restart'
import ImagePicker from 'react-native-image-picker';
import {Store, Connect, Token} from 'src/system'

const initialState = {showload:false}

const reducer = (state, action) => {
    switch (action.type) {
        case 'toggleload':
            return {...state, showload:!state.showload}
        default:
            break;
    }
}

let globalDispatch, globalState;

const Profile = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    globalDispatch = dispatch;
    globalState = state;
    const newProps = {...props, state: state, dispatch:dispatch};
    return <ProfileView {...newProps}/>
}

const logout = () => {
    showConfirm('Perhatian','Keluar dari akun ini ?',(response)=>{        
        if(response){            
            globalDispatch({type:'toggleload'})
            // goTo.RouteTop(Navigation);     
            Store().removeStore('token');
            RNRestart.Restart();       
        }
    })
}

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
};

const getUniversalImage = () => {
    ImagePicker.showImagePicker(options, (response) => {

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {          
            doUpload(response);
        }
    });
}

const doUpload = (data) => {
    Connect({
        url : 'server.php/sipas/staf/set_image/foto?id='+Token().getData().profile.staf_id,
        headers: {
            'Content-Type': 'multipart/form-data;'
        },
        method: 'post',
        // params: {
        //     id:Token().getData().profile.staf_id
        // },
        data : {"foto"  :{
                            name: data.fileName,
                            type: data.type,
                            uri : data.uri    
                        }
            },        
    }).then(response=> {
        const {data, success, request} = response        
        if(success){
            console.log('Data : ',data) ;
        }else{
            console.log('Message : ',data) ;
        }
    }).catch(err=> {
        console.log('Err : ',err)
    })
}

export {logout, getUniversalImage}

export default Profile