import React from 'react'
import ForwardView from './ForwardView'
import {Connect, Token} from 'src/system'
import {showConfirm} from 'src/components'

const Forward = (props) => {
    return <ForwardView {...props}/>
}


const doForward = (props) => {        
    showConfirm('Peringatan','Kirim disposisi pada penerima?',()=>doSend(props))
}

const doSend = (props) => {
    const {record, state, penerima, pesan} = props;
    let params = {
            'user[]'        : [],
            'user_nama[]'   : [],
            'tembusan[]'    : [],
            'berkas[]'      : [],
            'induk'         : true,
            'model_sub'     : record.disposisi_model_sub,
            'surat_id'      : record.surat_id
        };
    
    penerima.map((r) => {
        params['user[]'].push(r.staf_id);
        params['user_nama[]'].push(r.staf_nama);
        params['tembusan[]'].push(false);
        params['berkas[]'].push(false);
    });

    let payload = {
        'disposisi_induk'			: record.disposisi_masuk_id,
        'disposisi_model'			: record.disposisi_model,
        'disposisi_model_sub'		: record.disposisi_model_sub,
        'disposisi_tanggal'			: new Date(),
        'disposisi_staf'			: record.disposisi_masuk_staf,
        'disposisi_pelaku'			: Token().getData().staf_id,
        'disposisi_surat'			: record.disposisi_surat,
        'pengirim_id'				: record.disposisi_masuk_staf,
        'pengirim_nama'				: record.disposisi_masuk_penerima_nama,
        'pengirim_departemen_nama'	: record.disposisi_masuk_penerima_unit_nama,
        'surat_id'					: record.surat_id,
        'surat_agenda'				: record.surat_agenda,
        'surat_nomor'				: record.surat_nomor,
        'disposisi_pesan'           : pesan
    }

    // console.log(payload);
    // console.log(params);

    Connect({
        url     : 'server.php/sipas/disposisi/create',
        method  : 'post',
        // params  : params,
        data    : payload
    }).then(response=> {
        const {data, success, request} = response;
        console.log(success, data);
    }).catch(err=> {
        console.error(err);        
    }).finally(resp => {
        console.log('Finn', resp)
    })
}

export {doForward}

export default Forward