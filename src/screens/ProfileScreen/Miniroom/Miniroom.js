import { View, Text,TouchableOpacity,StyleSheet,Image,SafeAreaView,Dimensions,Animated,PanResponder, ImageBackground,Button} from 'react-native';
import React,{useState,useEffect,useRef} from 'react'
import { DraxView,DraxProvider,DraxList } from 'react-native-drax';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import ToolInven from './ToolInven';
import MinimiInven from './MinimiInven';
import MusicInven from './MusicInven';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {useNavigation} from '@react-navigation/native';
import MiniroomBox from '../../../components/MiniroomBox/MiniroomBox';
import useStore from '../../../../store/store';
import firestore from '@react-native-firebase/firestore'; 
import firebase  from '@react-native-firebase/app';
import ViewShot from 'react-native-view-shot';
import storage from '@react-native-firebase/storage';

const initial = 'https://firebasestorage.googleapis.com/v0/b/graduated-project-ce605.appspot.com/o/Background%2Fbackground1.png?alt=media&token=f59b87fe-3a69-46b9-aed6-6455dd80ba45';
const Tab = createMaterialTopTabNavigator();
//const Tab = createBottomTabNavigator();
const gestureRootViewStyle = { flex: 1};
const Miniroom = () => {  
  const usersBackgroundCollection = firestore().collection('miniroom').doc(firebase.auth().currentUser.uid).collection('room').doc(firebase.auth().currentUser.uid).collection('background').doc(firebase.auth().currentUser.uid+ 'mid');
  const usersMinimeCollection = firestore().collection('miniroom').doc(firebase.auth().currentUser.uid).collection('room').doc(firebase.auth().currentUser.uid).collection('minime').doc(firebase.auth().currentUser.uid+ 'mid');
  const usersToolCollection = firestore().collection('miniroom').doc(firebase.auth().currentUser.uid).collection('room').doc(firebase.auth().currentUser.uid).collection('tool'); 
  const {tooladdress,Backaddress,BuyItem,placeX,countItem,isMinime} = useStore();
  const [tool, setTool] = useState();
  const [Back, setBack] = useState(null);
  const [Minime, setMinime] = useState(null);
  const captureRef = useRef();
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);



  const getBackgroundData = async () => {
    try {
      const data = await usersBackgroundCollection.get();
      setBack(data._data.address);
    } catch (error) {
      console.log(error.message);
    }
  };


  const uploadImage = async () => {
  
    const uploadUri = await getPhotoUri();
    
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop(); 
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);

    const storageRef = storage().ref(`miniRoomImage/${filename}`);
    const task = storageRef.putFile(uploadUri);
    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();
      console.log('uri', url)

      setUploading(false);
      setImage(null);
      firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .update({
        miniRoom : url
      })
      // Alert.alert(
      //   'Image uploaded!',
      //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      // );
      return url;

    } catch (e) {
      console.log(e);
      return null;
    }


  }; 
  const getPhotoUri = async () => {
    const uri = await captureRef.current.capture();
    console.log('👂👂 Image saved to', uri);
    return uri;
  };
    
  const onSave = async () => {
    const uri = await getPhotoUri();
    const imageuri = uploadImage();
    console.log('Image Url: ', imageuri);

 
    
  


  };

  const getMinime = async () => {
    try {
      const data = await usersMinimeCollection.get();
      setMinime(data._data.address);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getTool = async () => {
    try {
      const datatool = await usersToolCollection.get();
      setTool(datatool._docs.map(doc => ({ ...doc.data(), id: doc.id, })));
    } catch (error) {
      console.log(error.message);
    }
  };


  useEffect(() => {
    getBackgroundData();
    getMinime();
    getTool();
    return () => {
      onSave();
    }
  }, [tooladdress,Backaddress,BuyItem,placeX,countItem,isMinime]);
  return (

    <View style={{flex:1}}>
              

    <ViewShot style ={{flex : 1}} ref={captureRef} options={{ format: 'jpg', quality: 0.9 }}>

    <View style={{flex:1,width:'100%',height:'100%'}}>


          <ImageBackground style={styles.background} source={{uri:`${Back ? Back : initial}`}}></ ImageBackground>

              </View>
          < Image style={styles.minime} source={{uri:`${Minime ? Minime : initial}`}}></ Image>
            <View style={styles.item}>
            {
        tool?.map((row, idx) => {
         {
            return  <MiniroomBox test={row.address} name={row.name} x={row.getx} y={row.gety}></MiniroomBox>} 
      })
      }
            </View>
            </ViewShot>
        <View style={styles.miniroom}>
        <Tab.Navigator 
        >
      <Tab.Screen name="가구" component={ToolInven} />
      <Tab.Screen name="미니미" component={MinimiInven} />
      <Tab.Screen name="배경" component={MusicInven} />
    </Tab.Navigator>
    
        </View>
        
    </View>
    
  ); 
};

export default Miniroom;
const styles = StyleSheet.create({
    miniroom: {
      height:250,
      color:'orange'
    },
    background: {
      flex: 1,
      resizeMode:'stretch',
      position: 'absolute',
      height: '100%',
      weight: '100%',
      opacity: 0.8,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    item: {
      position: 'absolute',

    },
    minime: {
      resizeMode:'stretch',
      position: 'absolute',
      transform: [{translateX: 150} , {translateY:200}],
      width:100,
      height:100,
    }
  });