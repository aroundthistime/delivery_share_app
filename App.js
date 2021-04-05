import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font"
import { Ionicons } from "@expo/vector-icons"
import { Asset } from 'expo-asset';
import { NavigationContainer } from '@react-navigation/native';
import LoggedInNavigation from './navigators/LoggedInNavigation';

export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const preLoad = async() => {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!");
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map(font => Font.loadAsync(font));
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
