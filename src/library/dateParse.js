import React from 'react'
import moment from 'moment'


// dokumentasi https://momentjs.com/

const dateParse = (date,formatStr) => {
    let useDate = new Date(date);
    let result = moment(date).format(formatStr)
    return result;
}

export default dateParse