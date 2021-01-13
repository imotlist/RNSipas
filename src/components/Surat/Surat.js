import React, { Component,useReducer } from 'react'
import pageStyle from './Surat.scss'
import styles from 'src/theme'
import { View, Text, TouchableOpacity } from 'react-native'
import {Berkas} from 'src/components'
import { Icon, Avatar, ListItem } from 'react-native-elements'
import {dateParse} from 'src/library'

const initialState = {detailShow: true}

const reducer = (state, action) => {
    switch (action.type) {
      case 'detail':
          return {detailShow:!state.detailShow};
      default:
        throw new Error();
    }
  }

const Surat = ({record}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const ShowDataPenerima = !state.detailShow ? <DaftarPenerima/> : <DaftarPenerimaShow/>
    return(
        <View style={{padding:10,paddingTop:5,backgroundColor:'white'}}>
            <View style={[styles.rowContent,{paddingBottom:10}]}>
                <Text style={[styles.headTitle,pageStyle.flex]}>Informasi Surat</Text>
                <TouchableOpacity onPress={()=>{dispatch({type:'detail'})}}>
                    <Text style={[styles.headDesc,styles.linkText,pageStyle.detail]}>Detail</Text>
                </TouchableOpacity>
            </View>
            <View>
                <View style={styles.rowBorder}>
                    <View style={styles.columnBorderRIght}>
                        <Text style={styles.suratSubTitle}>No Surat</Text>
                        <Text style={styles.suratDesc}>{record.surat_nomor}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.suratSubTitle}>Tanggal Surat</Text>
                        <Text style={styles.suratDesc}>{dateParse(record.surat_tanggal,'DD MMM YYYY, h:mm:ss')}</Text>
                    </View>
                </View>
                <View style={[styles.rowBorder,[{minHeight:80}]]}>
                    <View style={[styles.column,{minHeight:80}]}>
                        <Text style={styles.suratSubTitle}>Jenis dan Klasifikasi Surat</Text>
                        <Text style={styles.suratDesc}>{record.jenis_nama}</Text>
                        <Text style={styles.suratDesc}>{record.kelas_nama}</Text>
                    </View>
                </View>
                { state.detailShow &&
                    <>
                        <View style={styles.rowBorder}>
                            <View style={styles.columnBorderRIght}>
                                <Text style={styles.suratSubTitle}>No Agenda</Text>
                                <Text style={styles.suratDesc}>{record.surat_agenda}</Text>
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.suratSubTitle}>Kepada</Text>
                                <Text style={styles.suratDesc}>{record.disposisi_masuk_penerima_unit_nama}</Text>
                            </View>
                        </View>
                        <View style={styles.rowBorder}>
                            <View style={styles.column}>
                                <Text style={styles.suratSubTitle}>Media</Text>
                                <Text style={styles.suratDesc}>Kurir Pos Indonesia</Text>
                            </View>
                        </View>
                        <View style={styles.rowBorder}>
                            <View style={styles.column}>
                                <Text style={styles.suratSubTitle}>Lokasi</Text>
                                <Text style={styles.suratDesc}>{record.lokasi_nama}</Text>
                            </View>
                        </View>
                    </>
                }
                {
                    ShowDataPenerima
                }
                { record.disposisi_masuk_isberkas == 1 &&
                    <Berkas />
                }
            </View>
        </View>
    )
}

const dataDumb = [0,1,2]


const DaftarPenerima = () => (
    <View style={[styles.rowBorder,{height:90}]}>
        <View style={styles.column}>
            <Text style={styles.suratSubTitle}>Surat ini telah terdistribusi ke</Text>
        </View>
        <View style={[styles.column,{paddingTop:20}]}>
            <View style={styles.rowContentReverse}>
                {
                    dataDumb.map(index=> {
                        let num = index*30;
                        return(
                            <Avatar
                                rounded
                                size="medium"
                                source={{
                                    uri:'https://i.pravatar.cc/202',
                                }}
                                containerStyle={{borderColor:'white',  borderWidth:1,position:'absolute', left:num}}
                            />
                        )
                    })
                }
            </View>
        </View>
    </View>
)

const DaftarPenerimaShow = () => (
    <View>
        <View style={[styles.rowBorder, {paddingTop:10, paddingLeft:5, height:30}]}>
            <Text style={styles.suratSubTitle}>Surat ini telah terdistribusi ke</Text>
        </View>        
            {
                dataDumb.map(index=>{
                    return(
                        <ListItem style={[styles.rowContent,{height:60}]}>
                            <Avatar
                                rounded
                                size="medium"
                                source={{
                                    uri:'https://i.pravatar.cc/202',
                                }}
                            />
                            <View>
                                <Text>Rere Mandarati</Text>
                                <Text>Unit Antisipasi Bencana Dadakan</Text>
                            </View>
                        </ListItem>
                    )
                })
            }        
    </View>
)

export default Surat