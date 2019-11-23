import React from 'react';
import {
  Alert,
  CheckBox,
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
    this._setUser(this.state.id);
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
      } else{
        Alert.alert("Server Error.");
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
  state = {
    checked: [false,false,false,false,false],
    allcheck: false,
  };

  allCheck(){
    if(this.state.checked==[true,true,true,true,true])
    {
      this.setState({allcheck:true});
    }
    else if(this.state.checked==[false,true,true,true,true]){
      this.setState({allcheck:true});
    }
    else{
      this.setState({allcheck:false});
    }
  }


  onPressCheck0= async () => {
    if(this.state.checked[0]==false){
      this.setState({checked:[true,true,true,true,true]});
      this.setState({allcheck:true});
    }
    else{
      this.setState({checked:[false,false,false,false,false]});
      this.setState({allcheck:false});
    }
  }

  onPressCheck1= async () => {
    if(this.state.checked[1]==false)
      this.setState({checked:this.state.checked.slice(0,1).concat(true).concat(this.state.checked.slice(2,5))});
    else
      this.setState({checked:this.state.checked.slice(0,1).concat(false).concat(this.state.checked.slice(2,5))});
  }

  onPressCheck2= async () => {
    if(this.state.checked[2]==false)
      this.setState({checked:this.state.checked.slice(0,2).concat(true).concat(this.state.checked.slice(3,5))});
    else
      this.setState({checked:this.state.checked.slice(0,2).concat(false).concat(this.state.checked.slice(3,5))});
  }

  onPressCheck3= async () => {
    if(this.state.checked[3]==false)
      this.setState({checked:this.state.checked.slice(0,3).concat(true).concat(this.state.checked.slice(4,5))});
    else
      this.setState({checked:this.state.checked.slice(0,3).concat(false).concat(this.state.checked.slice(4,5))});
  }

  onPressCheck4= async () => {
    if(this.state.checked[4]==false)
      this.setState({checked:this.state.checked.slice(0,4).concat(true)});
    else
      this.setState({checked:this.state.checked.slice(0,4).concat(false)});
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
          <View style={styles.container} flexDirection='row'>
            <TouchableOpacity style={{width:'8%'}} onPress={ this.onPressCheck0}>
              <Image style={{width:'100%', justifyContent:'center', alignItems:'center',resizeMode:'contain'}} source={ this.state.checked[0] == true ? require("../assets/images/login/check_full.png") : require("../assets/images/login/check_null.png")} />
            </TouchableOpacity>
            <Text style={{fontSize:12}}>  서비스 이용약관 및 개인정보 처리방침에 모두 동의함</Text>
          </View>
        </View>
        <View style={{flex:10, marginTop:'2%', width:'100%'}}>
          <ImageBackground 
            source={require("../assets/images/login/2_base.png")}
            resizeMode='contain'
            style={{width: '100%', height: '100%'}}>
            <View style={{flex:3}}>
              <View style={{flex:1, width:'55%', alignItems:'center',justifyContent:'flex-end' }}>
                <Text style={{fontSize:13}}>1. A Pay 이용약관(필수)</Text>
              </View>
              <View style={{flex:3, width: '80%', marginTop:10, marginLeft:38, alignItems:'center',justifyContent:'center'}}>
                <ImageBackground
                  source={require("../assets/images/login/2_inbase.png")}
                  resizeMode='stretch'
                  style={{width: '100%', height: '100%'}}>
                <Text style={{ marginHorizontal:25,marginVertical:10, fontSize:11}}> 본 약관은 회원(서비스 약관에 동의한 자를 말합니다. 이하 “회원”이라고 합니다.)이 A Pay(이하 “회사”라고 합니다.)가 제공하는 결제 서비스(이하 “서비스”라고 합니다.)를 이용함에 있어 회사와 회원의 권리, 의무 및 책임사항, 서비스 이용조건 및 절차 등 기본적인 사항을 규정함을 목적으로 합니다.</Text>
                </ImageBackground>
              </View>  
              <View style={styles.container} flexDirection='row'>
                <TouchableOpacity style={{width:'5%',marginLeft:-120}} onPress={ this.onPressCheck1}>
                  <Image style={{width:'100%', justifyContent:'center', alignItems:'center',resizeMode:'contain'}} source={ this.state.checked[1] == true ? require("../assets/images/login/check_full.png") : require("../assets/images/login/check_null.png")} />
                </TouchableOpacity>
                <Text style={{fontSize:11}}>  A Pay 이용약관에 동의함</Text>
              </View>
            </View>
            <View style={{flex:1}}>
              <View style={{flex:1, marginLeft:38, justifyContent:'flex-end'}}>
                <Text style={{fontSize:13}}>2. 위치기반 서비스 이용 약관(필수)</Text>
              </View>
              <View style={styles.container} flexDirection='row'>
                <TouchableOpacity style={{width:'5%', marginLeft:-78,marginTop:15}} onPress={ this.onPressCheck2}>
                  <Image style={{width:'100%', justifyContent:'center', alignItems:'center',resizeMode:'contain'}} source={ this.state.checked[2] == true ? require("../assets/images/login/check_full.png") : require("../assets/images/login/check_null.png")} />
                </TouchableOpacity>
                <Text style={{fontSize:11,marginTop:15}}>  위치기반 서비스 이용 약관에 동의함</Text>
              </View>
            </View>  
            <View style={{flex:1}}>
              <View style={{flex:1, marginLeft:38, marginTop:10, justifyContent:'flex-end'}}>
                <Text style={{fontSize:13}}>3. 개인정보 수집/이용 동의(필수)</Text>
              </View>
              <View style={styles.container} flexDirection='row'>
                <TouchableOpacity style={{width:'5%', marginLeft:-108,marginTop:15}}  onPress={ this.onPressCheck3}>
                  <Image style={{width:'100%', justifyContent:'center', alignItems:'center',resizeMode:'contain'}} source={ this.state.checked[3] == true ? require("../assets/images/login/check_full.png") : require("../assets/images/login/check_null.png")} />
                </TouchableOpacity>
                <Text style={{fontSize:11,marginTop:15}}>  개인정보 수집/이용에 동의함</Text>
              </View>
            </View>  
            <View style={{flex:1}}>
              <View style={{flex:1, marginLeft:38, marginTop:10, justifyContent:'flex-end'}}>
                <Text style={{fontSize:13}}>4. 회원 이용 약관(필수)</Text>
              </View>
              <View style={styles.container} flexDirection='row'>
                <TouchableOpacity style={{width:'5%', marginLeft:-128,marginTop:15}}  onPress={ this.onPressCheck4}>
                  <Image style={{width:'100%', justifyContent:'center', alignItems:'center',resizeMode:'contain'}} source={ this.state.checked[4] == true ? require("../assets/images/login/check_full.png") : require("../assets/images/login/check_null.png")} />
                </TouchableOpacity>
                <Text style={{fontSize:11,marginTop:15}}>  회원 이용 약관에 동의함</Text>
              </View>
            </View>
          <View style={{flex:1}}/>
          </ImageBackground>
        </View>
        <View style={{flex:2}}/>
        <View>
          <TouchableOpacity style={{width:'100%'}} onPress={ this.onPressButton}>
            <Image source={require("../assets/images/login/2_button.png")} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  onPressButton= async () => {
    this.allCheck();
    if(this.state.allcheck==true)
      this.props.navigation.navigate('Other');
    else
    {
      Alert.alert("모든 체크박스에 동의해주세요.")
    }
  }
  
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    await AsyncStorage.setItem('id',`${id}`);
    this.props.navigation.navigate('Login');
  };
}


