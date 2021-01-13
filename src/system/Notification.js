import React from 'react'
// import firebase from '@react-native-firebase/app';
// import messaging from '@react-native-firebase/messaging';

const Notification = () => {
    const callback = {}
}

const setFcmToken = () => {
    //get and set fcm token after login to local store
    messaging().getToken()
    .then(res => {
        console.log('Res: ',res)
    }).catch(err=> {
        console.log('Err :',err)
    })
}

const getFcmToken = async() => {
    let fcmToken = await messaging().getToken();

    if(fcmToken){
        return fcmToken;
    }else{
        return null;
    }
}

const readFcmToken = () => {
    // read fcm from local storage
}

const notifInit = () => {

    // handle notification on app foreground
    // messaging().getToken().then(res => {console.log('Res: ',res)}).catch(err=> {console.log('Err :',err)})

    // handle notification on app background / quit
    // messaging().onMessage().then(res => {console.log('Res: ',res)}).catch(err=> {console.log('Err :',err)})

    // handle tap action on notif when app on background state
    // messaging().onNotificationOpenedApp(remoteMessage => {
    //     console.log('Notification caused app to open from background state:', remoteMessage);
    // });

    //handle tap action when app on quit state
    // messaging()
    //   .getInitialNotification()
    //   .then(remoteMessage => {
    //         if (remoteMessage) {
    //             console.log(
    //             'Notification caused app to open from quit state:',
    //             remoteMessage,
    //             );            
    //         }            
    //   });

}

const notifAction = () => {

}



export default Notification
