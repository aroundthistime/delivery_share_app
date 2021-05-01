import React from "react";
import styled from "styled-components";

const NumInputBox = styled.TextInput`
    padding-left : 10;
    padding-right : 10;
    padding-top : 5;
    padding-bottom : 5;
    background-color : #F8F8F8;
    border-radius : 4px;
    font-size : 16;
`

const getWidth = (size) => {
    if (size === "small"){
        return 60
    } else if (size == "middle"){
        return 100
    } else{
        return 150
    }
}

export default ({size, placeholder="", value, onChange, textAlign="left"}) => (
    <NumInputBox 
        onChangeText={onChange}
        keyboardType={"number-pad"}
        placeholder={placeholder}
        value={value}
        style={{width : getWidth(size)}}
        textAlign={textAlign}
    />
)