import React from 'react'
import {Ruleable, Featureable} from 'src/system'


const Access = ({Rule=null , Feature=null, Component = <></>}) => {
    let show = true,
        Rules = new Ruleable(),
        Features = new Featureable();

    if(Rule){
        let RuleResult = Rules.getRules(Rule)
    }
    if(Feature){
        let FeatureResult = Features.getFeature(Feature)
    }

    return Component
}


export default Access