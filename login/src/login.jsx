import { StyleSheet,Text,View,TextInput,Button,TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { GoogleSignin,statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken} from 'react-native-fbsdk-next';
import Icon from 'react-native-vector-icons/FontAwesome';

const Login=({navigation})=>{

  let [userInfo,setUserInfo]=useState('');
  console.debug(userInfo)
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [contact,setContact] =useState('');
  const [showOtp,setShowOtp] = useState(false);

  useEffect(()=>{
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/userinfo.email'],
            WebClientId: 'your_key',
          });
    },[]);

    
   
    
    const handleGSubmit=async()=>{
        try {
            await GoogleSignin.hasPlayServices();
            const userInfoDetail = await GoogleSignin.signIn();
            userInfo = {
              name:userInfoDetail.user.name,
              photo:userInfoDetail.user.photo
            }
            setUserInfo(userInfo);
            navigation.navigate('home',{userData:userInfo});
            
          } catch (error) {
            console.error('Google Sign-In Error:', error);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.debug("can")
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.debug("progress")
            } else {
                console.debug("other")
            }
          }
        
    }

    const handleFSubmit=async()=>{
        const result = await LoginManager.logInWithPermissions([]);
        if (result.isCancelled) {
          throw 'User cancelled the login process';
        }
        const data = await AccessToken.getCurrentAccessToken();
      
        if (!data) {
          throw 'Something went wrong obtaining access token';
        }
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);     
        const userCredential = await auth().signInWithCredential(facebookCredential);
        const facebookUserId = data.userID;
        const response = await fetch(`https://graph.facebook.com/${facebookUserId}?fields=id,name,picture.type(large)&access_token=${data.accessToken}`);

        if (!response.ok) {
        throw 'Failed to fetch user data from Facebook';
        }

        const userData = await response.json();
        
        userInfo ={
          name:userData.name,
          photo:userData.picture.data.url
        }
        setUserInfo(userInfo)
        navigation.navigate("home",{userData:userInfo})
    }


    async function signInWithPhoneNumber(phoneNumber) {
      setShowOtp(true);
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    }
    async function confirmCode(contact) {
      try {
        await confirm.confirm(code);
        console.log('good');
        userInfo={
          name:contact,
        }
        setUserInfo(userInfo)
        navigation.navigate("home",{userData:userInfo})
      } catch (error) {
        console.log('Invalid code.');
      }
      setShowOtp(false)   
  }
  
    

    return(
        <View  style={styles.container}>
            <Text style={styles.head}>Login</Text>
                {!showOtp ? (
                  <View style={{gap:10}}>
                      <TextInput style={styles.input} placeholder="email / phone no" value={contact} onChangeText={text => setContact(text)}></TextInput>
                      <TouchableOpacity style={styles.submit} onPress={() => signInWithPhoneNumber(contact)}>
                          <Text >Continue</Text>
                          </TouchableOpacity>
                    </View>
                  ):(
                    <View style={{gap:10}}>
                           <TextInput style={styles.input} placeholder="otp" value={code} onChangeText={text => setCode(text)}></TextInput>
                           <TouchableOpacity style={styles.submit} onPress={() => confirmCode(contact)}>
                                <Text >otp</Text>
                            </TouchableOpacity>
                    </View>
                  )} 
            <View style={{height:"25%",justifyContent:'center'}}>
                <Text style={{color:"black"}}>or</Text>
            </View>
            
            <View style={{gap:10}}>
                <TouchableOpacity style={styles.social} onPress={handleGSubmit}>
                    <Icon name="google" size={26} color="black"/>
                    <Text style={{color:"black"}} >Continue with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.social} onPress={handleFSubmit}>
                    <Icon name="facebook" size={26} color="black"/>
                    <Text style={{color:"black"}} >Continue with Facebook</Text>
                </TouchableOpacity>  
            </View> 
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:"100%",
        paddingTop:100,
        flexDirection:"column",
        gap:50,
        alignItems:'center',
        backgroundColor:"white",},
    head:{
        width: 122,
        height: 29,
        fontSize: 29,
        fontWeight: "600",
        fontStyle: "normal",
        lineHeight: 30,
        textAlign: "center",
        color: "#000000"},
    input:{
        padding:5,
        width: 318,
        height: 55,
        borderRadius: 10,
        backgroundColor: "darkgrey",
        color:"black"
        },
    submit:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        width: 318,
        height: 55,
        borderRadius: 10,
        backgroundColor: "#8156C7"},
    social:{
        display:'flex',
        flexDirection:'row',
        gap:10,
        alignItems:'center',
        justifyContent:'center',
        width: 318,
        height: 55,
        borderRadius: 10,
        borderStyle:"solid",
        borderWidth: 1,
        backgroundColor: "white",
        borderColor: "rgba(0, 0, 0, 1.0)",
         },


})

export default Login;