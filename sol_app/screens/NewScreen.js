import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
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
            <View style={styles.center}><Text>Button_Home</Text></View>
            <View style={styles.center}><Text>Button_Pay</Text></View>
            <View style={styles.center}><Text>Button_Something</Text></View>
        </View>
        <View style={styles.title}>
            <View style={{flex: 5,flexDirection:'column',justifyContent: 'center',alignItems: 'center',}}>
                <View style={{flex: 5,justifyContent: 'center',alignItems: 'center',}}><Text>MainCard</Text></View>
                <View style={{flex: 1,flexDirection:'row',justifyContent: 'center',alignItems: 'center',}}>
                    <View style={styles.center}><Text>Barcode</Text></View>
                    <View style={styles.center}><Text>QRCode</Text></View>
                </View>
            </View>
            <View style={{flex: 1,flexDirection:'column'}}>
                <View style={styles.center}><Text>Card1</Text></View>
                <View style={styles.center}><Text>Card2</Text></View>
                <View style={styles.center}><Text>Card3</Text></View>
                <View style={styles.center}><Text>Card4</Text></View>
                <View style={styles.center}><Text>Card5</Text></View>
            </View>
        </View>
        <View style={styles.content}>
            <View style={{flex: 5,flexDirection:'row'}}>
                <View style={styles.center}><Text>Category1</Text></View>
                <View style={styles.center}><Text>Category2</Text></View>
                <View style={styles.center}><Text>Category3</Text></View>
                <View style={styles.center}><Text>Category4</Text></View>
                <View style={styles.center}><Text>Category5</Text></View>
                <View style={styles.center}><Text>Category6</Text></View>
            </View>
            <View style={styles.center}><Text>Reco_Card</Text></View>
        </View>
        <View style={styles.footer}>
            <View style={styles.center}><Text>footer</Text></View>
        </View>
  </View>
  );
}


NewScreen.navigationOptions = {
    headerLeft: (
      <Button
      onpress={()=>navigation.navigate("HomeScreen")}
      title='mypage'
      color="#5155FF"
      styles='{{marginLeft:30}}'
      />
    ),
    headerRight: (
      <Button
      onpress={()=>navigation.navigate("LinksScreen")}
      title='mypage      '
      color="#5155FF"
      styles={'{marginRight:30}'}
      />
    ),
    headerTitle: (
      <Button
      onpress={()=>navigation.navigate("HomeScreen")}
      title='mypage'
      color="#5155FF"
      />
    ),
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
      backgroundColor: '#ff9a9a',
      flexDirection: 'row',
    },
    title: {
      width:'100%',
      height:'27%',
      textAlign:'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9aa9ff',
      flexDirection: 'row',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#d6ca1a',
    },
    footer: {
      width:'100%',
      height:'20%',
      backgroundColor: '#1ad657',
    },
  });
  