class OtherScreen extends React.Component {
  
  static navigationOptions = {
    title: '회원가입2',
  };

  constructor(props) {
    super(props);
    this.state = {
        password: "",
    }
  }


  _setUser = async (id) => {
    try {
      await AsyncStorage.setItem('id',`${id}`);
    } catch (error) {
      this.props.navigation.navigate('Login');
      Alert.alert("Server Error.");
    }
  };
  
  _doVerify = async () => {
    this.verifyId(this.state.id,this.state.password);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{height:'4%', width:'100%', alignItems:'center', justifyContent: 'flex-end',}}>
          <Image style={{width:'80%', justifyContent:'center', alignItems:'center', }} resizeMode='contain'   source={require("../assets/images/login/3_line.png")} />
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
            <View style={styles.container}>
              <Button title="Already 계정 있어요" onPress={this.GoToHome} />
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
    this.verifyID(this.state.id,this.state.password);
  }

  GoToHome = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Login');
  };

  verifyID = async(id, password) => {
    try
    {
      const result = await axios.post(
      'http://10.3.17.101:3000/api/auth/signUp',
        {
        "realID" : `${id}`,
        "password" : `${password}`
        }
      );
      if(result.status==200){
        Alert.alert("Success.");
        this._setUser(this.state.id);
        this.props.navigation.navigate('Name');
      } else{
        Alert.alert("Something Wrong. => "+result.status);
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
}

class NameScreen extends React.Component {
  
  static navigationOptions = {
    title: '주민등록인증',
  };

  state = {
    id: "",
    name : "",
    number: "",
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
            <View style={styles.container}>
              <TextInput 
                style={styles.textForm} 
                placeholder={"이름"}
                value={this.state.name}
                onChangeText={(name) => this.setState({name})}
                />
            </View>
            <View style={styles.container}>
              <TextInput 
                style={styles.textForm} 
                placeholder={"주민번호"}
                value={this.state.number}
                onChangeText={(number) => this.setState({number})}
                />
            </View>
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
    const value = await AsyncStorage.getItem("id");
    this.setState({id:`${value}`});
    this.verifyName(this.state.id,this.state.name,this.state.number);
  };

  _signInAsync = async () => {
    this.props.navigation.navigate('Login');
  };

  verifyName = async(id, name, number) => {
    try
    {
      const result = await axios.post(
      'http://10.3.17.101:3000/api/auth/realNameConfirm',
        {
        "realID" : `${id}`,
        "name" : `${name}`,
        "encIdno" : `${number}`
        }
      );
      if(result.status==200){
        Alert.alert("Success.");
        this.props.navigation.navigate('Phone');
      } else{
        Alert.alert("Something Wrong. => "+result.status);
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
}

class PhoneScreen extends React.Component {
  
  static navigationOptions = {
    title: '핸드폰 본인인증',
  };

  state = {
    phone: "",
    val: "",
    checked: []
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{height:'4%', width:'100%', alignItems:'center', justifyContent: 'flex-end',}}>
          <Image style={{width:'80%', justifyContent:'center', alignItems:'center',}} source={require("../assets/images/login/3_line.png")} />
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
            <View style={{flex:2,width:'80%', flexDirection:'row'}}>
              <View style={styles.container}>
                <Image style={{width:'100%', justifyContent:'center', alignItems:'center', }} resizeMode='contain' source={require("../assets/images/main/button_skt.png")} />
              </View>
              <View style={styles.container}>
                <Image style={{width:'100%', justifyContent:'center', alignItems:'center', }} resizeMode='contain' source={require("../assets/images/main/button_kt.png")} />
              </View>
              <View style={styles.container}>
                <Image style={{width:'100%', justifyContent:'center', alignItems:'center', }} resizeMode='contain' source={require("../assets/images/main/button_lg.png")} />
              </View>
              <View style={styles.container}>
                <Image style={{width:'100%', justifyContent:'center', alignItems:'center', }} resizeMode='contain' source={require("../assets/images/main/button_alddle.png")} />
              </View>
            </View>
            <View style={{flex:2}}>
              <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                <TextInput 
                  style={styles.textForm,{flex:3}} 
                  placeholder={"핸드폰번호"}
                  value={this.state.phone}
                  onChangeText={(phone) => this.setState({phone})}
                  />
                <TouchableOpacity style={{width:'100%'}} onPress={ this.onPressPhone}>
                  <Image source={require("../assets/images/main/button_phone.png")} />
                </TouchableOpacity>
              </View>
              <View style={{flex:3, alignItems:'center'}}>
              <TextInput 
                style={styles.textForm} 
                placeholder={"인증번호"}
                value={this.state.val}
                onChangeText={(val) => this.setState({val})}
                />
              </View>
            </View>
            <View style={styles.container}>
            <CheckBox
                title='전체동의'
                checked={this.state.checked}
              /></View>
            <View style={styles.container}><CheckBox
                title='개인정보 수집/이용 (필수)'
                checked={this.state.checked}
              /></View>
            <View style={styles.container}><CheckBox
                title='고유식별정보처리 (필수)'
                checked={this.state.checked}
              /></View>
            <View style={styles.container}><CheckBox
                title='통신사 이용약관 (필수)'
                checked={this.state.checked}
              /></View>
            <View style={styles.container}><CheckBox
                title='서비스 이용약관 (필수)'
                checked={this.state.checked}
              /></View>
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

  onPressPhone= async () => {
    this.setState({val:"123456"});
  }

  onPressButton= async () => {
    this.props.navigation.navigate('Password');
  }

  _signInAsync = async () => {
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