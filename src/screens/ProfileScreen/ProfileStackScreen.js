import { View, Text,StyleSheet } from 'react-native';
import React from 'react';
import EditProfile from './EditProfile';
import Music from './Music/Music';
import Friend from './Friend/Friend';
import Diary from './Diary/Diary';
import Album from './Album';
import Weblog from './GuestBook/Weblog';
import Miniroom from './Miniroom/Miniroom';
import ProfileScreen from './ProfileScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Requset from './Friend/Requset';
import SNSProfileScreen from './SNSprofileScreen';
const Stack = createNativeStackNavigator();
const ProfileStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
                <Stack.Screen
                    name="ProfileScreen"
                    component={ProfileScreen}
                    options={{
                    headerShown: false,
                    }}
                    />
             
                <Stack.Screen
                    name="SNSProfile"
                    component={SNSProfileScreen}
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
                    name="Album"
                    component={Album}
                    options={{
                    title: '앨범',
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
                    name="Weblog"
                    component={Weblog}
                    options={{
                    title: '방명록',
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
                    name="Miniroom"
                    component={Miniroom}
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

                

                
            </Stack.Navigator>
  );
};

export default ProfileStackScreen;
