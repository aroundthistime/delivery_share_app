import React, { useEffect, useState } from "react";
import MapView from 'react-native-maps';
import { Alert, Text, View } from "react-native";
import * as Location from 'expo-location';
import constants from "../../constants";

export default () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    useEffect(() => {
        (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        Alert.alert("1!");
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        })();
    }, []);
    console.log(location);
    return <View>
        <MapView style={{width : constants.width, height : constants.width}}/>
    </View>
}