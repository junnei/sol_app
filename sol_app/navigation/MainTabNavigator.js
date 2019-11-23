import React,{Component} from 'react';
import { Platform,View,
  StyleSheet,Image,ImageBackground,TouchableOpacity,Text,TextInput,Button,AsyncStorage,

  AppRegistry,
  Linking,
 } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

 

import axios from 'axios';

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
  //  AsyncStorage.setItem("realCost", `${data.realCost}`);
    //AsyncStorage.setItem("benefitStoreName", `${data.benefitStoreName}`);
   // AsyncStorage.setItem("monthPayment", `${data.monthPayment}`);
   // AsyncStorage.setItem("monthBenefit", `${data.monthBenefit}`);
    this.findCard(10000,"스타벅스",20000,3000);
  };

  findCard = async( cost, name, pay, benefit ) => {
    try
    {
      const result = await axios.post(
      'http://10.3.17.101:3000/api/pay/makeBestPayment',
        {
        "realCost" : `${cost}`,
        "benefitStoreName" : `${name}`,
        "monthPayment" : `${pay}`,
        "monthBenefit" : `${benefit}`,
        }
      );
      if(result.status==200){
        console.log(result.data);
        try {
          await AsyncStorage.setItem("benefitCategory", result.data.benefitCategory);
        } catch (error) {
          console.log("Something went wrong", error);
        }
      
        try {
          await AsyncStorage.setItem("benefitStoreName", result.data.benefitStoreName);
        } catch (error) {
          console.log("Something went wrong", error);
        }
        try {
          await AsyncStorage.setItem("finalCardName", result.data.finalCardName);
        } catch (error) {
          console.log("Something went wrong", error);
        }
        try {
          await AsyncStorage.setItem("finalCost", ""+result.data.finalCost);
        } catch (error) {
          console.log("Something went wrong", error);
        }
        try {
          await AsyncStorage.setItem("realCost", ""+result.data.realCost);
        } catch (error) {
            console.log("Something went wrong", error);
        }
        this.props.navigation.navigate('Purchase');
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

}

class NewScreen extends React.Component {


  static navigationOptions = {
    header: null,
  };
  
  state = {
    name: "",
    hasCard:0,
  }
  _onPressLogout= async () => {
    AsyncStorage.clear();
    this._Logout();
  
  };
  _Logout = async () =>{
    try
    {
      const result = await axios.get(
      'http://10.3.17.101:3000/api/auth/logOut'
      );
      if(result.status==200){
        this.props.navigation.navigate('Login');
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
  onPressAddButton= async () => {
    this.props.navigation.navigate('Adds');
  }

  onPressBenefitButton= async () => {
    this.props.navigation.navigate('Stat');
  }
  _makenew= async() =>{
    try{
      const name = await AsyncStorage.getItem("userName");
      console.log(name);
      const id = await AsyncStorage.getItem("id");
      console.log(id);
      this.setState({name:name});
    }
    catch(error){

    }
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
        <TouchableOpacity style={{width:'100%'}} onPress={this._makenew}>
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
            {this.state.hasCard!=0 ?
            (
            <TouchableOpacity style={{width:'100%'}} onPress={this.onPressAddButton}>
              <Image style={{ width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}} resizeMode="contain" source={require("../assets/images/main/1_add.png")} />        
            </TouchableOpacity>
            ):
            (
            <View style={{flex:1}}>
              <View style={{flex:1,flexDirection:'row'}}>
                <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
                  <Image style={{width:'60%',justifyContent:'center', alignItems:'center'}} resizeMode="contain" source={require("../assets/images/main/2_card_1.png")} />        
                </View>
                <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
                  <Image style={{width:'60%',justifyContent:'center', alignItems:'center'}}  resizeMode="contain" source={require("../assets/images/main/2_card_2.png")} />   
                </View>
                <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
                  <Image style={{width:'60%',justifyContent:'center', alignItems:'center'}}  resizeMode="contain" source={require("../assets/images/main/2_card_1.png")} />   
                </View>
                <View style={{flex:1,justifyContent:'center', alignItems:'center'}}><Text>카드관리</Text></View>
              </View>
              <View style={{flex:2}}>
                <View style={{flex:1}}>
                <Text>신한 LOVE 카드…
                </Text>
                </View>
                <View style={{flex:3}}>
                <Text>3개의 카드가
                  통합되어 있습니다</Text>
                </View>
                <View style={{flex:1}}>
                
                </View>
              </View>
            </View>
            )
            }
          </ImageBackground>
        </View>
        <View style={{flex:1}}>
            <View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',}}><Text>{this.state.name}님의 혜택 현황</Text>
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
    this.props.navigation.navigate('AddCard');
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
class PurchaseScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    password:"",
  }

  onPressButton = async() =>{
    try {
      const finalCardName = await AsyncStorage.getItem("finalCardName");
      this.setState({finalCardName:finalCardName});
      }
      catch (error) {
     console.log("Something went wrong", error);
   }
    try {
      const benefitCategory = await AsyncStorage.getItem("benefitCategory");
      this.setState({benefitCategory:benefitCategory});
      }
      catch (error) {
    console.log("Something went wrong", error);
  }
    try {
      const benefitStoreName = await AsyncStorage.getItem("benefitStoreName");
      this.setState({benefitStoreName:benefitStoreName});
      }
      catch (error) {
    console.log("Something went wrong", error);
    }
    try {
      const realCost = await AsyncStorage.getItem("realCost");
      this.setState({realCost:realCost});
      }
      catch (error) {
    console.log("Something went wrong", error);
    }
    try {
      const finalCost = await AsyncStorage.getItem("finalCost");
      this.setState({finalCost:finalCost});
      }
      catch (error) {
    console.log("Something went wrong", error);
    }
    this.onPurchase(this.state.password,this.state.finalCardName,this.state.benefitCategory,this.state.benefitStoreName,this.state.realCost,this.state.finalCost);
  }

  onPurchase = async(passwd,name,category, store,realcost,finalcost) => {
    try
    {
      const result = await axios.post(
      'http://10.3.17.101:3000/api/pay/autoPay',
        {
        "inputPayPassword" : `${passwd}`,
        "finalCardName" : `${name}`,
        "benefitCategory" : `${category}`,
        "benefitStoreName" : `${store}`,
        "realcost" : 1*(`${realcost}`),
        "finalcost" : 1*(`${finalcost}`),
        }
      );
      if(result.status==200){
        console.log("SUccess!");
        console.log(`${passwd}`);
        console.log(`${name}`);
        console.log(`${category}`);
        console.log(`${store}`);
        console.log(`${realcost}`);
        console.log(`${finalcost}`);
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
  render(){
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/main/purchase_base.png")}
          style={{width: '100%'}}>
        <View style={{flex: 1,}}>
                <Text>AAA</Text>
        </View>
        <View style={{flex: 1,}}>
              <Text>BBB</Text>
        </View>
        <TextInput 
                secureTextEntry={true} 
                style={styles.textForm}
                value={this.state.password}
                onChangeText={(password) => this.setState({password})}
                />
        </ImageBackground>
        <View>
          <TouchableOpacity style={{width:'100%'}} onPress={ this.onPressButton}>
            <Image source={ require("../assets/images/main/purchase_button.png")} />
          </TouchableOpacity>
        </View>
      </View>
    );  
}
}

class CardScreen extends React.Component {


  static navigationOptions = {
    header: null,
  };
  state = {
    cardnum1:"",
    cardnum2:"",
    cardnum3:"",
    cardnum4:"",
    day:"",
    cvc:"",
    password:"",
  }

  onPressButton= async () => {
    this.addCard(this.state.cardnum1+'-'+this.state.cardnum2+'-'+this.state.cardnum3+'-'+this.state.cardnum4,this.state.password,this.state.cvc,this.state.day);
  }

  addCard= async (card,pass,cvc,day) => {
    try
    {
      const result = await axios.post(
      'http://10.3.17.101:3000/api/card/enrollCard',
        {
        "cardNoEnc" : `${card}`,
        "passwd" : `${pass}`,
        "cvv2" : `${cvc}`,
        "validTrm" : `${day}`,
        }
      );
      if(result.status==200){
        Alert.alert("Add Success.");
        this.props.navigation.navigate('Main');
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

  render(){
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#EBEBEB',}}>
        <View style={{
          width:'100%',
          height:'13%',}}>
          <ImageBackground 
            resizeMode="contain"
            source={require("../assets/images/main/add_bar.png")}
            style={{width: '100%', height: '100%'}}>
          </ImageBackground>
          </View>
        <View style={{
          width:'100%',resizeMode:"contain" ,
          height:'80%', justifyContent:'center', alignItems:'center'}}>
          <ImageBackground
            resizeMode="contain"
            source={require("../assets/images/login/4_base.png")}
            style={{ width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}} >
            <View style={styles.container}></View>
            <View style={{flex:3, justifyContent:'center', alignItems:'center'}}>
              <View style={{
                flex:1,
                width:'20%', flexDirection:"row",
                justifyContent:'center', alignItems:'center'}}>
               <TextInput 
                style={styles.textForm}
                value={this.state.cardnum1}
                onChangeText={(cardnum1) => this.setState({cardnum1})}
                /><TextInput 
                style={styles.textForm} 
                value={this.state.cardnum2}
                onChangeText={(cardnum2) => this.setState({cardnum2})}
                /><TextInput 
                style={styles.textForm} 
                value={this.state.cardnum3}
                onChangeText={(cardnum3) => this.setState({cardnum3})}
                /><TextInput 
                style={styles.textForm} 
                value={this.state.cardnum4}
                onChangeText={(cardnum4) => this.setState({cardnum4})}
                />
              </View>
              <View style={styles.container}>
                <TextInput 
                style={styles.textForm} 
                placeholder={"유효기간"}
                value={this.state.day}
                onChangeText={(day) => this.setState({day})}
                />
              </View>
              <View style={styles.container}>
                <TextInput 
                style={styles.textForm} 
                placeholder={"cvc"}
                value={this.state.cvc}
                onChangeText={(cvc) => this.setState({cvc})}
                />
              </View>
              <View style={styles.container}>
                <TextInput 
                style={styles.textForm} 
                placeholder={"password"}
                value={this.state.password}
                onChangeText={(password) => this.setState({password})}
                />
              </View>
            </View>
            <View style={styles.container}/>
            </ImageBackground> 
            <View>
              <TouchableOpacity style={{width:'100%'}} onPress={ this.onPressButton}>
                <Image source={require("../assets/images/login/2_button.png")} />
              </TouchableOpacity>
            </View>
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
    Purchase: PurchaseScreen,
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
    AddCard: CardScreen,
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
