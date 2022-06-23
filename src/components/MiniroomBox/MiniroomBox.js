import {View ,StyleSheet,Animated,PanResponder,Image,Button} from 'react-native';
import React,{useRef, useState,useEffect} from 'react'
import useStore from '../../../store/store';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'
const MiniroomBox =({test,name,x,y,toolwid=70,toolhei=70}) => {

  const tool = test;
  const testname = name;
  let dlatlx= x;
  let dlatly= y;
  const addminiroom = firestore().collection('miniroom').doc(firebase.auth().currentUser.uid).collection('room').doc(firebase.auth().currentUser.uid).collection('tool');
  const {placeX,setplaceX,Itemhold,setItemhold,countItem} = useStore();
  const [load,setload] = useState(0);
  
  useEffect(() => {
    return () => {
      if(y !== dlatly){
      addItem(dlatlx,dlatly,tool,testname);
    }
    }
  }, [load]);
  
  const addItem = async(x,y,address,name) => {
    const rows = addminiroom.where('name', '==', name);  
    await rows.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          if(x<40&&y>135){
            doc.ref.delete();
            setload(2);
          }
          doc.ref.update({
            getx:x,
            gety:y-95,
            address:address,
            name:name,
          })
        });
      });

  };
    const pan = useRef(new Animated.ValueXY()).current;
    const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y,}
        ],{ useNativeDriver: false }, //오류 메시지를 없애기용 
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
      onPanResponderEnd: (evt , gesture) => {
        dlatlx =gesture.moveX;
        dlatly =gesture.moveY;
        setplaceX(gesture.moveX);
        if(gesture.moveX<40&&gesture.moveY>130)
        {
        addItem(dlatlx,dlatly,tool,testname);
      }
      },
    })
  ).current;
    return(
      <View style={{position:'absolute',transform: [{translateX: x} , {translateY:y}]}}>
        <Animated.View style={{width:10,height:10,position:'absolute',transform: [{ translateX: pan.x }, { translateY: pan.y }]}}{...panResponder.panHandlers}>
        <View style={dstyles(toolwid,toolhei).dynamicbox}>
                <Image source={{uri:`${test}`}} resizeMode='stretch' resizeMethod = 'resize' style={{flex:1}}></Image>
            </View>
      </Animated.View>
      </View>
        )
    }

    const styles =StyleSheet.create({
        box:{
            height: 90,
            width: 90,
            position:'absolute'
          },	
        });	
        const dstyles = (param1, param2) => StyleSheet.create({	
          dynamicbox: {    	
            width: param1,	
            height: param2,
            position:'absolute'
          }	
        });
    export default MiniroomBox