import { View,Text,StyleSheet,Image,TouchableOpacity } from "react-native";
import { GoogleSignin,} from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';

const Home =({route})=>{
    let { userData } = route.params;
    const navigation = useNavigation(); 
    const signOut = async () => {
        try {
          navigation.navigate('login')
          await GoogleSignin.signOut();
        } catch (error) {
          console.error(error);
        }
      };

    return(
      <View style={styles.container}>
          <Text>Home</Text>
        
          <View style={{paddingTop:50, alignItems: 'center', justifyContent: 'center' }}>
            <Image
                source={{ uri: userData.photo }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
            />
            <Text style={{color:"black"}}>{userData.name}</Text>
          </View>

          <View>
              <TouchableOpacity style={styles.submit} onPress={signOut}>
                  <Text >Sign out</Text>
             </TouchableOpacity>
          </View>
      </View>
    );
};

       
const styles = StyleSheet.create({
  container:{
    width:"100%",
    height:"100%",
    paddingTop:100,
    flexDirection:"column",
    gap:50,
    alignItems:'center',
    backgroundColor:"white",},
  submit:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    width: 100,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#8156C7"},
})
export default Home;