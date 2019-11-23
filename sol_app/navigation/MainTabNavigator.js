import React from 'react';
import { Platform,View,styles,
  StyleSheet,Image,ImageBackground,TouchableOpacity,Text, } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddScreen from '../screens/AddScreen';
import StatScreen from '../screens/StatScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

class NewScreen extends React.Component {


  static navigationOptions = {
    header: null,
  };


  onPressAddButton= async () => {
    this.props.navigation.navigate('Add');
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
    alignItems: 'center',}}>
          <Image style={{height:'40%', justifyContent:'center', alignItems:'center', marginTop:30}} resizeMode="contain" source={require("../assets/images/main/main_logo.png")} />
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


const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
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
  tabBarLabel: 'Main',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
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
  tabBarLabel: '카드관리',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-add-circle${focused ? '' : '-outline'}`
          : 'md-add-circle'
      }
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
  tabBarLabel: '이용내역',
  tabBarIcon: ({ focused }) => (
    <Image
      focused={focused}
      source={focused ? require('../assets/images/main/icon_stat.png') :
                    require('../assets/images/main/icon_home_outline.png')}
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
  tabBarLabel: '추천카드',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  News : NewStack,
  Adds : AddStack,
  Stat : StatStack,
  Sets : SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
