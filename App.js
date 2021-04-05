import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons"
import * as Font from "expo-font"
import { Asset } from 'expo-asset';
import { NavigationContainer } from '@react-navigation/native';
import LoggedInNavigation from './navigators/LoggedInNavigation';

export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const preLoad = async() => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
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
  else {return (
    <NavigationContainer>
      <LoggedInNavigation />
    </NavigationContainer>
  );}
}
