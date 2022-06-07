import { View, Text ,Image,FlatList,StyleSheet,TouchableOpacity,TextInput,Dimensions,ScrollView} from 'react-native'
import React,{useState,useEffect,useContext} from 'react'
import SearchBar from "react-native-dynamic-search-bar";
import firestore from '@react-native-firebase/firestore'
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase  from '@react-native-firebase/app';
import useStore from '../../../store/store';
import Loading from '../../utils/Loading';
import { VirtualizedScrollView } from 'react-native-virtualized-view';
var { height, width } = Dimensions.get('window');

const SearchScreen = ({props,navigation}) => {
  const {Post} = useStore(); // 0522새로고침용
  const [posts,setPosts] = useState(null)
  const [serachposts, searchsetPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [count, setcount] = useState(null);
  const [Bestposts,setBestPosts] = useState(null)
  const [ready, setReady] = useState(true)
  const [Lsearch, setLsearch]  = useState(true)

  const tags = ["인물", "배경", "음식", "동물", "물건", "문화"]
  const [changepost,setchangePosts] = useState(null)
  
  const getPosts = async ()=>{
    const querySanp = await firestore().collection('posts').orderBy('postTime', 'desc').get()
    const allposts = querySanp.docs.map(docSnap=>docSnap.data())
   //  console.log(allusers)
   setchangePosts(allposts)
}
const getBestPosts = async ()=>{
  const querySanp = await firestore()
  .collection('posts')
  .orderBy('likes', 'desc')
  .limit((5))
  .get()
  const allposts = querySanp.docs.map(docSnap=>docSnap.data())
 //  console.log(allusers)
 setBestPosts(allposts)
}


const handleSearchTextChange =  async (text) => {
  
  try {
    const list = [];

    await firestore()
      .collection('posts')
      .where('tag', '==' , text)
      .orderBy('postTime', 'desc')
      .get()
      .then((querySnapshot) => {
        // console.log('Total Posts: ', querySnapshot.size);

        querySnapshot.forEach((doc) => {
          const {
            uid,
            post,
            postImg,
            postTime,
            tag,
            likes,
            comments,
          } = doc.data();
          list.push({
            id: doc.id,
            uid,
            userName: 'Test Name',
            userImg:
              'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
            postTime: postTime,
            tag,
            post,
            postImg,
            liked: false,
            likes,
            comments,
          });
        });
       
      })
      setchangePosts(list);
      setLsearch(text);
      
    if (loading) {
      setLoading(false);
    }
  
    console.log('Posts: ', posts);
  } catch (e) {
    console.log(e);
  }
  
};

const TagList =  async (tags) => {
  try {
    const list = [];
    
    await firestore()
      .collection('posts')
      .where('tag', '==' , tags)
      .orderBy('postTime', 'desc')
      .get()
      .then((querySnapshot) => {
        // console.log('Total Posts: ', querySnapshot.size);
        querySnapshot.forEach((doc) => {
          const {
            postid,
            uid,
            post,
            postImg,
            postTime,
            tag,
            likes,
            comments,
          } = doc.data();
          list.push({
            id: doc.id,
            uid,
            postid,
            userName: 'Test Name',
            userImg:
              'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
            postTime: postTime,
            tag,
            post,
            postImg,
            liked: false,
            likes,
            comments,
          });
        });
      }).then(() => {
        
        firestore()
        .collection('tagcounts')
        .doc(firebase.auth().currentUser.uid)
        .collection('counts')
        .doc(tags)
        .update({
         count : 0
        })
      })
     
    setchangePosts(list);

    if (loading) {
      setLoading(false);
    }

    console.log('Posts: ', posts);
  } catch (e) {
    console.log(e);
  }
};

const getBesttagPosts =  async () => {
  try {
    const list = [];
    
    await firestore()
      .collection('posts')
      .orderBy('likes', 'desc')
      .get()
      .then((querySnapshot) => {
        // console.log('Total Posts: ', querySnapshot.size);
        querySnapshot.forEach((doc) => {
          const {
            postid,
            uid,
            post,
            postImg,
            postTime,
            tag,
            likes,
            comments,
          } = doc.data();
          list.push({
            id: doc.id,
            uid,
            userName: 'Test Name',
            userImg:
              'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
            postTime: postTime,
            tag,
            post,
            postImg,
            liked: false,
            likes,
            comments,
            postid
          });
        });
      })
     
    setchangePosts(list);

    if (loading) {
      setLoading(false);
    }

    console.log('Posts: ', posts);
  } catch (e) {
    console.log(e);
  }
};



useEffect(()=>{
  setTimeout(()=>{
    setReady(false)
    },1000)
    getPosts()
    getBestPosts()
  },[Post])

  const RenderCard = ({item})=>{
    return (
      
      <TouchableOpacity 
      onPress={() => props.navigation.navigate('SearchSnsScreen', { tag: item.tag, uid : item.uid, postimg : item.postImg, post: item.post, postTime : item.postTime })}
      >
      <View  style={[{ width: (width) / 3 }, { height: (width) / 3 }, { marginBottom: 2 }]}>
      <Image 
      style={{
          flex: 1,
          alignSelf: 'stretch',
          width: undefined,
          height: undefined,
          backgroundColor: '#c2c2c2'
      }}
      source={{uri: item.postImg}}
      />
    
      </View>
      </TouchableOpacity>
    )
}




  return (
    
    ready ? <Loading/> :  (
      <ScrollView>
    <View style={{ backgroundColor: 'white', flex: 1 }}>
    <View style={styles.serach}>
    <TouchableOpacity style={{marginTop : 6,marginLeft : 5}} onPress={() => getPosts()}>
         
         <Ionicons name="arrow-back" size={25} color="black" />

        </TouchableOpacity>
      <SearchBar
     
      placeholder="Search here"      
      onChangeText={(text) => handleSearchTextChange(text)}
     
    />
    </View>
   
    
    

    <Text style={{fontSize : 20, marginLeft : 5, fontFamily : 'Jalnan',marginTop : 5, color : 'orange'}}>🎉인기 게시물 Top 5🎉</Text>
    <View style={{flexDirection : 'row', marginBottom : 10}}>
    <ScrollView
    horizontal={true}
    showsHorizontalScrollIndicator = {false}>
    {
        Bestposts?.map((row, idx) => {
          return (
            <View>
              <TouchableOpacity 
              onPress={() => navigation.navigate('SerachBestSnsScreen', { uid : row.uid, postimg : row.postImg, post: row.post, postTime : row.postTime })}
              >
              <Image source ={{uri:row.postImg}} style={{width:200,height:150,marginLeft : 10}} ></Image>
              </TouchableOpacity>
              </View>
        
          )  ;      
         
      })
      }
      </ScrollView>
    </View>
    <View style={{flexDirection : 'row',marginBottom : 5}}>
    <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator = {false}>
    <TouchableOpacity style={styles.button} onPress={() => getBesttagPosts()}>
              <Text style={styles.userBtnTxt}>인기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => TagList(tags[0])}>
              <Text style={styles.userBtnTxt}>인물</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => TagList(tags[1])}>
              <Text style={styles.userBtnTxt}>배경</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => TagList(tags[2])}>
              <Text style={styles.userBtnTxt}>음식</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => TagList(tags[3])}>
              <Text style={styles.userBtnTxt}>동물</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => TagList(tags[4])}>
              <Text style={styles.userBtnTxt}>물건</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => TagList(tags[5])}>
              <Text style={styles.userBtnTxt}>문화</Text>
          </TouchableOpacity>
          </ScrollView>
    </View>
    <View style={{marginTop : 10}}>
      
    <FlatList 
          data={changepost}
          horizontal={false}
          numColumns={3}
          renderItem={({item})=> {return <RenderCard item={item} />
        }}
         
        />
        
        </View>
        
    </View>
    </ScrollView>
    )
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  serach: {
    flexDirection : 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    marginLeft : 10,
    marginRight : 8,
    width: 50,
    height: 30,
    backgroundColor: "#e1d4d2",
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
    color: '#3e3e3e',
    textAlign:'center',  
    fontSize:15,
  },
});
