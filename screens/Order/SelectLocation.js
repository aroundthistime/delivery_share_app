import React, { useEffect, useState } from "react";
import MapView, { Marker } from 'react-native-maps';
import { TextInput, View } from "react-native";
import * as Location from 'expo-location';
import { FontAwesome5 } from '@expo/vector-icons';
import Constants from "expo-constants";
import styled from "styled-components";
import Loader from "../../components/Loader";
import constants from "../../constants";
import styles from "../../styles";
import useInput from "../../Hooks/useInput";
import FooterBtn from "../../components/FooterBtn";

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

const FooterContainer = styled.View`
    position : absolute;
    left : 0;
    bottom : 0;
    width : ${constants.width};
    height : ${constants.height - constants.width - 143};
    background-color : white;
`

const InputRow = styled.View`
    flex-direction : row;
    align-items : center;
    padding-left : 20;
    padding-right : 20;
    border-bottom-width : ${styles.grayBorderWidth};
    border-color : ${styles.lightGrayColor};
`

const InputRowTitle = styled.Text`
    font-weight : 600;
    font-size : 16;
    padding-top : 10;
    padding-bottom : 10;
    width : 60;
    margin-right : 10;
    text-align : center;
`

const CurrentSpotContent = styled.Text`
    flex : 1;
    padding-top : 10;
    padding-bottom : 10;
`

const Input = ({
    placeholder,
    value,
    onChange
}) => (
    <TextInput
        onChangeText={onChange}
        keyboardType={"default"}
        placeholder={placeholder}
        value={value}
        multiline
        blurOnSubmit
        style={{flex : 1, paddingVertical : 10}}
        maxLength={80}
    />
)

const MarkerGuide = styled.Text`
    color : red;
    font-size : 13;
    padding-left : 20;
    padding-right : 20;
    margin-top : 5;
`

export default () => {
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setloading] = useState(true);
    const [currentSpot, setCurrentSpot] = useState();
    // const [region, setRegion] = useState();
    const [receivingSpot, setReceivingSpot] = useState();
    const receivingSpotInput = useInput("");
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
        <View style={{
            flex : 1,
            backgroundColor : "white"
        }}>
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
                    style={{alignItems : "center"}}
                >
                    <MarkerTitle>현위치</MarkerTitle>
                    <MarkerIcon isCurrent={true}/>
                </Marker>
                <Marker
                    coordinate={{latitude : receivingSpot.latitude, longitude : receivingSpot.longitude}}
                    style={{alignItems : "center"}}                    
                >
                    <MarkerTitle>수령장소</MarkerTitle>
                    <MarkerIcon isCurrent={false}/>
                </Marker>
            </MapView>
            <FooterContainer>
                <InputRow>
                    <InputRowTitle>현위치</InputRowTitle>
                    <CurrentSpotContent>강원도 속초시 조양동 동대문구 부영아파트3단지 304동 1203호</CurrentSpotContent>
                </InputRow>
                <InputRow>
                    <InputRowTitle>수령장소</InputRowTitle>
                    <Input
                        placeholder="음식을 수령할 주소를 입력하세요"
                        {...receivingSpotInput}
                    />
                </InputRow>
                <MarkerGuide>주소를 직접 입력하거나 지도화면을 터치하여 수령장소를 선택할 수 있습니다.</MarkerGuide>
                <FooterBtn text="콜 요청하기" onPress={()=>1} needStyle/>
            </FooterContainer>
        </View>
    )}
    </>
}
// `https://maps.googleapis.com/maps/api/geocode/json?latlng=${receivingSpot.latitude},${receivingSpot.longitude}&key=${Constants.manifest.extra.GOOGLE_MAP_KEY}`