import React,{useState,useEffect,useRef} from 'react'
import { View, Text,TouchableOpacity,StyleSheet,Image,Button, ImageBackground,Alert} from 'react-native';
import ToolInven from './ToolInven';
import MinimiInven from './MinimiInven';
import BackgroundInven from './BackgroundInven';
import MinipatInven from './MinipatInven';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import MiniroomBox from '../../../components/MiniroomBox/MiniroomBox';
import MinimeBox from '../../../components/MiniroomBox/MinimeBox';
import useStore from '../../../../store/store';
import firestore from '@react-native-firebase/firestore'; 
import firebase  from '@react-native-firebase/app';
import ViewShot from 'react-native-view-shot';
import storage from '@react-native-firebase/storage';

const initial = 'https://firebasestorage.googleapis.com/v0/b/graduated-project-ce605.appspot.com/o/Background%2Fbackground1.png?alt=media&token=f59b87fe-3a69-46b9-aed6-6455dd80ba45';
const Tab = createMaterialTopTabNavigator();
const tlranf = [
  {
    id:0,
    address:'https://firebasestorage.googleapis.com/v0/b/graduated-project-ce605.appspot.com/o/plants_growing%2F1.png?alt=media&token=0d700f0e-7b6f-430f-a8ec-dc7e9ca2601d'
  },
  {
    id:1,
    address:'https://firebasestorage.googleapis.com/v0/b/graduated-project-ce605.appspot.com/o/plants_growing%2F1.png?alt=media&token=0d700f0e-7b6f-430f-a8ec-dc7e9ca2601d'
  },
  {
    id:2,
    address:'https://firebasestorage.googleapis.com/v0/b/graduated-project-ce605.appspot.com/o/plants_growing%2F2.png?alt=media&token=ef1f1a60-01e8-47ac-ba86-82b53c547028'
  },
  {
    id:3,
    address:'https://firebasestorage.googleapis.com/v0/b/graduated-project-ce605.appspot.com/o/plants_growing%2F3.png?alt=media&token=a11901a1-272e-41fa-90e0-a9cc33c07849'
  },
  {
    id:4,
    address:'https://firebasestorage.googleapis.com/v0/b/graduated-project-ce605.appspot.com/o/plants_growing%2F4.png?alt=media&token=3f8e5aaf-1a44-45f8-8dc6-c91a11092fdb'
  },
  {
    id:5,
    address:'https://firebasestorage.googleapis.com/v0/b/graduated-project-ce605.appspot.com/o/plants_growing%2F5.png?alt=media&token=745e9ee1-b0dc-4090-afd6-c6879abf451b'
  },
  
    
  
]
const Miniroom = () => {  
  const usersBackgroundCollection = firestore().collection('miniroom').doc(firebase.auth().currentUser.uid).collection('room').doc(firebase.auth().currentUser.uid).collection('background').doc(firebase.auth().currentUser.uid+ 'mid');
  const usersMinimeCollection = firestore().collection('miniroom').doc(firebase.auth().currentUser.uid).collection('room').doc(firebase.auth().currentUser.uid).collection('minime').doc(firebase.auth().currentUser.uid+ 'mid');
  const usersToolCollection = firestore().collection('miniroom').doc(firebase.auth().currentUser.uid).collection('room').doc(firebase.auth().currentUser.uid).collection('tool'); 
  const usersMinipatCollection = firestore().collection('miniroom').doc(firebase.auth().currentUser.uid).collection('room').doc(firebase.auth().currentUser.uid).collection('minipat').doc(firebase.auth().currentUser.uid+ 'mid');
  const {tooladdress,Backaddress,BuyItem,placeX,countItem,isMinime,} = useStore();
  const {setMinimeaddress,setMinimegetx,setMinimegety,setMinimename,Minimegetx,Minimegety,Minimeaddress,Minimename} = useStore();
  const [tool, setTool] = useState();
  const [Back, setBack] = useState(null);
  const [Minime, setMinime] = useState();
  const [Minipat, setMinipat] = useState(null);
  const [MinipatCount, setMinipatCount] = useState(1);
  const [userData, setUserData] = useState(null);

  const captureRef = useRef();
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const getUser = async() => {
    await firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((documentSnapshot) => {
      if( documentSnapshot.exists ) {
        console.log('User Data', documentSnapshot.data());
        setUserData(documentSnapshot.data());
      }
    })
  }
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
          
          return uri;
        };
        
        const onSave = async() => {
          const uri = await getPhotoUri();
          const imageuri = await uploadImage();
        
          
        };
        const updateMinipat = async(newaddress,count) => {
          await usersMinipatCollection.update({address:newaddress,count : count});
          setMinipat(newaddress);
          console.log('저장완료');
        }
        const onMinipatPress = () => {
          console.log(MinipatCount);
          if(MinipatCount<6) //물주는 횟수
          {
            setMinipatCount(MinipatCount+1)  
            updateMinipat(tlranf[MinipatCount].address,MinipatCount);
          }
          if(MinipatCount == 5)
            {
              firestore()
              .collection('users')
              .doc(firebase.auth().currentUser.uid)
              .update({
                point :  userData.point + 300
              })
              Alert.alert(
                '식물 성장 최종 보너스',
                `300 포인트를 얻었습니다!`,
                );
                setMinipatCount(0);  
                updateMinipat(tlranf[MinipatCount].address,MinipatCount);
            }
          }
        const getBackgroundData = async () => {
          try {
            const data = await usersBackgroundCollection.get();
            setBack(data._data.address);
          } catch (error) {
            console.log(error.message);
          }
        };
        const getMinipat = async () => {
          try {
            const data = await usersMinipatCollection.get();
            setMinipat(data._data.address);
            setMinipatCount(data._data.count);
          } catch (error) {
            console.log(error.message);
          }
        };

  useEffect(() => {
    getBackgroundData();
    getMinipat();
    getUser();
    return () => {
      //onSave();
    }
  }, [countItem,Minimeaddress,Backaddress]);
  return (

    <View style={{flex:1,width:'100%',height:'100%' , backgroundColor : 'white'}}>
    <View style={{height:200}}>
      
    <ViewShot style ={{flex : 1}} ref={captureRef} options={{ format: 'jpg', quality: 0.9 }}>
    <View style={styles.Backimg}>
          <ImageBackground style={styles.background} source={{uri:`${Back ? Back : initial}`}}resizeMethod = 'resize'></ ImageBackground>
    </View>
      <TouchableOpacity onPress={()=>{
        onSave();
        Alert.alert('저장완료');
        }
        } style={{position:'absolute',width:50,height:40,borderWidth:1,alignItems:'center',justifyContent:'center'}}>
        <Text>저장</Text>
      </TouchableOpacity>
    
          <TouchableOpacity style={styles.minipat} onPress={()=>onMinipatPress()}>
          < Image  style={{borderWidth:1,flex:1,}} source={{uri:`${Minipat ? Minipat : 'https://firebasestorage.googleapis.com/v0/b/graduated-project-ce605.appspot.com/o/plants_growing%2F1.png?alt=media&token=0d700f0e-7b6f-430f-a8ec-dc7e9ca2601d'}`}} resizeMethod = 'resize'></ Image>
          </TouchableOpacity>
    <View style={styles.item}>
            <MiniroomBox></MiniroomBox>   
            <MinimeBox></MinimeBox>          
    </View>
            </ViewShot>
            </View>
            
        <View style={styles.miniroom}>
        <Tab.Navigator tabBarOptions={{
				activeTintColor: "orange",
				inactiveTintColor: "gray",
				labelStyle: {
					fontSize: 15,
          fontFamily: "Jalnan"
				},
			}}>
      <Tab.Screen name="가구" component={ToolInven} />
      <Tab.Screen name="미니미" component={MinimiInven} />
      <Tab.Screen name="배경" component={BackgroundInven} />
      <Tab.Screen name="미니펫" component={MinipatInven} />
    </Tab.Navigator>
    
        </View>
        
    </View>
    
  ); 
};

export default Miniroom;
const styles = StyleSheet.create({
    miniroom: {
      flex:1,
      height:1,
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
      transform: [{translateX: 150} , {translateY:90}],
      width:100,
      height:100,
    },
    minipat: {
      resizeMode:'stretch',
      position: 'absolute',
      transform: [{translateX: 310} , {translateY:90}],
      width: 100,
      height: 100,
    },
    Backimg: {
      width: '100%',
      height: '100%',
      backgroundColor:'white'
      //paddingBottom: '56.25%',
      //position: 'relative'
    }
  });