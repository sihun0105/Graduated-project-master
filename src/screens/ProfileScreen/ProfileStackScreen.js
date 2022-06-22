import { View, Text,StyleSheet } from 'react-native';
import React from 'react';
import EditProfile from './EditProfile';
import Music from './Music/Music';
import Friend from './Friend/Friend';
import Diary from './Diary/Diary';
import AddDiary from './Diary/AddDiary';
import Album from './Albums/Album';
import Weblog from './GuestBook/Weblog';
import Miniroom from './Miniroom/Miniroom';
import ProfileScreen from './ProfileScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Requset from './Friend/Requset';
import Photos from './Albums/Photos';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SNSProfileScreen from './SNSprofileScreen';
import AlbumSetting from './Albums/AlbumSetting';
import AddFolder from './Albums/AddFolder';
import AddPhotos from './Albums/AddPhotos';
import PhotoDetail from './Albums/PhotoDetail';
import Comment from './Albums/Comment';
import PointGuide from '../SettingScreen/PointGuide';

const Stack = createNativeStackNavigator();
const ProfileStackScreen = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
                <Stack.Screen
                    name="HomeProfileScreen"
                    component={ProfileScreen}
                    options={{
                    headerShown: false,
                    }}
                    />
                    

                <Stack.Screen
                    name="ProfileScreen"
                    component={ProfileScreen}
                    options={{
                      headerShown: false,

                 
                    }}
                  />
                <Stack.Screen
                    name="PointGuide"
                    component={PointGuide}
                    options={{
                    title: '포인트 가이드',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                      fontFamily: 'Jalnan',
                      color : 'orange'
                     },
                    headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                    
          
                    },
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                    <View style={{marginLeft: 15}}>
                    <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                      </View>
                    ),
                    }}
                  />
             
                <Stack.Screen
                    name="SNSProfile"
                    component={SNSProfileScreen}
                    options={{
                    title: 'SNS Profile',
                    headerTitleStyle: {
                      fontFamily: 'Jalnan',
                      color : '#696969'
                     },
                    headerTitleAlign: 'center',
                    headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                    
          
                    },
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
       <            View style={{marginLeft: 15}}>
                    <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                    </View>
                    ),
                    }}
                    />

                <Stack.Screen
                    name="EditProfile"
                    component={EditProfile}
                    options={{
                    title: '프로필을 변경해보세요!',
                    headerTitleStyle: {
                      fontFamily: 'Jalnan',
                      color : 'orange'
                     },
                    headerTitleAlign: 'center',
                    headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                    
          
                    },
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                    <View style={{marginLeft: 15}}>
                    <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                      </View>
                    ),
                    }}
                  />
                  <Stack.Screen
                    name="Music"
                    component={Music}
                    options={{
                    title: '',
                    headerTitleAlign: 'center',
                    headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                    
          
                    },
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                    <View style={{marginLeft: 15}}>
                    <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                      </View>
                    ),
                    }}
                  />
                  <Stack.Screen
                    name="Requset"
                    component={Requset}
                    options={{
                    title: '친구 요청',
                    headerTitleStyle: {
                      fontFamily: 'Jalnan',
                      color : '#696969'
                     },
                    headerTitleAlign: 'center',
                    headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                    
          
                    },
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                    <View style={{marginLeft: 15}}>
                    <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                      </View>
                    ),
                    }}
                  />

                  <Stack.Screen
                    name="Friend"
                    component={Friend}
                    options={{
                    title: '친구',
                    headerTitleStyle: {
                      fontFamily: 'Jalnan',
                      color : '#696969'
                     },
                    headerTitleAlign: 'center',
                    headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                    
          
                    },
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                    <View style={{marginLeft: 15}}>
                    <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                      </View>
                    ),
                    }}
                  />
                     <Stack.Screen
                    name="Diary"
                    component={Diary}
                    options={{
                    title: '다이어리',
                    headerTitleStyle: {
                      fontFamily: 'Jalnan',
                      color : '#696969'
                     },
                    headerTitleAlign: 'center',
                    headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                    
          
                    },
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                    <View style={{marginLeft: 15}}>
                    <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                      </View>
                    ),
                    }}
                  />
                 
                  <Stack.Screen 
                  name="AddDiary" 
                  component={AddDiary}
                  options={{
                    title: '일기를 작성해보세요!',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                     fontFamily: 'Jalnan',
                     color : '#696969'
                    },
                    headerStyle: {
                      shadowColor: '#fff',
                      elevation: 0,
                      backgroundColor : '#fff'
                    },
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                      <View style={{marginLeft: 15}}>
                        <Ionicons name="arrow-back" size={25} color="black" />
                      </View>
                    ),
                  }}
                />
                  <Stack.Screen
                    name="Album"
                    component={Album}
                    options={{
                    title: '앨범',
                    headerTitleStyle: {
                      fontFamily: 'Jalnan',
                      color : '#696969'
                     },
                    headerTitleAlign: 'center',
                    headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                    unmountOnBlur: true
          
                    },
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                    <View style={{marginLeft: 15}}>
                    <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                      </View>
                    ),
                    
                    }}
                  />
                  <Stack.Screen
                    name="AlbumSetting"
                    component={AlbumSetting}
                    options={{
                      headerShown: false,

                 
                    }}
                  />

                  <Stack.Screen
                    name="AddFolder"
                    component={AddFolder}
                    options={{
                    title: '폴더 관리',
                    headerTitleAlign: 'center',
                    headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                    
          
                    },
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                    <View style={{marginLeft: 15}}>
                    <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                      </View>
                    ),
                    }}
                  />
                 
                  <Stack.Screen
                    name="Photos"
                    component={Photos}
                    options={{
                    title: '사진',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                      fontFamily: 'Jalnan',
                      color : '#696969'
                     },
                    headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                    
          
                    },
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                    <View style={{marginLeft: 15}}>
                    <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                      </View>
                    ),
                    }}
                  />
                  <Stack.Screen
                    name="AddPhotos"
                    component={AddPhotos}
                    options={{
                    title: '사진을 올려보세요!',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                      fontFamily: 'Jalnan',
                      color : 'orange'
                     },
                    headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                    
          
                    },
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                    <View style={{marginLeft: 15}}>
                    <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                      </View>
                    ),
                    }}
                  />
                  <Stack.Screen
                    name="PhotoDetail"
                    component={PhotoDetail}
                    options={{
                      headerShown: false,

                 
                    }}
                  />

                  <Stack.Screen
                    name="Comment"
                    component={Comment}
                    options={{
                    title: '댓글',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                      fontFamily: 'Jalnan',
                      color : '#696969'
                     },
                    headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                    
          
                    },
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                    <View style={{marginLeft: 15}}>
                    <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                      </View>
                    ),
                    }}
                  />
                  <Stack.Screen
                    name="Weblog"
                    component={Weblog}
                    options={{
                    title: '방명록',
                    headerTitleAlign: 'center',   
                     headerTitleStyle: {
                      fontFamily: 'Jalnan',
                      color : '#696969'
                     },
                    headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                    
          
                    },
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                    <View style={{marginLeft: 15}}>
                    <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                      </View>
                    ),
                    }}
                  />
                  
                  <Stack.Screen
                    name="Miniroom"
                    component={Miniroom}
                    options={{
                      headerShown : true,
          
                     
          
                      title: '미니룸',
                    headerTitleAlign: 'center',   
                     headerTitleStyle: {
                      fontFamily: 'Jalnan',
                      color : '#696969'
                     },
                    headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                    
          
                    },
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                    <View style={{marginLeft: 15}}>
                    <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                      </View>
                    
                    ),
                    
                    
                     }}
                  />

                

                
            </Stack.Navigator>
  );
};

export default ProfileStackScreen;