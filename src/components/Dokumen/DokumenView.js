import React, { Component } from 'react'
import pageStyle from './DokumenView.scss'
import styles from 'src/theme'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { Image } from 'react-native-elements'
const dataDumb = [
    {
        id : 1,
        dokumen_nama : 'Arahan surat dari manager',
        dokumen_ext : '.pdf',
        dokumen_size : 124
    },
    {
        id : 2,
        dokumen_nama : 'Pengadaan',
        dokumen_ext : '.sdoc',
        dokumen_size : 124
    },
    {
        id : 3,
        dokumen_nama : 'Urutan',
        dokumen_ext : '.jpg',
        dokumen_size : 124
    }
]


const DokumenView = ({record}) => {
    return(
        <View style={{padding:10,paddingTop:20,backgroundColor:'white'}}>
            
            <View style={[styles.rowContent,pageStyle.dokumenTitle]}>
                
                <Text style={[styles.headTitle,pageStyle.flex]}>Dokumen</Text>
                <View style={pageStyle.rowContent}>
                    <Text style={[styles.badgeRed200,pageStyle.iconRahasia]}> R </Text>
                    <Text style={[styles.textDanger,pageStyle.textRahasia]}>                    
                        Rahasia
                    </Text>
                </View>
            </View>
            <View style={styles.rowContent}>
                <DokumenList record={record}/>
            </View>
        </View>
    )
}

const getStyle = (tipe) => {
    console.log('Style',tipe);
    switch (tipe) {
        case '.pdf':
            return styles.dokumenPdf;
            break; 
        case '.sdoc':
            return styles.dokumenSdoc;
            break;
        case '.xls':
            return styles.dokumenXls;
            break; 
        case '.doc':
            return styles.dokumenDoc;
            break; 
        default:
            return styles.dokumenOther;
            break;
    }
}


const DokumenList = ({record}) =>{
    return(
        <FlatList
            data={record || dataDumb}
            horizontal={true}
            renderItem={({ item }) => (               
                    <TouchableOpacity onPress={()=>{doTapDokumen()}}>
                        <View style={[getStyle(item.dokumen_ext)]}>
                            <View style={[styles.dokumenImage]}>
                                <Text style={styles.dokumenImageText}>{item.dokumen_ext}</Text>
                            </View>
                            <View style={styles.dokumenDesc}>
                                <Text numberOfLines={1} style={styles.dokumenTitle}>{item.dokumen_nama}</Text>
                                <Text style={styles.dokumenSubTitle}>{item.dokumen_size}kb</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            keyExtractor={(item) => item.dokumen_id || item.id}
            ListEmptyComponent ={(
                <View style={{height:120, width:350, alignItems:'center', justifyContent:'center'}}>
                    <Text>Tidak ada dokumen</Text>
                </View>
            )}
        />
    )
}

const doTapDokumen = () => {
    alert('Dokumen Tap');
}

export default DokumenView