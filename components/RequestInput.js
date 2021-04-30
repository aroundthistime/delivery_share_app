import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";
import { View } from "react-native";

const TextInput = styled.TextInput`
    width : ${constants.width - 20};
    padding : 10px;
    background-color : #F8F8F8;
    border-radius : 4px;
`

const RequestInput = ({
    placeholder,
    value,
    keyboardType = "default",
    autoCapitalize = "none",
    onChange,
    secureTextEntry = false,
    autoCorrect = true,
    maxLength = constants.requestMaxLength
  }) => (
    <View style={{marginBottom : 10, alignSelf :"center"}}>
      <TextInput
        onChangeText={onChange}
        keyboardType={keyboardType}
        placeholder={placeholder}
        autoCapitalize={autoCapitalize}
        value={value}
        secureTextEntry={secureTextEntry}
        autoCorrect={autoCorrect}
        multiline
        blurOnSubmit
        maxLength={maxLength}
      />
    </View>
  );
  RequestInput.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    keyboardType: PropTypes.oneOf([
      "default",
      "number-pad",
      "decimal-pad",
      "numeric",
      "email-address",
      "phone-pad"
    ]),
    autoCapitalize: PropTypes.oneOf(["none", "sentences", "words", "characters"]),
    onChange: PropTypes.func.isRequired,
    autoCorrect : PropTypes.bool
  };
  
  export default RequestInput;