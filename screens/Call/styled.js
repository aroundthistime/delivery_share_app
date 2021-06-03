import React from "react";
import styled from "styled-components";
import { FontAwesome5 } from '@expo/vector-icons';
import styles from "../../styles";

export const ButtonContainer = styled.View`
  margin-top: 30px;
  padding-left : 5;
  padding-right : 5;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Divider = styled.View`
  border-bottom-color: #cdcdcd;
  border-bottom-width: 1px;
  margin: 30px 5px;
`;

export const MenuContainer = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

export const InputContainer = styled.View`
  display: flex;
  margin-bottom: 30px;
`;

export const TextInputBox = styled.TextInput`
  height: 40px;
  border-color: #ededed;
  border-bottom-width: 1px;
  padding: 10px;
`;

export const TextTitle = styled.Text`
  font-weight: bold;
  margin-bottom: 15px;
`;

export const TextContainer = styled.Text`
  border-color: #ededed;
  border-bottom-width: 1px;
  padding-left : 10;
  padding-right : 10;
  padding-bottom : 10;
`

export const MarkerTitle = styled.Text`
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

export const MarkerIcon = ({ isCurrent }) => isCurrent ? (
  <FontAwesome5 name="map-marker-alt" size={30} color="#4081EC" />
) : (
  <FontAwesome5 name="map-marker-alt" size={30} color={styles.themeColor} />
)