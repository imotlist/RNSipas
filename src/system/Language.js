import React from 'react'
import Lang from 'public/required/language.json'


const Language = (keyFind) => {

    let Result = false;

    Object.keys(Lang).map((key,index) => {
        if(key == keyFind){
            Result = Lang[key];
        }        
    });

    return Result;

}

export default Language