import React from 'react'

const makeCRCTable = () => {
    let c, crcTable = [];
    for(let n =0; n < 256; n++){
        c = n;
        for(let k =0; k < 8; k++){
            c = ((c&1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
        }
        crcTable[n] = c;
    }
    return crcTable;
}

const crc = (inputString) =>{    
    let crcTable = window.crcTable || (window.crcTable = makeCRCTable());
    let crc = 0 ^ (-1);

    for (let i = 0; i < inputString.length; i++ ) {
        crc = (crc >>> 8) ^ crcTable[(crc ^ inputString.charCodeAt(i)) & 0xFF];
    }

    return (crc ^ (-1)) >>> 0;
}

export default crc