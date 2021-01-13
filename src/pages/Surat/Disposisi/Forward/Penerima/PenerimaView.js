import React, { Component } from 'react'
import { View, Text, TouchableOpacity} from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import styles from 'src/theme'
import {Button as Btn, GetImage, CheckBox} from 'src/components'
import { Icon, Avatar } from 'react-native-elements'
const PenerimaView = (props) => {       
    const {state, dispatch} = props;
    return(
        <View>
        <SwipeListView
            data={state.dataPenerima}
            renderItem={ (data, rowMap) => (
                <>
                    <View style={[styles.rowContent, {backgroundColor:'white',height:70}]}>
                        <View>
                            <Avatar
                                rounded
                                source={{
                                uri: data.item.staf_image_preview,
                                }}
                                size="medium"
                                containerStyle={{margin:5}}
                            />
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.textTitle}>{data.item.staf_nama}</Text>
                            <Text style={styles.textInfo}>{data.item.jabatan_nama}</Text>
                            <Text style={styles.textInfo}>{data.item.unit_nama}</Text>
                        </View>
                        <View style={{marginTop:15, marginRight:10}}>
                            {data.item.berkas && <Icon name='folder' color="brown" size={18} />}
                            {data.item.tindasan && <Icon name='people' color="green" size={18}/>}
                        </View>
                    </View>
                </>
            )}
            renderHiddenItem={ (data, rowMap) => {
                let item = data.item;
                console.log(item);
                return(                
                    <View style={[styles.rowContent,{height:60, backgroundColor:'lightgrey'}]}>
                        <View style={[styles.column,{justifyContent:'center',alignItems:'flex-start'}]}>
                            <TouchableOpacity onPress={()=>{dispatch({type:'remove',id:item.staf_id})}}>
                                <Icon name="delete" color='red' containerStyle={{marginLeft:10}} />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.column,{alignItems:'flex-end',flexDirection:'row', justifyContent:'flex-end', alignSelf:'center'}]}>
                            <TouchableOpacity onPress={()=>{dispatch({type:'berkas',id:item.staf_id})}}>
                                <Icon name="folder" type="font-awesome" color={item.berkas ? 'brown':'grey'} containerStyle={{marginRight:20}} />                        
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{dispatch({type:'tindasan',id:item.staf_id})}}>
                                <Icon name="people" color={item.tindasan ? 'green':'grey'} containerStyle={{marginRight:10}} />                 
                            </TouchableOpacity>

                        </View>
                    </View>    
                )
            }}
            leftOpenValue={60}
            rightOpenValue={-110}
        />                    
    </View> 
    )
}


export default PenerimaView