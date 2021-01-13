import React, { Component } from 'react'
import { crc } from 'src/library'
import Token from './Token'

const Ruleable = (ruleName) => {

    let userToken    = Token().getData();
    if(userToken) return false;

    let  rulesUser    =  userToken.rules, // string data
        ruleList     = rulesUser.split(".");         
    if(ruleName){
        return RuleAccess(ruleName)
    }else{
        return ruleList;
    }
}

const RuleAccess = (ruleName) => {
    let ruleComponent   = crc(ruleName),
        isAccessible    = false,
        userToken       = Token().getData(),
        rulesUser       = userToken.rules, // string data
        ruleList        = rulesUser.split(".");
          
    ruleList.map(item => {
        if(item == ruleComponent){
            isAccessible = true;
        }
    })    

    return isAccessible;        
}

export { RuleAccess }

export default Ruleable