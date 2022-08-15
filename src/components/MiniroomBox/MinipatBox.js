import {View ,StyleSheet,Animated,PanResponder,Image,Text} from 'react-native';
import React,{useRef, useState,useEffect} from 'react'
import useStore from '../../../store/store';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import Draggable from 'react-native-draggable';
import { useSelector } from 'react-redux';
const tlranf = [
    {
      id: 0,
      address:
        'https://firebasestorage.googleapis.com/v0/b/graduated-project-ce605.appspot.com/o/plants_growing%2F1.png?alt=media&token=0d700f0e-7b6f-430f-a8ec-dc7e9ca2601d',
    },
    {
      id: 1,
      address:
      'https://firebasestorage.googleapis.com/v0/b/graduated-project-ce605.appspot.com/o/plants_growing%2F1.png?alt=media&token=0d700f0e-7b6f-430f-a8ec-dc7e9ca2601d',
    },
    {
      id: 2,
      address:
      'https://firebasestorage.googleapis.com/v0/b/graduated-project-ce605.appspot.com/o/plants_growing%2F2.png?alt=media&token=ef1f1a60-01e8-47ac-ba86-82b53c547028',
    },
    {
      id: 3,
      address:
      'https://firebasestorage.googleapis.com/v0/b/graduated-project-ce605.appspot.com/o/plants_growing%2F3.png?alt=media&token=a11901a1-272e-41fa-90e0-a9cc33c07849',
    },
    {
      id: 4,
      address:
      'https://firebasestorage.googleapis.com/v0/b/graduated-project-ce605.appspot.com/o/plants_growing%2F4.png?alt=media&token=3f8e5aaf-1a44-45f8-8dc6-c91a11092fdb',
    },
    {
      id: 5,
      address:
      'https://firebasestorage.googleapis.com/v0/b/graduated-project-ce605.appspot.com/o/plants_growing%2F5.png?alt=media&token=745e9ee1-b0dc-4090-afd6-c6879abf451b',
    },
  ];
const MinipatBox =({}) => {

  const usersMinimeCollection = firestore().collection('miniroom').doc(firebase.auth().currentUser.uid).collection('room').doc(firebase.auth().currentUser.uid).collection('minipat').doc(firebase.auth().currentUser.uid+ 'mid');
  const addminiroom = firestore().collection('miniroom').doc(firebase.auth().currentUser.uid).collection('room').doc(firebase.auth().currentUser.uid).collection('minipat');
  const {countItem} = useStore();
  const count = useSelector(state => {return state.count.value});
  let minipataddress;
  const getMinime = async () => {
    try {
      const data = await usersMinimeCollection.get();
      minipataddress = data._data.address;
      console.log(minipataddress)
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getMinime();
    return () => {
    }
  }, [countItem]);
    return(
      <View style={{position:'absolute',borderWidth:1,}}>
                  <Draggable x={320} y={110}z={0} renderSize={80} imageSource={{uri:`${tlranf[count].address}`}}shouldReverse={true}
                  >
                  </Draggable>
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