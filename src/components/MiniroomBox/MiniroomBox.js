import {View ,StyleSheet,Animated,PanResponder,Image,Text,Alert} from 'react-native';
import React,{useRef, useState,useEffect} from 'react'
import useStore from '../../../store/store';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import Draggable from 'react-native-draggable';

const MiniroomBox =({}) => {
  const addminiroom = firestore().collection('miniroom').doc(firebase.auth().currentUser.uid).collection('room').doc(firebase.auth().currentUser.uid).collection('tool');

  const {countItem,setcountItem} = useStore();
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
      console.log('언마운트');
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
          });
        });
      });
  };
  const DeleteItem = async(name) => {
    const rows = addminiroom.where('name', '==', name);  
    await rows.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete();
          setcountItem();
        });
      });
  };

    return(
      <View style={{position:'absolute'}}>
        {
              tool?.map((row, idx) => {
                {
                  return <Draggable x={row.getx} y={row.gety}z={idx} renderSize={row.size} imageSource={{uri:`${row.address}`}} onDragRelease={(e,g,b) => {addItem(b.left,b.top,row.address,row.name)}}
                  debug={true}
                  onLongPress={()=>{Alert.alert(
                    '알림',
                    '삭제하시겠습니까?',[{
                        text:'아니요',
                        onPress: () => console.log('안사욧')
                        ,},
                    {text:'네',onPress: () => DeleteItem(row.name)}
                ],
                {cancelable:false}
                  );}
              }
                    ></Draggable>}
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