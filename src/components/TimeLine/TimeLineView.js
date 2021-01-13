import React, { Component } from 'react'
import styles from 'src/theme'
import pageStyle from './TimeLineView.scss'
import { View, Text, FlatList } from 'react-native'
import {GetImage} from  'src/components'
import {dateParse} from 'src/library'
import { Button, Input, Icon, Avatar } from 'react-native-elements'
import {Button as Btn } from 'src/components'

const dataDumb = [
    {
        id      : 1,
        name    : 'Abdul',
        unit    : 'Internal'
    },
    {
        id      : 2,
        name    : 'Abdul',
        unit    : 'Internal'
    },
    {
        id      : 3,
        name    : 'Abdul',
        unit    : 'Internal'
    }
]

const TimeLineView = (props) => {
    const {record, state, dipatch} = props;    
    const params = {};
    const _jenis = record.disposisi_mode || 'disposisi',
           jenis = _jenis.toLowerCase();
    let data = jenis == 'disposisi' ? state.dataUrutanDisposisi : state.dataUrutanPenyetuju;   
    
    params.data = data;
    params.length = data.length || dataDumb.length;
    params.jenis = record.disposisi_mode || jenis;

    return(
        <FlatList
            data={params.data}
            renderItem={item => (                    
                    <ItemContent params={params} record={item}/>
                )}
            keyExtractor={(item) => item.disposisi_masuk_id}
        />
    )
}

const ItemContent = ({params, record}) => {
    const {item, index} = record;
    const {length, data, jenis } = params;
    const lastIndex = length - 1,
          isLastIndex = index == lastIndex ? true : false,
          lastIndexStyle = isLastIndex ?  pageStyle.lastIndex : '',
          useJenis = jenis.toLowerCase();
        
    const useLine = useJenis == 'draf' ? <DetailTimeLineKoreksi data={{lastIndex:isLastIndex, item:item}}/> :<DetailTimeLineDisposisi data={{lastIndex:isLastIndex,item:item}}/>,
          useResponse = useJenis == 'draf' ? <ApprovalItem /> :<ResponItem/>;
    let isResponse = useJenis == 'draf' && isLastIndex && item.disposisi_masuk_status == 0;
    
    return(
        <View style={[styles.listTimeLine,{display:isResponse ? 'none':'flex'}]}>
            <View style={pageStyle.rowContent}>
                <View style={pageStyle.leftColumn}>
                    <Avatar
                        rounded
                        source={{
                            uri: item.pengirim_image_preview,
                        }}
                        size="medium"
                    />
                    { index != lastIndex &&
                        <View style={pageStyle.dash}/>
                    }
                </View>
                <View style={pageStyle.rightColumn}>
                    {useLine}
                </View>
            </View>
        </View>
    )
}

const ResponItem = () => (
    <View style={styles.paddingComponent}>
        <Text>Respon</Text>
        <View>
            <Input placeholder="Berikan respon ..." 
                rightIcon={
                    <Icon
                        name='send'
                        size={18}
                        // type='font-awesome'
                        color='#6f6f6f'
                        iconStyle={{marginRight:5}}
                        onPress={()=>{}}
                    />
                }
            />
        </View>
        <View style={pageStyle.rowContent}>
            {
                opt.map(({id,pesan})=>(<Text style={styles.badgeDefault}>{pesan}</Text>))
            }
        </View>
    </View>
)

const ApprovalItem = () =>(
    <View style={styles.paddingComponent}>
        <Text>Respon</Text>
        <View>
            <Input placeholder="Komentar anda ..." />
        </View>
        <View style={pageStyle.rowContent}>
            <View style={styles.column}>                
                <Btn text="Revisi" ui="btnDanger" />
            </View>
            <View style={styles.column}>
                <Btn text="Setuju" ui="btnSuccess" />
            </View>
        </View>
    </View>
)

const DetailTimeLineDisposisi = ({data}) => {
    const {lastIndex, item} = data;
    return(
        <View>
            <Text style={styles.headTitle}>{item.disposisi_pengirim_nama}</Text>
            <Text>{item.disposisi_pengirim_jabatan_nama}</Text>
            <View style={styles.horizontalSeparator}/>            
                <View style={{marginTop:5, marginBottom:10}}>
                    { item.disposisi_israhasia == 1 &&
                        <View style={[styles.badgeDanger,pageStyle.rowContent,{marginRight:20}]}>
                            <Icon name='lock' iconStyle={{fontSize:16,padding:5}} color='white'/>                        
                            <Text style={{padding:5,paddingLeft:2,color:'white'}}>Disposisi bersifat rahasia</Text>                        
                        </View>
                    }
                    <Text>
                        {item.perintah_nama}
                    </Text>
                </View>
            <Text style={styles.suratSubTitle}>mengirim Disposisi pada {dateParse(item.disposisi_tgl,'DD MMM YYYY, h:mm:ss')}</Text>
            { item.disposisi_pelaku_id != item.disposisi_pengirim_id &&
                <Text>Via disposisi oleh {item.disposisi_pelaku_nama}</Text>
            }
        </View>
    )
}

const DetailTimeLineKoreksi = ({data}) => {
    const {lastIndex,item} = data;
    return(
        <View>
            <Text style={styles.headTitle}>{item.disposisi_masuk_penerima_jabatan_nama}</Text>
            <Text>{item.disposisi_masuk_penerima_nama}</Text>
            
            <View style={styles.horizontalSeparator}/>
            
                <View style={{marginTop:5, marginBottom:10}}>
                    {item.disposisi_masuk_pesan &&
                        <Text>
                        {item.disposisi_masuk_pesan}                    
                        </Text>
                    }
                    <Text style={[styles.textSuccessOutline, {textTransform:'none'}]}>
                       Menyetujui pada {dateParse(item.disposisi_masuk_status_tgl, 'DD MMM YYYY, h:mm:ss')}
                    </Text>
                    <Text>Via disposisi oleh Marta Dinama</Text>
                </View>                                    
                
        </View>
    )
}

export default TimeLineView