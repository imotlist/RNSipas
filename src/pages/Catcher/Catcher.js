import React from 'react'
import CatcherView from './CatcherView'
const Catcher = (type) => {
    let container;
    switch (type) {
        case 'ERR':
            //connection err
            break;
        case '400':
            //bad request
            break;
        case '403':
            // forbidden
            break;
        case '404':
            //not found
            break;
        case '500':
            //server error
            break;
        
        default:
            //error not recognized
            container = <CatcherView/>
            break;
    }

    return container;
}

export default Catcher