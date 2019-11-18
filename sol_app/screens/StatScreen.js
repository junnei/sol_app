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

export default function StatScreen() {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.center}><Text>전월 사용 금액</Text></View>
            <View style={styles.center}><Text>전월 사용 혜택</Text></View>
            <View style={styles.center}><Text>추천 혜택</Text></View>
        </View>
        <View style={styles.title}>
            <View style={styles.center}/>
            <View style={styles.center}><Text>전월 누적 사용 금액</Text></View>
            <View style={styles.center}><Text>47,120 원</Text></View>
            <View style={styles.center}/>
        </View>
        <View style={styles.content}>
            <View style={{flex: 1,}}><Text>총 53개</Text></View>
            <View style={{flex: 5,}}>
                <View style={styles.center}><Text>CGV 목동점</Text></View>
                <View style={styles.center}><Text>GS25 강남점</Text></View>
                <View style={styles.center}><Text>신세계 영등포점</Text></View>
                <View style={styles.center}><Text>GS25 영등포역</Text></View>
                <View style={styles.center}><Text>목동 주유소</Text></View>
            </View>
        </View>
  </View>
  );
}


StatScreen.navigationOptions = {
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
      height:'18%',
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
  