import { View, Text,TouchableOpacity,StyleSheet,Image,SafeAreaView,Dimensions,Animated,PanResponder, ImageBackground,Alert} from 'react-native';
import React,{useState,useEffect,useRef} from 'react'
import ToolInven from './ToolInven';
import MinimiInven from './MinimiInven';
import BackgroundInven from './BackgroundInven';
import MinipatInven from './MinipatInven';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {useNavigation} from '@react-navigation/native';
import MiniroomBox from '../../../components/MiniroomBox/MiniroomBox';
import MinimeBox from '../../../components/MiniroomBox/MinimeBox';
import useStore from '../../../../store/store';
import firestore from '@react-native-firebase/firestore'; 
import firebase  from '@react-native-firebase/app';
import ViewShot from 'react-native-view-shot';
import storage from '@react-native-firebase/storage';
import COLORS from './colors';

const initial = 'https://firebasestorage.googleapis.com/v0/b/graduated-project-ce605.appspot.com/o/Background%2Fbackground1.png?alt=media&token=f59b87fe-3a69-46b9-aed6-6455dd80ba45';
const Tab = createMaterialTopTabNavigator();
const tlranf = [
  {
    id:0,
    address:'https://firebasestorage.googleapis.com/v0/b/graduated-project-ce605.appspot.com/o/plants_growing%2F1.png?alt=media&token=136d17be-739b-4abf-8eb5-4b0eb1d72549'
  },
  {
    id:1,
    address:'https://firebasestorage.googleapis.com/v0/b/graduated-project-ce605.appspot.com/o/plants_growing%2F2.png?alt=media&token=7629c9c4-45f9-4d44-b091-b645d803c20e'
  },
  {
    id:2,
    address:'https://firebasestorage.googleapis.com/v0/b/graduated-project-ce605.appspot.com/o/plants_growing%2F3.png?alt=media&token=c0e352ab-b872-4e3b-a123-111d31e9d24a'
  },
  {
    id:3,
    address:'https://firebasestorage.googleapis.com/v0/b/graduated-project-ce605.appspot.com/o/plants_growing%2F4.png?alt=media&token=46989365-b704-476e-8672-2bbda9f6dc53'
  },
  {
    id:4,
    address:'https://firebasestorage.googleapis.com/v0/b/graduated-project-ce605.appspot.com/o/plants_growing%2F5.png?alt=media&token=71377e1d-9556-4edb-8f79-9ae734502232'
  },
  {
    id:5,
    address:'https://firebasestorage.googleapis.com/v0/b/graduated-project-ce605.appspot.com/o/plants_growing%2F6.png?alt=media&token=ab4e7685-a5e7-4181-b2f8-b00a2539a502'
  },
  {
    id:6,
    address:'https://firebasestorage.googleapis.com/v0/b/graduated-project-ce605.appspot.com/o/plants_growing%2F7.png?alt=media&token=1f975777-f8de-4211-9931-4aaf5c1f91be'
  },
  
]
const Miniroom = () => {  
  const usersBackgroundCollection = firestore().collection('miniroom').doc(firebase.auth().currentUser.uid).collection('room').doc(firebase.auth().currentUser.uid).collection('background').doc(firebase.auth().currentUser.uid+ 'mid');
  const usersMinimeCollection = firestore().collection('miniroom').doc(firebase.auth().currentUser.uid).collection('room').doc(firebase.auth().currentUser.uid).collection('minime').doc(firebase.auth().currentUser.uid+ 'mid');
  const usersToolCollection = firestore().collection('miniroom').doc(firebase.auth().currentUser.uid).collection('room').doc(firebase.auth().currentUser.uid).collection('tool'); 
  const usersMinipatCollection = firestore().collection('miniroom').doc(firebase.auth().currentUser.uid).collection('room').doc(firebase.auth().currentUser.uid).collection('minipat').doc(firebase.auth().currentUser.uid+ 'mid');
  const {tooladdress,Backaddress,BuyItem,placeX,countItem,isMinime} = useStore();
  const {setMinimeaddress,setMinimegetx,setMinimegety,setMinimename,Minimegetx,Minimegety,Minimeaddress,Minimename} = useStore();
  const [tool, setTool] = useState();
  const [Back, setBack] = useState(null);
  const [Minime, setMinime] = useState();
  const [Minipat, setMinipat] = useState(null);
  const [MinipatCount, setMinipatCount] = useState(0);

  const captureRef = useRef();
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

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
        
        const onSave = async() => {
          const uri = await getPhotoUri();
          const imageuri = uploadImage();
          console.log('Image Url: ', imageuri);
          
        };
        const updateMinipat = async(newaddress,count2) => {
          await usersMinipatCollection.update({address:newaddress,count : count2});
          setMinipat(newaddress);
          console.log('저장완료');
        }
        const onMinipatPress = async() => {
          if(MinipatCount<6) //물주는 횟수
          {
          setMinipatCount(MinipatCount+1);  
          updateMinipat(tlranf[MinipatCount].address,MinipatCount);
             }
            else {
              if(MinipatCount==6)
              {
                setMinipatCount(0);
              updateMinipat(tlranf[0].address,0);
            }
              Alert.alert(
              '알림',
              `이미 다 컸어요`,
              );
            }
          }
        
      
      const getTool = async() => {
        try {
      const datatool = await usersToolCollection.get();
      setTool(datatool._docs.map(doc => ({ ...doc.data(), id: doc.id, })));
        } catch (error) {
      console.log(error.message);
      }
      };
        const getMinime = async () => {
          try {
            const data = await usersMinimeCollection.get();
            setMinime(data._data.address);
            setMinimeaddress(data._data.address);
            setMinimename(data._data.name);
            setMinimegetx(data._data.getx);
            setMinimegety(data._data.gety);

          } catch (error) {
            console.log(error.message);
          }
        };
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
    getMinime();
    getTool();
    getMinipat();
    return () => {
      onSave();
    }
  }, [tooladdress,Backaddress,BuyItem,placeX,countItem,isMinime,MinipatCount]);
  return (

    <View style={{flex:1,width:'100%',height:'100%' , backgroundColor : 'white'}}>
      <View style={{flex:0.1,alignItems:'flex-end',justifyContent:'center'}}>
        <Text style={{fontFamily: "Jalnan"}}>횟수 : {MinipatCount}</Text>
      </View>        
      <View style={{height:200}}>
        
    <ViewShot style ={{flex : 1}} ref={captureRef} options={{ format: 'jpg', quality: 0.9 }}>
    <View style={styles.Backimg}>
          <ImageBackground style={styles.background} source={{uri:`${Back ? Back : initial}`}} resizeMethod='resize'></ ImageBackground>
    </View>
      <View style={{width:41,height:70,borderWidth:1,position:'absolute',transform:[{translateX:0},{translateY:131}]}}>
        <Text>쓰레기통</Text>
      </View>
          <TouchableOpacity style={styles.minipat} onPress={onMinipatPress}>
          < Image style={{borderWidth:1,flex:1}} source={{uri:`${Minipat ? Minipat : 'https://firebasestorage.googleapis.com/v0/b/graduated-project-ce605.appspot.com/o/plants_growing%2F1.png?alt=media&token=136d17be-739b-4abf-8eb5-4b0eb1d72549'}`}} resizeMethod='resize'></ Image>
          </TouchableOpacity>
    <View style={styles.item}>
            {
              tool?.map((row, idx) => {
                {
                  return  <MiniroomBox test={row.address} name={row.name} x={row.getx} y={row.gety}></MiniroomBox>}
                })
              }
            <MinimeBox test={Minimeaddress} name={Minimename} x={Minimegetx} y={Minimegety}></MinimeBox>          
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
      transform: [{translateX: 340} , {translateY:135}],
      width:70,
      height:70,
    },
    Backimg: {
      width: '100%',
      height: '100%',
      backgroundColor:'white'
      //paddingBottom: '56.25%',
      //position: 'relative'
    }
  });
