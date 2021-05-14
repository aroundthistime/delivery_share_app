import React, { useState } from "react";
import { FlatList, Image, View } from "react-native";
import styled from "styled-components";

const IndicatorsList = styled.View`
    position : absolute;
    flex-direction : row;
    justify-content : space-between;
    align-items : center;
    bottom : 20;
`

const Indicator = ({ isCurrent }) => {
    if (isCurrent) {
        return <View
            style={{
                width: 17,
                height: 17,
                borderRadius: 8.5,
                backgroundColor: "white"
            }}
        />
    } else {
        return <View
            style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: "white"
            }}
        />
    }
}

export default ({ images, width, height }) => {
    const [current, setCurrent] = useState(0);
    let array = [];
    for (let i = 0; i < images.length; i++) {
        array.push(i)
    }
    return (
        <View>
            <FlatList
                data={images}
                renderItem={({ item: uri, index }) => (
                    <Image source={{ uri }} style={{ width, height }} />
                )}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                onMomentumScrollEnd={(event) => setCurrent(event.nativeEvent.contentOffset.x / width)}
            // onScroll={() => slideImage(flatlistRef.current)}
            />
            <IndicatorsList style={{
                width: (images.length) * 10 + 7 + (images.length - 1) * 10,
                left: width / 2 - ((images.length) * 10 + 7 + (images.length - 1) * 10) / 2
            }}>
                {array.map(i => <Indicator isCurrent={i === current} />)}
            </IndicatorsList>
        </View>

    )
}