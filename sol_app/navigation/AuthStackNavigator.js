import React from 'react';
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  AsyncStorage,
  StatusBar,
  TouchableOpacity,
  View,
  ImageBackground,
  Button,
} from 'react-native';
import { createStackNavigator } from 'react-navigation';

import axios from 'axios';

class SignInScreen extends React.Component {

  state = {
    id: "",
    password: "",
    isVerify: false,};

  static navigationOptions = {
    header:null,
  }
  render() {
    return (
      <ImageBackground 
      source={require("../assets/images/login/1_back.png")}
      style={{width: '100%', height: '100%'}}>
        <View style={{flex:400}}/>
        <View style={{flex:344}}>
          <ImageBackground 
          source={require("../assets/images/login/1_base.png")}
          style={{width: '100%', height: '100%'}}>
            <View style={styles.container}>
              <TextInput 
                style={styles.textForm} 
                placeholder={"ID"}
                value={this.state.id}
                onChangeText={(id) => this.setState({id})}
                />
            </View>
            <View style={styles.container}>
              <TextInput 
                style={styles.textForm} 
                placeholder={"Password"}
                value={this.state.password}
                onChangeText={(password) => this.setState({password})}
                />
            </View>
            <View style={{flex:1, flexDirection:'row'}}>
              <View style={styles.container}>
                <Button title="Sign in!" onPress={this._signInAsync} />
              </View>
              <View style={styles.container}>
                <Button title="Log in!" onPress={this._doLogin.bind(this)}/>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={{flex:68}}/>
      </ImageBackground>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('App');
  };

  _doLogin = async () => {
    console.log(this.state.id);
    console.log(this.state.password);
    this.verifyLogin(this.state.id,this.state.password);
  };

  _setUser = async (id) => {
    try {
      await AsyncStorage.setItem('id',`${id}`);
    } catch (error) {
      this.props.navigation.navigate('Login');
      Alert.alert("Server Error.");
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('id');
      if (value !== null) {
        console.log("Async ID : "+value);
      }
    } catch (error) {
      this.props.navigation.navigate('Login');
      Alert.alert("Server Error.");
    }
  };

  verifyLogin = async(id, password) => {
    try
    {
      const result = await axios.post(
      'http://10.3.17.101:3000/api/auth/logIn',
        {
        "realID" : `${id}`,
        "password" : `${password}`
        }
      );
      if(result.status==200){
        this.setState({isVerify:true});
        this._setUser(this.state.id);
        this.props.navigation.navigate('Main');
        this._retrieveData();
      } else if(result.status==200) {

      }
    }
    catch(error)
    {
      if(error.response.status==409){
        Alert.alert(error.response.data.message);
      }
      else{
        Alert.alert("Server Error.");
      }
    }
}
};

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: '회원가입',
  };

onPressButton= async () => {
  this.props.navigation.navigate('Other');
}

  render() {
    return (
      <View style={styles.container}>
        <View style={{height:'4%', width:'100%', alignItems:'center', justifyContent: 'flex-end',}}>
          <Image style={{width:'80%', justifyContent:'center', alignItems:'center',}} source={require("../assets/images/login/2_line.png")} />
        </View>
        <View style={{flex:2}}>
          <View style={styles.container}/>
          <View style={styles.container}>
            <Text style={{fontSize:16}}>서비스 이용약관 및 개인정보 처리방침 동의</Text>
          </View>
          <View style={styles.container}>
            <Text style={{fontSize:10}}>서비스 이용약관 및 개인정보 처리방침에 모두 동의함</Text>
          </View>
        </View>
        <View style={{flex:10, width:'100%',}}>
          <ImageBackground 
            source={require("../assets/images/login/2_base.png")}
            style={{width: '100%', height: '100%'}}>
            <Button title="Show me more of the app" onPress={this._showMoreApp} />
            <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
          </ImageBackground>
        </View>
        <View>
          <TouchableOpacity style={{width:'100%'}} onPress={ this.onPressButton}>
            <Image source={require("../assets/images/login/2_button.png")} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate('Main');
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Login');
  };
}

class OtherScreen extends React.Component {
  
  static navigationOptions = {
    title: '회원가입2',
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{height:'4%', width:'100%', alignItems:'center', justifyContent: 'flex-end',}}>
          <Image style={{width:'80%', justifyContent:'center', alignItems:'center',}} source={require("../assets/images/login/2_line.png")} />
        </View>
        <View style={{flex:2}}>
          <View style={styles.container}>
            <Text style={{fontSize:16}}>아이디와 비밀번호를 입력해주세요</Text>
          </View>
        </View>
        <View style={{flex:6, width:'100%',}}>
          <ImageBackground 
            source={require("../assets/images/login/3_base.png")}
            style={{width: '100%', height: '100%'}}>
            <View style={styles.container}><Text>ID</Text></View>
            <View style={styles.container}><Text>Password</Text></View>
            <View style={styles.container}>
              <Button title="Already 계정 있어요" onPress={this._signInAsync} />
            </View>
          </ImageBackground>
        </View>
        <View style={{flex:3}}/>
        <View>
          <TouchableOpacity style={{width:'100%'}} onPress={ this.onPressButton}>
            <Image source={require("../assets/images/login/3_button.png")} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  onPressButton= async () => {
    this.props.navigation.navigate('Name');
  }

  _signInAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Login');
  };
}

class NameScreen extends React.Component {
  
