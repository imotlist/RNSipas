import React, { Component } from 'react'
import { Text, View } from 'react-native';
import Signature from 'react-native-signature-canvas';

const SignatureView = (props) => {
    return (
        <View style={{flex:1}}>
            <View style={{height:60, justifyContent:'center', flexDirection:'row'}}>
                <Text>Digital Signature</Text>
            </View>
            <Signature
                // handle when you click save button
                onOK={(img) => console.log(img)}
                onEmpty={() => console.log("empty")}
                // description text for signature
                descriptionText="Digital Signature"
                // clear button text
                clearText="Clear"
                // save button text
                confirmText="Save"
                // String, webview style for overwrite default style, all style: https://github.com/YanYuanFE/react-native-signature-canvas/blob/master/h5/css/signature-pad.css
                // webStyle={`.m-signature-pad--footer
                //     .button {
                //         background-color: red;
                //         color: #FFF;
                //     }`
                // }
                // backgroundColor='red'
                autoClear={true}
                imageType={"image/svg+xml"}
            />
        </View>
      );
}

export default SignatureView