import React, { useEffect, useState } from "react";
import MapView, { Marker } from 'react-native-maps';
import { Alert, Text, TextInput, View } from "react-native";
import * as Location from 'expo-location';
import { FontAwesome5 } from '@expo/vector-icons';
import Constants from "expo-constants";
import axios from "axios";
import styled from "styled-components";
import Loader from "../../components/Loader";
import constants from "../../constants";
import styles from "../../styles";
import useInput from "../../Hooks/useInput";
import FooterBtn from "../../components/FooterBtn";
import { useMutation } from "@apollo/client";
import { CREATE_CALL } from "../../queries/CallQueries";
import { useCart } from "../../Contexts/CartContext";
import { myCallVar } from "../../reactiveVars";

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

const MarkerIcon = ({ isCurrent }) => isCurrent ? (
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
    font-weight : bold;
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
    onChange,
    onEndEditing
}) => (
    <TextInput
        onChangeText={onChange}
        keyboardType={"default"}
        placeholder={placeholder}
        value={value}
        multiline
        blurOnSubmit
        style={{ flex: 1, paddingVertical: 10 }}
        maxLength={80}
        onEndEditing={onEndEditing}
    />
)

const MarkerGuide = styled.Text`
    color : red;
    font-size : 13;
    padding-left : 20;
    padding-right : 20;
    margin-top : 5;
`

export default ({ navigation, route }) => {
    const {
        params: { timeLimit, requestToUser, requestToRestaurant }
    } = route;
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setloading] = useState(true);
    const [currentSpot, setCurrentSpot] = useState();
    const [receivingSpot, setReceivingSpot] = useState();
    const [isGettingAddress, setIsGettingAddress] = useState(false);
    const receivingSpotInput = useInput("");
    const [createCallMutation] = useMutation(CREATE_CALL);
    const cart = useCart();
    const setReceivingSpotByMarker = async (latitude, longitude) => {
        setIsGettingAddress(true)
        setReceivingSpot({
            longitude,
            latitude,
        });
        const result = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}&input_coord=WGS84`, {
            headers: {
                "Authorization": `KakaoAK ${Constants.manifest.extra.KAKAO_REST_KEY}`
            }
        })
        receivingSpotInput.changeValue(result.data.documents[0].address.address_name)
        setIsGettingAddress(false);
    }
    const setMarkerByAddress = async () => {
        try {
            const result = await axios.get(`https://dapi.kakao.com/v2/local/search/address.json?query=${receivingSpotInput.value}`, {
                headers: {
                    "Authorization": `KakaoAK ${Constants.manifest.extra.KAKAO_REST_KEY}`
                }
            });
            if (result.data.documents.length >= 1) {
                setReceivingSpot({
                    longitude: parseFloat(result.data.documents[0].x),
                    latitude: parseFloat(result.data.documents[0].y)
                })
            } else {
                setReceivingSpot({
                    longitude: parseFloat(result.data.documents[0].x),
                    latitude: parseFloat(result.data.documents[0].y)
                })
            }
        } catch {
            Alert.alert("검색결과를 찾을 수 없습니다. 정확한 주소를 입력해주세요.")
        }
    }
    const setReceivingSpotByCurrentSpot = () => {
        setReceivingSpot({
            latitude: currentSpot.latitude,
            longitude: currentSpot.longitude,
        })
        receivingSpotInput.changeValue(currentSpot.address);
    }
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            const latitude = location.coords.latitude;
            const longitude = location.coords.longitude;
            const result = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}&input_coord=WGS84`, {
                headers: {
                    "Authorization": `KakaoAK ${Constants.manifest.extra.KAKAO_REST_KEY}`
                }
            })
            const address = result.data.documents[0].address.address_name;
            setCurrentSpot({
                latitude,
                longitude,
                address
            });
            setReceivingSpot({
                latitude,
                longitude
            })
            setloading(false);
        })();
    }, []);
    const createCall = async () => {
        try {
            console.log(JSON.stringify(cart));
            const { data: { createCall: result }, error } = await createCallMutation({
                variables: {
                    cart: JSON.stringify(cart),
                    latitude: receivingSpot.latitude,
                    longitude: receivingSpot.longitude,
                    address: receivingSpotInput.value,
                    requestToRes: requestToRestaurant,
                    requestToUser,
                    timeLimit
                }
            })
            if (result) {
                Alert.alert("콜이 요청되었습니다.");
                myCallVar(result);
                navigation.dispatch(StackActions.replace("TabNavigation"))
            } else {
                Alert.alert("콜 요청에 실패하였습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.log(error);
            Alert.alert("콜 요청에 실패하였습니다. 다시 시도해주세요.");
        }
    }
    return <>
        {loading ? (
            <Loader />
        ) : (
            <View style={{
                flex: 1,
                backgroundColor: "white"
            }}>
                <MapView
                    style={{ width: constants.width, height: constants.width }}
                    region={{
                        ...receivingSpot,
                        latitudeDelta: 0.002,
                        longitudeDelta: 0.002
                    }}
                    onPress={(e) => setReceivingSpot({
                        longitude: e.nativeEvent.coordinate.longitude,
                        latitude: e.nativeEvent.coordinate.latitude,
                    })}
                    onPress={(e) =>
                        setReceivingSpotByMarker(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)
                    }
                >
                    <Marker
                        coordinate={{ latitude: currentSpot.latitude, longitude: currentSpot.longitude }}
                        style={{ alignItems: "center" }}
                        onPress={setReceivingSpotByCurrentSpot}
                    >
                        <MarkerTitle>현위치</MarkerTitle>
                        <MarkerIcon isCurrent={true} />
                    </Marker>
                    <Marker
                        coordinate={{ latitude: receivingSpot.latitude, longitude: receivingSpot.longitude }}
                        style={{ alignItems: "center" }}
                    >
                        <MarkerTitle>수령장소</MarkerTitle>
                        <MarkerIcon isCurrent={false} />
                    </Marker>
                </MapView>
                <FooterContainer>
                    <InputRow>
                        <InputRowTitle>현위치</InputRowTitle>
                        <CurrentSpotContent>{currentSpot.address}</CurrentSpotContent>
                    </InputRow>
                    <InputRow>
                        <InputRowTitle>수령장소</InputRowTitle>
                        {isGettingAddress ? (
                            <Text style={{ paddingVertical: 10, opacity: 0.35 }}>주소 변환중 ⋯</Text>
                        ) : (
                            <Input
                                placeholder="음식을 수령할 주소를 입력하세요"
                                value={receivingSpotInput.value}
                                onChange={receivingSpotInput.onChange}
                                onEndEditing={() => setMarkerByAddress()}
                            />
                        )}
                    </InputRow>
                    <MarkerGuide>주소를 직접 입력 후 엔터를 누르거나 지도화면을 터치하여 수령장소를 선택할 수 있습니다.</MarkerGuide>
                    <FooterBtn text="콜 요청하기" onPress={createCall} needStyle />
                </FooterContainer>
            </View>
        )}
    </>
}
