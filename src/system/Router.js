import React, { Component } from 'react'
import {Actions} from 'react-native-router-flux'
const Router = () => {
    const callback = {};
    
    callback.RouteTo = (key,props = {}) => {
        if(!key) return;
        console.log('Route page to ',key)
        Actions.push(key, props);        
    }

    callback.RouteBack = () => {
        Actions.pop();
    }

    callback.RouteBackTo = (key, props) => {
        if(!key) return;
        Actions.popTo(key, props);
    }

    callback.RouteRefresh = (props={}) => {
        Actions.refresh(props);
    }

    callback.RouteReplace = (key, props={}) => {
        if(!key) return;
        Actions.replace(key,props);
    }

    callback.Initialize = (key, props={}) => {
        if(!key) return;
        Actions.reset(key, props);
    }

    return callback;
}

export default Router
