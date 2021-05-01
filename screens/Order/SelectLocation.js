import React, { useEffect, useState } from "react";
import MapView, { Marker } from 'react-native-maps';
import { Alert, Text, View } from "react-native";
import * as Location from 'expo-location';
import { FontAwesome5 } from '@expo/vector-icons';
import styled from "styled-components";
import Loader from "../../components/Loader";
import constants from "../../constants";
import styles from "../../styles";

const MarkerTitle = styled.Text`
    padding-left : 8;
    padding-right : 8;
    padding-top : 5;
    padding-bottom : 5;
    background-color : white;
    margin-bottom : 2;
    border-width : 0.8;
    border-color : #DFDFDF;
    border-radius : 5;
    font-size : 15;
`

const MarkerIcon = ({isCurrent}) => isCurrent ? (
    <FontAwesome5 name="map-marker-alt" size={30} color="#4081EC" />
) : (
    <FontAwesome5 name="map-marker-alt" size={30} color={styles.themeColor} />
)

export default () => {
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setloading] = useState(true);
    const [currentSpot, setCurrentSpot] = useState();
    // const [region, setRegion] = useState();
    const [receivingSpot, setReceivingSpot] = useState();
    useEffect(() => {
        (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setCurrentSpot({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        });
        // setRegion({
        //     latitude: location.coords.latitude,
        //     longitude: location.coords.longitude,
        //     latitudeDelta: 0.002,
        //     longitudeDelta: 0.002,
        // })
        setReceivingSpot({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        })
        setloading(false);
        })();
    }, []);
    return <>
    {loading ? (
        <Loader />
    ) : (
        <View>
            <MapView
                style={{width : constants.width, height : constants.width}}
                region={{
                    ...receivingSpot,
                    latitudeDelta : 0.002,
                    longitudeDelta : 0.002
                }}
                onPress={(e)=>setReceivingSpot({
                    longitude : e.nativeEvent.coordinate.longitude,
                    latitude : e.nativeEvent.coordinate.latitude,
                })}
            >
                <Marker
                    coordinate={{latitude : currentSpot.latitude, longitude : currentSpot.longitude}}
                    title={"현위치"}
                    style={{alignItems : "center"}}
                >
                    <MarkerTitle>현위치</MarkerTitle>
                    <MarkerIcon isCurrent={true}/>
                </Marker>
                <Marker
                    coordinate={{latitude : receivingSpot.latitude, longitude : receivingSpot.longitude}}
                    title={"수령장소"}
                    style={{alignItems : "center"}}                    
                >
                    <MarkerTitle>수령장소</MarkerTitle>
                    <MarkerIcon isCurrent={false}/>
                </Marker>
            </MapView>
        </View>
    )}
    </>
}