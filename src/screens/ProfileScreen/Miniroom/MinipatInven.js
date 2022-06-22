import { View, Text,TouchableOpacity,StyleSheet,Image,SafeAreaView,Button,Dimensions,ScrollView} from 'react-native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import React,{useState,useEffect} from 'react'
import firebase  from '@react-native-firebase/app';
import useStore from '../../../../store/store';

const MinipatInven = () => {
  const usersCollection = firestore().collection('Inventory').doc(firebase.auth().currentUser.uid).collection('minipat');
  const addBackground = firestore().collection('miniroom').doc(firebase.auth().currentUser.uid).collection('room').doc(firebase.auth().currentUser.uid);
  const {setisMinipat,BuyItem} = useStore();
  const [tool, setTool] = useState();
   
  const getShopData = async () => {
    try {
      const data = await usersCollection.get();
      setTool(data._docs.map(doc => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.log(error.message);
    }
  };
  const updateMinime = (newaddress) => {
    addBackground.collection('minipat').doc(firebase.auth().currentUser.uid+ 'mid').update({address:newaddress});
    //addBackground.collection('background').add({address:newaddress});
    console.log('저장완료');  
    console.log(newaddress);
    setisMinipat(newaddress);
  };
  useEffect(() => {
    getShopData();
  }, [BuyItem]);

  return (
    <ScrollView>
    <View style={styles.container}>
      {
        tool?.map((row, idx) => {
          {
            return  <TouchableOpacity onPress={()=>{updateMinime(row.address)}} style={{}}>
            <Image source ={{uri:row.address}} style={{width:70,height:70,}} resizeMode="contain" resizeMethod = 'resize' ></Image>
            </TouchableOpacity>;} 
      })
      }
    </View>
    
    </ScrollView>
  )
}
export default MinipatInven;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // 혹은 'column'
    padding: 20,
    alignItems: 'center',
    flexWrap:"wrap",
},
});

