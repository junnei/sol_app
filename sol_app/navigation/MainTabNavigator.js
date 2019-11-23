import React,{Component} from 'react';
import { Platform,View,styles,
  StyleSheet,Image,ImageBackground,TouchableOpacity,Text,Button,AsyncStorage,

  AppRegistry,
  Linking,
 } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

 

import TabBarIcon from '../components/TabBarIcon';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';


const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});
 
class QrCode extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <View style={{flex:1}}><Text>Requesting for camera permission</Text></View>;
    }
    if (hasCameraPermission === false) {
      return <View style={{flex:1}}><Text>No access to camera</Text></View>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {scanned && (
          <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
        )}
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    AsyncStorage.setItem('qrcode',`${data}`);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    this.props.navigation.navigate('Perchase');
  };
}

class NewScreen extends React.Component {


  static navigationOptions = {
    header: null,
  };
  

  _onPressLogout= async () => {
     AsyncStorage.clear();
      this.props.navigation.navigate('Login');
  
  };

  onPressAddButton= async () => {
    this.props.navigation.navigate('Adds');
  }

  onPressBenefitButton= async () => {
    this.props.navigation.navigate('Stat');
  }
  render(){
  return (
    <View style={{
      flex: 1,
      padding: 10,
      backgroundColor: 'white',}}>
        <View style={{
    width:'100%',
    height:'14%',
    textAlign:'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row'}}>
        <View style={{flex:1}}></View>
         
        <View style={{flex:1}}>
          <Image style={{height:'40%', justifyContent:'center', alignItems:'center', marginTop:30}} resizeMode="contain" source={require("../assets/images/main/main_logo.png")} />
        </View>
        <View style={{flex:1}}>
        <TouchableOpacity style={{width:'100%'}} onPress={this._onPressLogout}>
          <Image style={{height:'40%', justifyContent:'flex-end', alignItems:'flex-end', marginLeft:70, marginTop:40}} resizeMode="contain" source={require("../assets/images/main/button_logout.png")} />
        </TouchableOpacity>
        </View> 
        </View>
        <View style={{
    width:'100%',
    height:'35%',
    textAlign:'center',
    justifyContent: 'center',
    alignItems: 'center',}}>
          <ImageBackground 
            resizeMode="stretch"
            source={require("../assets/images/main/1_card.png")}
            style={{width: '100%', height: '100%'}}>
            <TouchableOpacity style={{width:'100%'}} onPress={this.onPressAddButton}>
              <Image style={{ width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}} resizeMode="contain" source={require("../assets/images/main/1_add.png")} />        
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View style={{flex:1}}>
            <View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',}}><Text>박세영 님의 혜택 현황</Text>
            </View>
            <View style={{flex:4}}>
              <View style={{flex:1}}>
              <TouchableOpacity style={{ width:'100%'}} onPress={this.onPressBenefitButton}>
                <Image style={{ width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}} resizeMode="contain" source={require("../assets/images/main/1_benefit.png")} />        
              </TouchableOpacity>
              </View>
              <View style={{flex:1}}/>

              <View style={{flex:1}}/>

              <View style={{flex:1}}/>
            </View>
        </View>
  </View>
  );
}
}

class AddScreen extends React.Component {


  static navigationOptions = {
    header: null,
  };


  onPressAddButton= async () => {
    this.props.navigation.navigate('Add');
  }

  onPressBackButton= async () => {
    this.props.navigation.navigate('Main');
  }
  render(){
  return (
    <View style={{
      flex: 1,
      backgroundColor: 'white',}}>
        <View style={{
    width:'100%',
    height:'11%'}}>
          <ImageBackground 
                resizeMode="contain"
                source={require("../assets/images/main/2_barmain.png")}
                style={{width: '100%', height: '100%'}}>
                
              <TouchableOpacity style={{width:'3%', marginTop:28, marginLeft:35, }} onPress={this.onPressBackButton}>
                <Image style={{ width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}} resizeMode="contain" source={require("../assets/images/main/2_button_bar.png")} />        
              </TouchableOpacity>
                </ImageBackground>
        </View>
        <View style={{
          marginTop:50,
    width:'100%',
    height:'30%',
    textAlign:'center',
    justifyContent: 'center',
    alignItems: 'center',}}>
          <TouchableOpacity style={{width:'80%'}} onPress={this.onPressAddButton}>
            <Image style={{ width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}} resizeMode="contain" source={require("../assets/images/main/2_add.png")} />        
          </TouchableOpacity>
        </View>
        <View style={{
    width:'100%',
    height:'30%',
    textAlign:'center',
    justifyContent: 'center',
    alignItems: 'center',}}>
          <TouchableOpacity style={{width:'80%'}} onPress={this.onPressAddButton}>
            <Image style={{ width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}} resizeMode="contain" source={require("../assets/images/main/2_card_1.png")} />        
          </TouchableOpacity>
        </View>
        <View style={{
    width:'100%',
    height:'30%',
    textAlign:'center',
    justifyContent: 'center',
    alignItems: 'center',}}>
          <TouchableOpacity style={{width:'80%'}} onPress={this.onPressAddButton}>
            <Image style={{ width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}} resizeMode="contain" source={require("../assets/images/main/2_card_2.png")} />        
          </TouchableOpacity>
        </View>
  </View>
  );
}
}

class StatScreen extends React.Component {


  static navigationOptions = {
    header: null,
  };


