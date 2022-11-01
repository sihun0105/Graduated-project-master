import { View, Text,TouchableOpacity,StyleSheet,FlatList,Image,Alert,RefreshControl,TextInput} from 'react-native';
import React, {useState, useEffect, useContext,useCallback} from 'react';
import { AuthContext } from '../../../utils/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import firebase  from '@react-native-firebase/app';
import { useNavigation } from "@react-navigation/native";

const Friend = () => {
  const [refreshing, setRefreshing] = useState(false);

  const {user, logout} = useContext(AuthContext);
  const [friendData, setFriendData] = useState(null);
  const [deleted, setDeleted] = useState(false);

  const navigation = useNavigation();

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const getFriend = async() => {
    const querySanp = await firestore()
    .collection('friends')
    .doc(firebase.auth().currentUser.uid)
    .collection('friendsinfo')
    .orderBy('postTime', 'desc')
    .get()

    const allfriends = querySanp.docs.map(docSnap=>docSnap.data())
    setFriendData(allfriends)
      
    
  }

  const DeleteFriendCheck = (item) => {
    Alert.alert(
      '친구을 삭제합니다',
      '확실합니까?',
      [
        {
          text: '취소',
          onPress: () => console.log('Cancel Pressed!'),
          style: '취소',
        },
        {
          text: '확인',
          onPress: () => DeleteFriend(item),
        },
      ],
      {cancelable: false},
    );
  };

  const ChangeSname = (item) => {
    Alert.alert(
      '친구을 삭제합니다',
      '확실합니까?',
      [
        {
          text: '취소',
          onPress: () => console.log('Cancel Pressed!'),
          style: '취소',
        },
        {
          text: '확인',
          onPress: () => DeleteFriend(item),
        },
      ],
      {cancelable: false},
    );
  };
  
  const DeleteFriend = (item) => {
    

    firestore()
      .collection('friends')
      .doc(firebase.auth().currentUser.uid)
      .collection('friendsinfo')
      .doc(item.uid)
      .delete()
      .then(() => {
       
        console.log('삭제 성공!');
        Alert.alert(
          '친구 삭제 완료!',
          );

        setDeleted(true);

        
  
        
      })
      .catch((error) => {
        console.log('error.', error);
      });
    
  };
  useEffect(() => {
    getFriend();
    setDeleted(false);
  }, [deleted,refreshing]);


  const RenderCard = ({item})=>{
    return (
        <View style={{flexDirection:'row',flex:1,width:370,marginBottom: 10}}>
          
          <View style={{width:40,height:40,marginRight:20}}>
                 <TouchableOpacity style={styles.imageContainer} onPress={() => navigation.navigate('ProfileScreen', {uid: item.uid})}>
            <Image style={styles.image} source={{uri: item.userimg}}/>
          </TouchableOpacity>
          </View>
          
          <View style={{flexDirection:'row',flex: 1, justifyContent: "space-between", alignItems: "center"}}>
          <Text style={{fontFamily : "Jalnan",marginLeft : 10}}>{item.name}</Text>
          <TouchableOpacity style={{}} onPress={() => ChangeSname(item)}>
          <Text style={{fontFamily : "Jalnan",marginLeft : 30}}>{item.sname}</Text>
          </TouchableOpacity>
          <Text style={{fontFamily : "Jalnan",marginLeft : 20}}>{item.birthday}</Text>
          <TouchableOpacity style={styles.button} onPress={() => DeleteFriendCheck(item)}>
              <Text style={styles.userBtnTxt}>삭제</Text>
          </TouchableOpacity>
          </View>
        
        </View>
    )
}
    return (
    <View style={styles.container}>
        <Text style={{fontSize:20, paddingBottom: 10, fontFamily : "Jalnan"}}>친구 목록</Text>
        <View style={styles.title}>
        <View style={{width:40}}></View>
          <Text style={{flex:1,textAlign: 'center',fontFamily : "Jalnan"}}>이름</Text>
          <Text style={{flex:1,textAlign: 'center',fontFamily : "Jalnan"}}>별명</Text>
          <Text style={{flex:1,textAlign: 'center',fontFamily : "Jalnan"}}>생일</Text>  
          <View style={{width:40}}></View>
          
        </View>
        <FlatList 
          data={friendData}
          renderItem={({item})=> {return <RenderCard item={item} />
        
        }}

        refreshControl={
          <RefreshControl
             refreshing={refreshing}
             onRefresh={onRefresh}
           />
         }
        />
      
        
        
        </View>
        
        
    
  );
};

export default Friend;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column', // 혹은 'column'
      backgroundColor: '#fff',
      padding: 10,
      alignItems: 'center',
    },
    title:{
      flexDirection: 'row', // 혹은 'column'
      marginBottom:10,
    },
    title2:{
      flexDirection: 'row', // 혹은 'column'
    },
    miniroom: {
      width:'100%', 
      height:150,
      justifyContent: 'space-around',
      alignItems:'center',
      marginTop: 30,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderColor: 'green',

    },
    imageContainer: {
      borderRadius: 20,
      height: 40,
      width: 40,
      overflow: 'hidden',
    },
    image: {
      height: 40,
      width: 40
    },
    
    textInput: {
      marginTop: 20,
      marginBottom: 10,
      paddingHorizontal: 10,
      height: 40,
      borderRadius: 10,
      borderColor: 'gray',
      borderWidth: 1
    },
    button: {
      marginRight:10,
      width: 50,
      height: 30,
      backgroundColor: "orange",
      borderColor: 'orange',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      borderBottomColor:'#fff',
      justifyContent: "center",
      alignItems: "center"
     
    },
    userBtnTxt: {
      fontFamily: "Jalnan",
      color: '#fff',
      textAlign:'center',  
      fontSize:15,
    },
  });
