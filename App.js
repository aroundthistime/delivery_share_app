import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import * as Font from "expo-font"
import { Ionicons } from "@expo/vector-icons"
import { StyleSheet, Text, View } from 'react-native';
import { Asset } from 'expo-asset';

export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const preLoad = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsoLoad.map(font => Font.loadAsync(font));
    const imagesToLoad = [require("./assets/icon.png")];
    const imagePromises = imagesToLoad.map(image => Asset.loadAsync(image));
    return Promise.all([
      ...fontPromises,
      ...imagePromises
    ]);
  }
  if (loading){
    return <AppLoading
      startAsync={preLoad}
      onError={console.warn}
      onFinish={onFinish}
    />
  }
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
