import React, {Component} from 'react';
import codePush from 'react-native-code-push';
import Main from 'src/Main';

const codePushOptions = {
  installMode: codePush.InstallMode.IMMEDIATE,
  deploymentKey: "i2QHqnokMkDROKbMlxeRmFuqgvRbqFSGCEC2h",
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
};

const App = () => {  
    return(
        <Main/>
      )  
}

export default codePush(codePushOptions)(App);