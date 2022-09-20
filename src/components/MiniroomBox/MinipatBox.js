import {View ,StyleSheet,Animated,PanResponder,Image,Text} from 'react-native';
import React,{useRef, useState,useEffect} from 'react'
import useStore from '../../../store/store';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import Draggable from 'react-native-draggable';
import { useSelector } from 'react-redux';
import { resolvePlugin } from '@babel/core';

const MinipatBox =({}) => {
  const [Minipat, setMinipat] = useState()
  const [Patarr, setPatarr] = useState();
  const addminipat = firestore().collection('miniroom').doc(firebase.auth().currentUser.uid).collection('room').doc(firebase.auth().currentUser.uid).collection('minipat').doc(firebase.auth().currentUser.uid+'mid');
  const {countItem,isMinipat} = useStore();
  const count = useSelector(state => {return state.count.value});
  
  const getMinipat = async() => {
    try {
      const datatool = await addminipat.get();
      setMinipat(datatool._data);      
      console.log(`시훈테스트 ${Minipat.address1}`)
      // let strArr = Object.keys(Minipat).map(item => Minipat[item]);
      // let newstrArr = strArr.sort();
      // setPatarr(newstrArr.slice(0,6));
      // console.log(Patarr);
    } catch (error) { 
      console.log(error.message);
    }
  };

  useEffect(() => {
    getMinipat();
    return () => {
    }
  }, [countItem,isMinipat,count]);
    return(
      <View style={{position:'absolute',borderWidth:1,}}>
        {
          Minipat ?
           <Draggable x={320} y={110}z={0} renderSize={80} imageSource={{uri:`${Minipat[count]}`}}shouldReverse={true}></Draggable>
           :
           <Text>asdasds</Text>
        }
                  
        </View>
        )
    }

    const styles =StyleSheet.create({
        box:{
            height: 70,
            width: 70,
            position:'absolute'
          },
    });
    export default MinipatBox