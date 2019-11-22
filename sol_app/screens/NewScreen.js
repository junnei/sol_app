import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';

import { MonoText } from '../components/StyledText';

export default function NewScreen() {

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Image style={{height:'40%', justifyContent:'center', alignItems:'center', marginTop:30}} resizeMode="contain" source={require("../assets/images/main/main_logo.png")} />
        </View>
        <View style={styles.title}>
          <ImageBackground 
            resizeMode="stretch"
            source={require("../assets/images/main/1_card.png")}
            style={{width: '100%', height: '100%'}}>
          <TouchableOpacity style={{width:'100%'}} onPress={ this.onPressAddButton}>
            <Image style={{ width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}} resizeMode="contain" source={require("../assets/images/main/1_add.png")} />        
          </TouchableOpacity>
          </ImageBackground>
        </View>
        <View style={{flex:1}}>
            <View style={styles.content}><Text>박세영 님의 혜택 현황</Text>
            </View>
            <View style={{flex:4}}>
              <View style={{flex:1}}>
              <TouchableOpacity style={{ width:'100%'}} onPress={ this.onPressBenefitButton}>
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


NewScreen.navigationOptions = {
    header:null,
  };
  

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: 'white',
    },
    center: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      width:'100%',
      height:'14%',
      textAlign:'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      width:'100%',
      height:'35%',
      textAlign:'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    footer: {
      width:'100%',
      height:'20%',
      backgroundColor: '#1ad657',
    },
  });
  