  onPressAddButton= async () => {
    this.props.navigation.navigate('Add');
  }

  onPressBackButton= async () => {
    this.props.navigation.navigate('Main');
  }
  render(){
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#EBEBEB',}}>
        <View style={{
    width:'100%',
    height:'11%'}}>
          <ImageBackground 
                resizeMode="contain"
                source={require("../assets/images/main/4_bar.png")}
                style={{width: '100%', height: '100%'}}>
                
              <TouchableOpacity style={{width:'3%', marginTop:28, marginLeft:35, }} onPress={this.onPressBackButton}>
                <Image style={{ width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}} resizeMode="contain" source={require("../assets/images/main/2_button_bar.png")} />        
              </TouchableOpacity>
                </ImageBackground>
        </View>
        <View style={{
          marginTop:50,
    width:'100%',
    height:'30%',
    textAlign:'center',
    justifyContent: 'center',
    alignItems: 'center',}}>
          <TouchableOpacity style={{width:'80%'}} onPress={this.onPressAddButton}>
            <Image style={{ width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}} resizeMode="contain" source={require("../assets/images/main/2_add.png")} />        
          </TouchableOpacity>
        </View>
  </View>
  );
}
}

class RecommendScreen extends React.Component {


  static navigationOptions = {
    header: null,
  };


  onPressAddButton= async () => {
    this.props.navigation.navigate('Add');
  }

  onPressBackButton= async () => {
    this.props.navigation.navigate('Main');
  }
  render(){
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#EBEBEB',}}>
        <View style={{
    width:'100%',
    height:'70%',
    marginTop:-130}}>
          <ImageBackground 
            resizeMode="contain"
            source={require("../assets/images/main/5_bar.png")}
            style={{width: '100%', height: '100%'}}>
              <Image style={{ width:'100%', height:'100%', marginTop:180,justifyContent:'flex-end', alignItems:'flex-end'}} resizeMode="contain" source={require("../assets/images/main/5_base.png")} />        
          </ImageBackground>
        </View>
        <View style={{
          marginTop:130,
    width:'100%',
    height:'30%',
    textAlign:'center',
    justifyContent: 'center',
    alignItems: 'center',}}>
          <TouchableOpacity style={{width:'80%'}} onPress={this.onPressAddButton}>
            <Image style={{ width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}} resizeMode="contain" source={require("../assets/images/main/2_add.png")} />        
          </TouchableOpacity>
        </View>
  </View>
  );
}
}
const LinksStack = createStackNavigator(
  {
    Links: QrCode,
  },
  config
);

LinksStack.navigationOptions = {
  showLabel: false,
  tabBarIcon:(
    <Image
      style={{marginTop:11, width: 26, justifyContent:'flex-end' , resizeMode:'contain'}}
      source={require('../assets/images/main/icon_qrcode.png')}
    />
  ),
};

LinksStack.path = '';

const NewStack = createStackNavigator(
  {
    Main: NewScreen,
    Add: AddScreen,
  },
  config
);

NewStack.navigationOptions = {
  showLabel: false,
  tabBarIcon: ({ focused }) => (
    <Image
      style={{marginTop:8, width: 36, height: 43, justifyContent:'flex-end', resizeMode:'contain'}}
      focused={focused}
      source={focused ? require('../assets/images/main/icon_home_focused.png') :
                    require('../assets/images/main/icon_home.png')}
    />
  ),
};

NewStack.path = '';

const AddStack = createStackNavigator(
  {
    Add: AddScreen,
  },
  config
);

AddStack.navigationOptions = {
  showLabel: false,
  tabBarIcon: ({ focused }) => (
    <Image 
      style={{marginTop:11, width: 36, resizeMode:'contain'}}
      focused={focused}
      source={focused ? require('../assets/images/main/icon_card_focused.png') :
                    require('../assets/images/main/icon_card.png')}
    />
  ),
};

AddStack.path = '';

const StatStack = createStackNavigator(
  {
    Stat: StatScreen,
  },
  config
);

StatStack.navigationOptions = {
  showLabel: false,
  tabBarIcon: ({ focused }) => (
    <Image
      style={{marginTop:9, width: 36, resizeMode:'contain'}}
      focused={focused}
      source={focused ? require('../assets/images/main/icon_stat_focused.png') :
                    require('../assets/images/main/icon_stat.png')}
    />
  ),
};

StatStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  showLabel: false,
  tabBarIcon: ({ focused }) => (
    <Image 
      style={{marginTop:10, width: 36, resizeMode:'contain'}}
      focused={focused}
      source={focused ? require('../assets/images/main/icon_star_focused.png') :
                    require('../assets/images/main/icon_star.png')}
    />
  ),
};

const RecommendStack = createStackNavigator(
  {
    Recommend: RecommendScreen,
  },
  config
);

RecommendStack.navigationOptions = {
  showLabel: false,
  tabBarIcon: ({ focused }) => (
    <Image 
      style={{marginTop:10, width: 36, resizeMode:'contain'}}
      focused={focused}
      source={focused ? require('../assets/images/main/icon_star_focused.png') :
                    require('../assets/images/main/icon_star.png')}
    />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  News : NewStack,
  Adds : AddStack,
  Link : LinksStack,
  Stat : StatStack,
  Reco : RecommendStack,
},
{
  tabBarOptions: {
    showLabel: false,
  },
});
tabNavigator.path = '';

export default tabNavigator;
