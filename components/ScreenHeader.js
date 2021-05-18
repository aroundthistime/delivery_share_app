import React from "react";
import { Platform } from "react-native";
import styled from "styled-components";

const HeaderContainer = styled.Text`
    background-color : white;
    height : 56;
    font-size : 20;
    text-align : center;
    text-align-vertical : center;
`

export default ({ title }) => (
    <HeaderContainer
        style={{
            ...Platform.select({
                ios: {
                    shadowColor: "rgb(50, 50, 50)",
                    shadowOpacity: 0.5,
                    shadowRadius: 5,
                    shadowOffset: {
                        height: -1,
                        width: 0,
                    },
                },
                android: {
                    elevation: 5,
                },
            })
        }}
    >
        {title}
    </HeaderContainer>
)