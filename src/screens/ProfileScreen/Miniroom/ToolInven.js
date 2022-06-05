import { View, Text,TouchableOpacity,StyleSheet,Image,SafeAreaView,Button,Dimensions,ScrollView} from 'react-native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore'; 
import firebase  from '@react-native-firebase/app';
import React,{useState,useEffect} from 'react'
import { DraxView,DraxProvider,DraxList } from 'react-native-drax';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import useStore from '../../../../store/store';

const ToolInven = () => {

  const {tooladdress,settooladdress,BuyItem,countItem,setcountItem,} = useStore();
  const usersCollection = firestore().collection('Inventory').doc(firebase.auth().currentUser.uid).collection('tool'); 
  const [tool, setTool] = useState();
  const getShopData = async () => {
    try {
      const data = await usersCollection.get();
      setTool(data._docs.map(doc => ({ ...doc.data(), id: doc.id, })));
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getShopData();
  }, [BuyItem,countItem]);
  const pushTool =(address,name) => {
    firestore().collection('miniroom').doc(firebase.auth().currentUser.uid).collection('room').doc(firebase.auth().currentUser.uid).collection('tool').doc(name).set({
      name:name,
      address:address,
      getx:223,
      gety:217});
    console.log('추가완료');
    console.log(name);
    settooladdress(address);
    setcountItem();
    console.log(countItem);
  }
  return (
    <View>
    <ScrollView>
    <View style={styles.container}>
      {
        tool?.map((row, idx) => {
         {
            return  <TouchableOpacity onPress={()=>{pushTool(row.address,row.name)}} style={{borderWidth:1}}>
            <Image source ={{uri:row.address}} style={{width:70,height:70,}} resizeMode="contain" ></Image>
            </TouchableOpacity>;} 
      })
      }
    </View>
    </ScrollView>
    </View>
  )
}
export default ToolInven;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // 혹은 'column'
    padding: 20,
    alignItems: 'center',
    flexWrap:"wrap",
},
});