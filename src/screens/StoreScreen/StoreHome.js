import React,{ useState,useEffect,useContext} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions
  ,TouchableOpacity
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../StoreScreen/colors';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../utils/AuthProvider';
import useStore from '../../../store/store';

const width = Dimensions.get('window').width / 2 - 30;

const StoreHome = ({navigation}) => {
  const usersCollection = firestore().collection('shops').doc('shopitems').collection('tool');
  const usersCollectionM = firestore().collection('shops').doc('shopitems').collection('minime');
  const usersCollectionB = firestore().collection('shops').doc('shopitems').collection('background');
  const usersCollectionP = firestore().collection('shops').doc('shopitems').collection('minipat');
  const categories = ['가구', '미니미', '배경','미니펫'];
  
  const {user, logout} = useContext(AuthContext);
  const {isPoint,setPoint} = useStore();
  const [catergoryIndex, setCategoryIndex] = useState(0);
  const [tool, setTool] = useState();
  const [minime, setminime] = useState();
  const [Background, setBackground] = useState();
  const [Minipat, setMinipat] = useState();
  const [userData, setUserData] = useState(null);
  
  const getUser = async() => {
    const currentUser = await firestore()
    .collection('users')
    .doc(user.uid)
    .get()
    .then((documentSnapshot) => {
      if( documentSnapshot.exists ) {
        console.log('User Data', documentSnapshot.data());
        setUserData(documentSnapshot.data());
      }
    })
  }
  const getShopData = async () => {
    try {
      const data = await usersCollection.get();
      setTool(data._docs.map(doc => ({ ...doc.data(), id: doc.id })));
      console.log('T');
    } catch (error) {
      console.log(error.message);
    }
  };
  const getShopDataM = async () => {
    try {
      const data = await usersCollectionM.get();
      setminime(data._docs.map(doc => ({ ...doc.data(), id: doc.id })));
      console.log('M');
    } catch (error) {
      console.log(error.message);
    }
  };
  const getShopDataB = async () => {
    try {
      const data = await usersCollectionB.get();
      setBackground(data._docs.map(doc => ({ ...doc.data(), id: doc.id })));
      console.log('B');
    } catch (error) {
      console.log(error.message);
    }
  };
  const getShopDataP = async () => {
    try {
      const data = await usersCollectionP.get();
      setMinipat(data._docs.map(doc => ({ ...doc.data(), id: doc.id })));
      console.log('B');
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getShopData();
    getShopDataM();
    getShopDataB();
    getShopDataP();
    getUser();
  }, []);
  useEffect(() => {
    getUser();
  }, [isPoint]);
  const CategoryList = () => {
    return (
      
      <View style={style.categoryContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setCategoryIndex(index)}>
            <Text
              style={[
                style.categoryText,
                catergoryIndex === index && style.categoryTextSelected,
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
        onPress={() => navigation.navigate('Details', plant)}>
        <View style={style.card}>
          <View style={{alignItems: 'flex-end'}}>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: //plant.like
                  //? 'rgba(245, 42, 42,0.2)': 
                  'rgba(0,0,0,0.2) ',
              }}>
              <Icon
                name="favorite"
                size={18}
                //color={plant.like ? COLORS.red : COLORS.black}
              />
            </View>
          </View>

          <View
            style={{
              height: 90,
              alignItems: 'center',
            }}>
            <Image
              source={{uri:plant.address}}
              style={{flex: 1, resizeMode: 'contain',aspectRatio: 1.0,}}
            />
          </View>

          <Text style={{ fontFamily : "Jalnan", fontSize: 17, marginTop: 10}}>
            {plant.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <Text style={{fontSize: 19,  fontFamily : "Jalnan"}}>
            ₩{plant.price}
            </Text>
            <View
              style={{
                height: 25,
                width: 25,
                backgroundColor: COLORS.green,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{fontSize: 22, color: COLORS.white, fontWeight: 'bold'}}>
                +
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView
      style={{flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.white}}>
      <View style={style.header}>
        <View>        
          <Text style={{fontSize: 25,  fontFamily : "Jalnan"}}>환영합니다 !</Text>
          <Text style={{fontSize: 38, color: COLORS.orange,  fontFamily : "Jalnan"}}>
            미니룸 상점
          </Text>
        </View>
        <Text style={{ fontFamily : "Jalnan"}}>보유 포인트 {userData ? userData.point : ''}</Text>
      </View>
      
      <CategoryList />
      <FlatList
        columnWrapperStyle={{justifyContent: 'space-between'}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50,
        }}
        numColumns={2}
        data={
          (function() {
            if (catergoryIndex === 0) return tool;
            if (catergoryIndex === 1) return minime;
            if (catergoryIndex === 2) return Background;
            if (catergoryIndex === 3) return Minipat;
          })()
        }
        renderItem={({item}) => {
          return <Card plant={item} />;
        }}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
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
    height: 225,
    backgroundColor: COLORS.light,
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
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
export default StoreHome;