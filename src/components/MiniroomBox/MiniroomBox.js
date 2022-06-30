import {View ,StyleSheet,Animated,PanResponder,Image,Text} from 'react-native';
import React,{useRef, useState,useEffect} from 'react'
import useStore from '../../../store/store';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import Draggable from 'react-native-draggable';

const MiniroomBox =({}) => {
  let test = 'https://firebasestorage.googleapis.com/v0/b/graduated-project-ce605.appspot.com/o/Furniture%2F5Furni.png?alt=media&token=498686e8-35a9-4b28-90b8-7497b30d7fc4'
  const addminiroom = firestore().collection('miniroom').doc(firebase.auth().currentUser.uid).collection('room').doc(firebase.auth().currentUser.uid).collection('tool');

  const {placeX,setplaceX,Itemhold,setItemhold,countItem} = useStore();
  const [load,setload] = useState(0);
  const [tool, setTool] = useState();
  
  const getTool = async() => {
    try {
  const datatool = await addminiroom.get();
  setTool(datatool._docs.map(doc => ({ ...doc.data(), id: doc.id, })));
        } catch (error) {
  console.log(error.message);
}
}
  useEffect(() => {
    getTool();
    return () => {
    }
  }, [countItem]);
  const addItem = async(x,y,address,name) => {
    const rows = addminiroom.where('name', '==', name);  
    await rows.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.update({
            getx:x,
            gety:y,
            address:address,
            name:name,
          })
        });
      });
  };
    return(
      <View style={{position:'absolute'}}>
        {
              tool?.map((row, idx) => {
                {
                  return <Draggable x={row.getx} y={row.gety}z={idx} renderSize={110} imageSource={{uri:`${row.address}`}} onDragRelease={(e,g,b) => {addItem(b.left,b.top,row.address,row.name)}}  debug={true}></Draggable>}
                })
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
    export default MiniroomBox