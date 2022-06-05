import React, {createContext, useState,useEffect} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-community/google-signin';
import firebase from '@react-native-firebase/app'
import { useCardAnimation } from '@react-navigation/stack';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  const getUser = async() => {
    const currentUser = await firestore()
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

    getUser();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password)
            .then(() => {
             
              firestore()
              .collection('users')
              .doc(firebase.auth().currentUser.uid)
              .update({
                point :  userData.point + 10
              })
              Alert.alert(
                '10 포인트가 지급 되었습니다.',
              ).catch(error => {
                  console.log('Something went wrong with added user to firestore: ', error);
              })
            })
          
          
        
           
           
          } catch (e) {
            console.log(e);
          }
        },
        googleLogin: async () => {
          try {
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            await auth().signInWithCredential(googleCredential)
            // Use it only when user Sign's up, 
            // so create different social signup function
            // .then(() => {
            //   //Once the user creation has happened successfully, we can add the currentUser into firestore
            //   //with the appropriate details.
            //   // console.log('current User', auth().currentUser);
            //   firestore().collection('users').doc(auth().currentUser.uid)
            //   .set({
            //       fname: '',
            //       lname: '',
            //       email: auth().currentUser.email,
            //       createdAt: firestore.Timestamp.fromDate(new Date()),
            //       userImg: null,
            //   })
            //   //ensure we catch any errors at this stage to advise us if something does go wrong
            //   .catch(error => {
            //       console.log('Something went wrong with added user to firestore: ', error);
            //   })
            // })
            //we need to catch the whole sign up process if it fails too.
            .catch(error => {
                console.log('Something went wrong with sign up: ', error);
            });
          } catch(error) {
            console.log({error});
          }
        },
        /*fbLogin: async () => {
          try {
            // Attempt login with permissions
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

            if (result.isCancelled) {
              throw 'User cancelled the login process';
            }

            // Once signed in, get the users AccesToken
            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
              throw 'Something went wrong obtaining access token';
            }

            // Create a Firebase credential with the AccessToken
            const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

            // Sign-in the user with the credential
            await auth().signInWithCredential(facebookCredential)
            // Use it only when user Sign's up, 
            // so create different social signup function
            // .then(() => {
            //   //Once the user creation has happened successfully, we can add the currentUser into firestore
            //   //with the appropriate details.
            //   console.log('current User', auth().currentUser);
            //   firestore().collection('users').doc(auth().currentUser.uid)
            //   .set({
            //       fname: '',
            //       lname: '',
            //       email: auth().currentUser.email,
            //       createdAt: firestore.Timestamp.fromDate(new Date()),
            //       userImg: null,
            //   })
            //   //ensure we catch any errors at this stage to advise us if something does go wrong
            //   .catch(error => {
            //       console.log('Something went wrong with added user to firestore: ', error);
            //   })
            // })
            //we need to catch the whole sign up process if it fails too.
            .catch(error => {
                console.log('Something went wrong with sign up: ', error);
            });
          } catch(error) {
            console.log({error});
          }
        },*/
        
        register: async (email, password,phone,name,age,birthday,about,uid) => { 
          const currentMiniroomId = Math.floor(100000 + Math.random() * 9000).toString();
          try {
            await auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
              firestore().collection('users').doc(auth().currentUser.uid)
              .set({
                  name: name,
                  email: email,
                  phone: phone,
                  age: age,
                  uid: auth().currentUser.uid,
                  point: 1000,
                  about: null,
                  birthday: birthday,
                  createdAt: firestore.Timestamp.fromDate(new Date()),
                  userImg: 'https://firebasestorage.googleapis.com/v0/b/graduated-project-ce605.appspot.com/o/AppImage%2Fprofile.jpg?alt=media&token=719929c2-defb-4cbf-99ca-fddd21bfeaa4'
                }).then(() => {
                  firestore()
                .collection('Albums')
                .doc(auth().currentUser.uid)
                .collection('groups').doc('전체사진')
                .set({
                  name : '전체사진',
                  postTime: firestore.Timestamp.fromDate(new Date()),
                }).then(() => {
                  firestore()
                .collection('Albums')
                .doc(auth().currentUser.uid)
                .collection('groups').doc('기본 사진첩')
                .set({
                  name : '기본 사진첩',
                  postTime: firestore.Timestamp.fromDate(new Date()),
                }).then(() => {
                  firestore().collection('miniroom').doc(auth().currentUser.uid).collection('room').doc(auth().currentUser.uid).collection('background').doc(auth().currentUser.uid+ 'mid').set({
                    background: 'https://firebasestorage.googleapis.com/v0/b/graduated-project-ce605.appspot.com/o/Background%2Fbackground1.png?alt=media&token=f59b87fe-3a69-46b9-aed6-6455dd80ba45'
                  })
                  firestore().collection('miniroom').doc(auth().currentUser.uid).collection('room').doc(auth().currentUser.uid).collection('minime').doc(auth().currentUser.uid+ 'mid').set({
                    address: 'https://firebasestorage.googleapis.com/v0/b/graduated-project-ce605.appspot.com/o/Minimi%2Fboy.png?alt=media&token=9497cbc4-b2b1-4000-9c03-fcba87f24998'
                  }).catch(error => {
                  console.log('Something went wrong with added user to firestore: ', error);
              })
            })
          })
          })
        })
            //we need to catch the whole sign up process if it fails too.
            .catch(error => {
                console.log('Something went wrong with sign up: ', error);
            });
          } catch (e) {
            console.log(e);
          }
        },
        
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
