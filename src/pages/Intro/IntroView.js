import React, { Component } from 'react'
import AppIntroSlider from 'react-native-app-intro-slider';
import {GetImage} from 'src/components'
import {View, Text, StatusBar} from 'react-native'
import pageStyle from './IntroView.scss'
import styles from 'src/theme'
import {Router, Store} from 'src/system'

const slides = [
    {
      key: 1,
      title: 'Pencarian Lebih Mudah',
      text: 'Pergunakan semua kolom pencarian dan surat anda akan lebih spesifik',
      image: <GetImage source="intro-1" style={pageStyle.pageImage}/>,
      backgroundColor: '#59b2ab',
    },
    {
      key: 2,
      title: 'Distribusi Lebih Cepat',
      text: 'Pendistribusian surat atau disposisi langsung dilakukan melalui aplikasi tanpa perlu pengantar maupun buku agenda disposisi',
      image: <GetImage source="intro-2" style={pageStyle.pageImage}/>,
      backgroundColor: '#febe29',
    },
    {
      key: 3,
      title: 'Pelaporan Tepat dan Akurat',
      text: 'Kemudahan melaporkan persuratan untuk pimpinan',
      image: <GetImage source="intro-3" style={pageStyle.pageImage}/>,
      backgroundColor: '#22bcb5',
    }
  ];
   
const renderItem = ({ item }) => {
  return (
    <View>
      {item.image}
      <Text style={[styles.detailHeadTitle, pageStyle.center]}>{item.title}</Text>
      <Text style={[styles.suratSubTitle, pageStyle.center]}>{item.text}</Text>
    </View>
  );
}

const onDone = () => {
  // console.log('Do done Intro');
  Store().setStore('firstload',true);
  Router().RouteTo('AppInit');
}

const onSkip = () => {
  Store().setStore('firstload',true);
  Router().RouteTo('AppInit');
}

const btnSkip = () => {
  return (
          <View style={pageStyle.btnSkip}>
            <Text style={pageStyle.center}>Lewati</Text>
          </View>
  )
}

const btnNext = () => {
  return (
          <View style={pageStyle.btnLanjut}>
            <Text style={pageStyle.white}>Lanjut</Text>
          </View>
  )
}

const btnDone = () => {
  return (
          <View style={[pageStyle.btnMasuk]}>
            <Text style={pageStyle.white}>Masuk</Text>
          </View>
  )
}

const IntroView = () => {
  return (
        <>
          <StatusBar hidden />
          <AppIntroSlider 
            renderItem={renderItem} 
            data={slides} 
            onDone={onDone}
            // bottomButton = {true}
            dotStyle={pageStyle.dotBlur}
            activeDotStyle ={pageStyle.dotActive}
            showSkipButton ={true}
            // showNextButton ={true}
            renderSkipButton = {btnSkip}
            renderNextButton = {btnNext}
            renderDoneButton = {btnDone}
            onDone = {onDone}
            onSkip = {onSkip}
          />
        </>
  )
}

export default IntroView