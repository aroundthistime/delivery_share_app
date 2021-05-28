import React, { useState } from 'react';
import { Alert } from "react-native";
import AppLoading from 'expo-app-loading';
import * as Location from 'expo-location';
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, FontAwesome5, FontAwesome } from "@expo/vector-icons"
import * as Font from "expo-font"
import { Asset } from 'expo-asset';
import { NavigationContainer } from '@react-navigation/native';
import axios from "axios";
import { CartProvider } from "./Contexts/CartContext";
import LoggedInNavigation from './navigators/LoggedInNavigation';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { persistCache } from 'apollo3-cache-persist';
import apolloOptions from './apolloOptions';
import { extractLocationInfos } from './utils';
import { locationVar } from './reactiveVars';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState(null);
  const onFinish = () => setLoading(false);
  const preLoad = async () => {
    const cache = new InMemoryCache();
    await persistCache({
      cache,
      storage: AsyncStorage
    });
    const client = new ApolloClient({
      cache,
      ...apolloOptions
    })
    setClient(client);
    console.log("@@@@@@@@@@@@@@@@@@");
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("위치 정보 획득에 실패하였습니다. 위치 권한을 허용해 주십시오.")
      return;
    }
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    let location = await Location.getCurrentPositionAsync({});
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;
    const result = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}&input_coord=WGS84`, {
      headers: {
        "Authorization": `KakaoAK ${Constants.manifest.extra.KAKAO_REST_KEY}`
      }
    });
    const addressObj = extractLocationInfos(result.data.documents[0]);
    locationVar({
      latitude,
      longitude,
      ...addressObj
    });
    const fontsToLoad = [Ionicons.font, FontAwesome5.font, FontAwesome.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [require("./assets/icon.png")];
    const imagePromises = imagesToLoad.map(image => Asset.loadAsync(image));
    return Promise.all([
      ...fontPromises,
      ...imagePromises
    ]);
  }
  if (loading) {
    return <AppLoading
      startAsync={preLoad}
      onError={console.warn}
      onFinish={onFinish}
    />
  }
  else {
    return (
      <ApolloProvider client={client}>
        <NavigationContainer>
          <CartProvider>
            <LoggedInNavigation />
          </CartProvider>
        </NavigationContainer>
      </ApolloProvider>
    );
  }
}
