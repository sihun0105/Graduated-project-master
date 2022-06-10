import { View, Text,TouchableOpacity,StyleSheet,Image,SafeAreaView,Dimensions,Animated,PanResponder, ImageBackground,Button} from 'react-native';
import React,{useState,useEffect,useRef} from 'react'
import { DraxView,DraxProvider,DraxList } from 'react-native-drax';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {useNavigation} from '@react-navigation/native';
import MiniroomBox from '../../../components/MiniroomBox/MiniroomBox';
import useStore from '../../../../store/store';
import firestore from '@react-native-firebase/firestore'; 
import firebase  from '@react-native-firebase/app';
import ViewShot from 'react-native-view-shot';
import storage from '@react-native-firebase/storage';
import COLORS from '../Miniroom/colors';

const initial = 'https://firebasestorage.googleapis.com/v0/b/graduated-project-ce605.appspot.com/o/Background%2Fbackground1.png?alt=media&token=f59b87fe-3a69-46b9-aed6-6455dd80ba45';
const width = Dimensions.get('window').width / 2 - 30;
const Miniroom = () => {  
  const usersBackgroundCollection = firestore().collection('miniroom').doc(firebase.auth().currentUser.uid).collection('room').doc(firebase.auth().currentUser.uid).collection('background').doc(firebase.auth().currentUser.uid+ 'mid');
  const usersMinimeCollection = firestore().collection('miniroom').doc(firebase.auth().currentUser.uid).collection('room').doc(firebase.auth().currentUser.uid).collection('minime').doc(firebase.auth().currentUser.uid+ 'mid');
  const usersToolCollection = firestore().collection('miniroom').doc(firebase.auth().currentUser.uid).collection('room').doc(firebase.auth().currentUser.uid).collection('tool'); 
  const usersMinipatCollection = firestore().collection('miniroom').doc(firebase.auth().currentUser.uid).collection('room').doc(firebase.auth().currentUser.uid).collection('minipat').doc(firebase.auth().currentUser.uid+ 'mid');


  const InventoolCollection = firestore().collection('Inventory').doc(firebase.auth().currentUser.uid).collection('tool'); 
  const InvenminimeCollection = firestore().collection('Inventory').doc(firebase.auth().currentUser.uid).collection('minime');
  const InvenBackgroundCollection = firestore().collection('Inventory').doc(firebase.auth().currentUser.uid).collection('background');
  const InvenMinipatCollection = firestore().collection('Inventory').doc(firebase.auth().currentUser.uid).collection('minipat');
  const {tooladdress,Backaddress,BuyItem,placeX,countItem,isMinime,settooladdress,setcountItem,setBacksaddress,setisMinime} = useStore();
  const [tool, setTool] = useState();
  const [Minime, setMinime] = useState(null);
  const [Back, setBack] = useState(null);
  const [Minipat, setMinipat] = useState(null);

  const captureRef = useRef();
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  
  const [catergoryIndex, setCategoryIndex] = useState(0);
  const categories = ['가구', '미니미', '배경','미니펫'];

  const [InvenMinime, setInvenMinime] = useState();
  const [InvenBackground, setInvenBackground] = useState();
  const [InvenTool, setInvenTool] = useState();
  const [InvenMinipat, setInvenMinipat] = useState();


/*미니룸 보여지는곳 전용*/
const getTool = async () => {
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
  const getMinipatData = async () => {
    try {
      const data = await usersMinipatCollection.get();
      setMinipat(data._data.address);
    } catch (error) {
      console.log(error.message);
    }
  };
 
 
   /*미니룸 인벤 전용*/
   const getToolInven = async () => {
     try {
       const data = await InventoolCollection.get();
       setInvenTool(data._docs.map(doc => ({ ...doc.data(), id: doc.id })));
     } catch (error) {
       console.log(error.message);
     }
   };
   const addTool =(address,name) => {
    firestore().collection('miniroom').doc(firebase.auth().currentUser.uid).collection('room').doc(firebase.auth().currentUser.uid).collection('tool').doc(name).set({
      name:name,
      address:address,
      getx:1,
      gety:1});
    console.log('추가완료');
    console.log(name);
    settooladdress(address);
    setcountItem();
    console.log(countItem);
  }
   const getMinimeInven = async () => {
    try {
      const data = await InvenminimeCollection.get();
      setInvenMinime(data._docs.map(doc => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.log(error.message);
    }
  };
  const updateMinime = (newaddress) => {
    usersMinimeCollection.update({address:newaddress});
    //addBackground.collection('background').add({address:newaddress});
    console.log('저장완료');  
    console.log(newaddress);
    setisMinime(newaddress);
  };
  
  const getBackgroundInven = async () => {
    try {
      const data = await InvenBackgroundCollection.get();
      setInvenBackground(data._docs.map(doc => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.log(error.message);
    }
  };
  const updateBackground = (newaddress) => {
    usersBackgroundCollection.update({address:newaddress});
    console.log('저장완료');  
    console.log(newaddress);
    setBacksaddress(newaddress);
  }
  const getMinipatInven = async () => {
    try {
      const data = await InvenMinipatCollection.get();
      setInvenMinipat(data._docs.map(doc => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.log(error.message);
    }
  };
  const updateMinipat = (newaddress) => {
    usersMinipatCollection.update({address:newaddress});
    console.log('저장완료');  
    console.log(newaddress);
    setMinipat(newaddress);
  }

   useEffect(() => {
     getBackgroundData();
     getMinime();
     getTool();
     getMinipatData();
     getMinimeInven();
     getBackgroundInven();
     getToolInven();
     getMinipatInven();
     return () => {
       onSave();
     }
   }, [tooladdress,Backaddress,BuyItem,placeX,countItem,isMinime]);
  
  
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
  const CategoryList = () => {
    return (
      
      <View style={styles.categoryContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setCategoryIndex(index)}>
            <Text
              style={[
                styles.categoryText,
                catergoryIndex === index && styles.categoryTextSelected,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const Card = ({plant}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          {
            if (catergoryIndex === 0) return addTool(plant.address,plant.name);
            if (catergoryIndex === 1) return updateMinime(plant.address);
            if (catergoryIndex === 2) return updateBackground(plant.address);
            if (catergoryIndex === 3) return updateMinipat(plant.address);
        }
          }}>
        <View style={styles.card}>
          <View
            style={{
              height: 70,
              alignItems: 'center',
              justifyContent:'center',
            }}>
            <Image
              source={{uri:plant.address}}
              style={{flex: 1, resizeMode: 'contain',aspectRatio: 1.0,}}
            />
          </View>          
        </View>
      </TouchableOpacity>
    );
  };

  return (

    <View style={{flex:1}}>
              

    <ViewShot style ={{flex : 1}} ref={captureRef} options={{ format: 'jpg', quality: 0.9 }}>

    <View style={{flex:1,width:'100%',height:'100%'}}>


          <ImageBackground style={styles.background} source={{uri:`${Back ? Back : initial}`}}></ ImageBackground>

              </View>
          < Image style={styles.minime} source={{uri:`${Minime ? Minime : initial}`}}></ Image>
          < Image style={styles.minipat} source={{uri:`${Minipat ? Minipat : initial}`}}></ Image>
            <View style={styles.item}>
            {
        tool?.map((row, idx) => {
         {
            return  <MiniroomBox test={row.address} name={row.name} x={row.getx} y={row.gety}></MiniroomBox>} 
      })
      }
            </View>
            </ViewShot>
            <SafeAreaView
      style={{flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.white}}>
            <CategoryList />
            <FlatList
        columnWrapperStyle={{justifyContent: 'flex-start'}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50,
        }}
        numColumns={4}
        data={
          (function() {
            if (catergoryIndex === 0) return InvenTool;
            if (catergoryIndex === 1) return InvenMinime;
            if (catergoryIndex === 2) return InvenBackground;
            if (catergoryIndex === 3) return InvenMinipat;
          })()
        }
        renderItem={({item}) => {
          return <Card plant={item} />;
        }}
      />
        </SafeAreaView>
    </View>
    
  ); 
};

export default Miniroom;
const styles = StyleSheet.create({
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
    },
    minipat: {
      resizeMode:'stretch',
      position: 'absolute',
      transform: [{translateX: 350} , {translateY:220}],
      width:100,
      height:100,
    },
    categoryContainer: {
      flexDirection: 'row',
      marginTop: 30,
      marginBottom: 20,
      justifyContent: 'space-between',
    },
    categoryText: {fontSize: 16, color: 'grey', fontFamily : "Jalnan"},
    categoryTextSelected: {
      color: COLORS.orange,
      paddingBottom: 5,
      borderBottomWidth: 2,
      borderColor: COLORS.orange,
    },
    card: {
      height: 90,
      width: 90,
      backgroundColor: COLORS.light,
      marginHorizontal: 2,
      borderRadius: 10,
      marginBottom: 20,
      alignItems: 'center',
      justifyContent:'center',
    },
    header: {
      marginTop: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    searchContainer: {
      height: 50,
      backgroundColor: COLORS.light,
      borderRadius: 10,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      fontSize: 18,
      fontWeight: 'bold',
      flex: 1,
      color: COLORS.dark,
    },
    sortBtn: {
      marginLeft: 10,
      height: 50,
      width: 50,
      borderRadius: 10,
      backgroundColor: COLORS.green,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });