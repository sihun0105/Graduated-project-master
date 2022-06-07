
import { View, Text,TouchableOpacity,StyleSheet,SafeAreaView,Image,RefreshControl,Alert} from 'react-native';
import React, {useEffect,useCallback,useState } from 'react';
import {Agenda, Calendar, CalendarList} from 'react-native-calendars';
import { Card } from 'react-native-paper';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import firebase  from '@react-native-firebase/app';
import {LocaleConfig} from 'react-native-calendars';
import { onChange } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';
import useStore from '../../../../store/store'

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['일요일','월요일', '화요일','수요일','목요일','금요일','토요일'],
  dayNamesShort: ['일', '월','화','수','목','금','토'],
  today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';





const Diary = ({onDelete}) => {
  const {DiaryPost,Checkday,setCheckday2} = useStore();
  const [posts, setPosts] = useState(null);
  const navigation = useNavigation();
  const [DiaryData, setDiaryData] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [checkday, setCheckday] = useState([]);
  const usersDiaryCollection = firestore().collection('Diary').doc(firebase.auth().currentUser.uid).collection('DiaryDetails');

  
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getDiary = async() => {
    console.log('================================')
    console.log(Checkday);
    const querySanp = await firestore()
    .collection('Diary')
    .doc(firebase.auth().currentUser.uid)
    .collection('DiaryDetails')
    .doc(Checkday)
    .get()
    .then((documentSnapshot) => {
      if( documentSnapshot.exists ) {
        setDiaryData(documentSnapshot.data());
        console.log(documentSnapshot.data());
      }console.log('xxx');
    })
  
  
 
    
  }

  

  const onAddDiarypress = () => {
    navigation.navigate('AddDiary');
  };

  const handleDelete = (postId) => {
    Alert.alert(
      '글 삭제하기',
      '확실합니까?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deletePost(postId),
        },
      ],
      {cancelable: false},
    );
  };

  const deletePost = (postId) => {
    console.log('Current Post Id: ', postId);

    firestore()
    .collection('Diary')
    .doc(firebase.auth().currentUser.uid)
    .collection('DiaryDetails')
    .doc(postId)
    .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          const {img} = documentSnapshot.data();

          if (img != null) {
            const storageRef = storage().refFromURL(img);
            const imageRef = storage().ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                console.log(`${img} 성공적으로 삭제되었습니다.`);
                deleteFirestoreData(postId);
              })
              .catch((e) => {
                console.log('Error while deleting the image. ', e);
              });
            // If the post image is not available
          } else {
            deleteFirestoreData(postId);
          }
        }
      });
  };

  const deleteFirestoreData = (postId) => {
    firestore()
    .collection('Diary')
    .doc(firebase.auth().currentUser.uid)
    .collection('DiaryDetails')
    .doc(postId)
      .delete()
      .then(() => {
        Alert.alert(
          '글이 삭제되었습니다.',
          '당신의 글이 성공적으로 삭제되었습니다!',
        );
        setDeleted(true);
      })
      .catch((e) => console.log('Error deleting posst.', e));
  };

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

  useEffect(() => {
    getDiary();
    getUser();
    setDeleted(false);
  }, [deleted,refreshing,Checkday]);




  return (
    <View>
    <ScrollView>
    <View style={{backgroundColor : '#fff'}}>

    <Calendar 
    onDayPress={(day) => {
      console.log('selected day', day)
     
       setCheckday(day.dateString)
         
      
      setCheckday2(day.dateString);
  }}
  
    monthFormat={'yyyy년 M월'} />
    
    
    <TouchableOpacity Style={styles.itemConstainer}>
    <View style={styles.content}>
  <View style={styles.diaryTitle}>
  <Text style={{fontSize : 20,fontFamily: 'DungGeunMo'}}>{DiaryData.post}</Text>
  <Text style={styles.checkday}>{checkday}</Text>
  </View>
  
  <View style={styles.picContainer}>
<Image  source={{uri: DiaryData.img}} style={styles.pic}/> 
  </View>
  <Text style={{fontSize : 20,fontFamily: 'DungGeunMo'}}>{DiaryData.body}</Text>
    </View>
  </TouchableOpacity>
   
</View>
</ScrollView>
<ActionButton buttonColor="rgb(255, 165, 0)" title="다이어리작성" onPress={()=>onAddDiarypress()}>
          <Icon name="createDiary" style={styles.actionButtonIcon} />
          </ActionButton>
</View>

);
};

export default Diary;

const styles = StyleSheet.create({
itemConstainer:{
  width:'100%',

  },
  content:{    
    marginLeft:40,
    marginTop:20,
    marginRight:20,

  },
  checkday:{
    fontSize : 20,
    alignSelf: 'flex-end',
    fontSize:18,
    marginRight:40,
    fontFamily: 'DungGeunMo'
  },
  diaryTitle:{
    marginBottom:10,
  },
  picContainer:{
    width:200,
    height:200,
    marginLeft:60,
    marginTop:20,
    marginBottom:20,
  },
  pic:{
    width:'100%',
    height:'100%',

  },
  line:{
    marginTop:10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,

  },
  iconContainer:{
    flexDirection: 'row',

  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  title:{ 
    height:50,
    backgroundColor: '#fff',
    flexDirection: 'row', 
    
   
  },
  userImg: {
    height: 200,
    width: 200,
    resizeMode : 'stretch',
    backgroundColor: '#fff',
    flex: 1,
  },

})