  static navigationOptions = {
    title: '주민등록인증',
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{height:'4%', width:'100%', alignItems:'center', justifyContent: 'flex-end',}}>
          <Image style={{width:'80%', justifyContent:'center', alignItems:'center',}} source={require("../assets/images/login/2_line.png")} />
        </View>
        <View style={{flex:2}}>
          <View style={styles.container}>
            <Text style={{fontSize:16}}>성함과 주민번호를 입력해주세요</Text>
          </View>
        </View>
        <View style={{flex:6, width:'100%',}}>
          <ImageBackground 
            source={require("../assets/images/login/3_base.png")}
            style={{width: '100%', height: '100%'}}>
            <View style={styles.container}><Text>이름</Text></View>
            <View style={styles.container}><Text>주민등록번호</Text></View>
            <View style={styles.container}>
            </View>
          </ImageBackground>
        </View>
        <View style={{flex:3}}/>
        <View>
          <TouchableOpacity style={{width:'100%'}} onPress={ this.onPressButton}>
            <Image source={require("../assets/images/login/3_button.png")} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  onPressButton= async () => {
    this.props.navigation.navigate('Phone');
  }

  _signInAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Login');
  };
}

class PhoneScreen extends React.Component {
  
  static navigationOptions = {
    title: '핸드폰 본인인증',
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{height:'4%', width:'100%', alignItems:'center', justifyContent: 'flex-end',}}>
          <Image style={{width:'80%', justifyContent:'center', alignItems:'center',}} source={require("../assets/images/login/2_line.png")} />
        </View>
        <View style={{flex:2}}>
          <View style={styles.container}>
            <Text style={{fontSize:16}}>휴대폰 본인인증을 해주세요</Text>
          </View>
        </View>
        <View style={{flex:6, width:'100%',}}>
          <ImageBackground 
            source={require("../assets/images/login/3_base.png")}
            style={{width: '100%', height: '100%'}}>
            <View style={{flex:2, flexDirection:'row'}}>
              <View style={styles.container}><Text>SKT</Text></View>
              <View style={styles.container}><Text>KT</Text></View>
              <View style={styles.container}><Text>LGU+</Text></View>
              <View style={styles.container}><Text>알뜰폰</Text></View>
            </View>
            <View style={{flex:1.5}}>
              <View style={styles.container}>
                <Text>휴대폰번호</Text>
              </View>
              <View style={{flex:3, alignItems:'center'}}>
                <Text>인증번호</Text>
              </View>
            </View>
            <View style={styles.container}><Text>전체동의</Text></View>
            <View style={styles.container}><Text>개인정보 수집/이용 (필수)</Text></View>
            <View style={styles.container}><Text>고유식별정보처리 (필수)</Text></View>
            <View style={styles.container}><Text>통신사 이용약관 (필수)</Text></View>
            <View style={styles.container}><Text>서비스 이용약관 (필수)</Text></View>
          </ImageBackground>
        </View>
        <View style={{flex:3}}/>
        <View>
          <TouchableOpacity style={{width:'100%'}} onPress={ this.onPressButton}>
            <Image source={require("../assets/images/login/3_button.png")} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  onPressButton= async () => {
    this.props.navigation.navigate('Password');
  }

  _signInAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Login');
  };
}

class PasswordScreen extends React.Component {
  
  static navigationOptions = {
    title: '비밀번호 설정',
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{height:'4%', width:'100%', alignItems:'center', justifyContent: 'flex-end',}}>
          <Image style={{width:'80%', justifyContent:'center', alignItems:'center',}} source={require("../assets/images/login/2_line.png")} />
        </View>
        <View style={{flex:2}}>
          <View style={styles.container}>
            <Text style={{fontSize:16}}>A PAY 결제 비밀번호 설정</Text>
          </View>
        </View>
        <View style={{flex:6, width:'100%',}}>
          <Text style={{fontSize:16}}>A PAY 결제 비밀번호 재입력</Text>
        </View>
        <View style={{flex:3}}/>
        <View>
          <TouchableOpacity style={{width:'100%'}} onPress={ this.onPressButton}>
            <Image source={require("../assets/images/login/3_button.png")} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  onPressButton= async () => {
    this.props.navigation.navigate('Finish');
  }

  _signInAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Login');
  };
}

class FinishScreen extends React.Component {
  
  static navigationOptions = {
    title: '끗',
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground 
        source={require("../assets/images/login/7_back.png")}
        style={{width: '100%', height: '100%'}}>
        <View style={{flex:8}}>
          <View style={styles.container}>
            <Text style={{fontSize:66}}>끗</Text>
          </View>
        </View>
        <View style={{flex:3}}>
          <TouchableOpacity style={{alignItems:'center', justifyContent: 'center'}}  onPress={ this.onPressButton}>
            <Image style={{width:'80%', height:'80%'}} resizeMode='contain' source={require("../assets/images/login/7_button.png")} />
          </TouchableOpacity>
        </View>
        <View style={{flex:6}}/>
        </ImageBackground>
      </View>
    );
  }

  onPressButton = async () => {
    this.props.navigation.navigate('Login');
  };
}


class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Login');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textForm: {
      borderWidth: 0.5,
      borderColor: '#888',
      width: '70%',
      height: '40%',
      paddingLeft: 5,
      paddingRight: 5,
      marginBottom: 5,
  },
});

const StackNavigator = createStackNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: HomeScreen,
    Login: SignInScreen,
    Other: OtherScreen,
    Name: NameScreen,
    Phone: PhoneScreen,
    Password: PasswordScreen,
    Finish: FinishScreen,
  },
  {
    initialRouteName: 'Login',
    // transitionConfig: () => ({ screenInterpolator: StackViewStyleInterpolator.forHorizontal }),
  },
);

export default StackNavigator;