import React, { Component } from 'react'
import { ListItem,Image, Avatar } from 'react-native-elements'
import { View,Text } from 'react-native'
import IconSurat from 'src/components/IconSurat/IconSurat'
import {dateParse} from 'src/library'
import {debounce} from 'lodash';
import styles from 'src/theme'
import pageStyle from './ItemDisposisi.scss'
import {Router} from 'src/system'

const Nav = new Router();

const ItemDisposisi = ({record}) => {
    
    const disposisi_mode = record.disposisi_mode || 'draf',
          mode           = disposisi_mode.toLowerCase();
    
    
    return(
        <ListItem
            key={record.disposisi_masuk_id}
            onPress={                               
                debounce(
                    ()=>{
                        Nav.RouteTo('Surat',record)
                    },
                    700,
                    { leading: true, trailing: false }
                )
            }            
            // component={
            //     <>
            //         <MainTitle data={record}/>
            //         {(mode == 'disposisi' || mode == 'nota dinas' ) &&
            //             <SubTitle data={record}/>
            //         }
            //     </>
            // }             
            bottomDivider
        >
            <ListItem.Content>
            <>
                <MainTitle data={record}/>
                     {(mode == 'disposisi' || mode == 'nota dinas' ) &&
                         <SubTitle data={record}/>
                     }
                </>
            </ListItem.Content>
        </ListItem>
    )
}

const MainTitle = ({data}) => {
    let isRahasia = data.sifat_kode == 'R' ? true : false;
    return(
        <View style={styles.rowContent}>
            <View style={[pageStyle.iconAlignTop,{marginRight:5}]}>
                <IconSurat data={data}/>
            </View>
            <View style={[pageStyle.mainTitle,{top:-10, width:'75%'}]}>
                <Text style={(data.id%2==0)?pageStyle.textTitle:pageStyle.textTitleBold}>{data.disposisi_pengirim_unit_nama || 'Jabatan / Unit Pengirim'}</Text>
                <View style={styles.rowContent}>
                    {isRahasia &&<Text style={styles.badgeRahasia}>R</Text>  }
                    <Text style={[pageStyle.textSub,isRahasia ? styles.textDanger : {}]}>{data.surat_perihal || 'Surat Perihal'}</Text>            
                </View>
                { data.surat_nomor && 
                    <Text style={pageStyle.textDesc}>{data.surat_nomor || '[Nomor Disposisi]'}</Text>
                }
                
                    <View style={[styles.rowContent,{paddingTop:5}]}>
                        {data.prioritas_nama &&
                            <Text style={styles.badgeDefault}>{data.prioritas_nama}</Text>
                        }
                        <Text style={styles.badgeWarning}>{data.jenis_nama}</Text>
                    </View>            
            </View>
            <View style={{}}>
                <Text style={styles.textInfo}>{dateParse(data.disposisi_masuk_terima_tgl,'DD MMM')}</Text>
            </View>
        </View>
    )
}

const SubTitle = ({data}) => {
    return(
        <View style={[pageStyle.subTitle,{width:'90%', marginLeft:50}]}>
            <Avatar
                rounded
                source={{
                    uri: data.pengirim_image_preview,
                }}
                size="small"
            />   
            <View style={pageStyle.subTitleRight}>
                <Text style={pageStyle.textTitle}>{data.disposisi_pengirim_jabatan_nama}</Text>
                <Text style={pageStyle.textSub}>{data.perintah_nama}</Text>
                { data.disposisi_pelaku_id != data.disposisi_pengirim_id &&
                    <Text style={pageStyle.textNote}>Dikirim sebagai disposisi Via monitoring oleh {data.disposisi_pelaku_nama}</Text>                
                }
            </View>
        </View>
    )
}

export default ItemDisposisi