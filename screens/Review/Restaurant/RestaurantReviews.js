import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { FontAwesome } from '@expo/vector-icons';
import constants from "../../../constants";
import { useRestaurant } from "../../../Contexts/RestaurantContext";
import styles from "../../../styles";
import { formatDateYYMMDD } from "../../../utils";

const RATE_DETAIL_BAR_HEIGHT = 5;

const SORTING_METHODS_LIST = ["최신순", "별점높은순", "별점낮은순"];

const USER_IMAGE_SIZE = 40;

const Section = styled.View`
    padding-left : 15;
    padding-right : 15;
    padding-top : 20;
    padding-bottom : 20;
    margin-bottom : 10;
    background-color : white;
`

const ReviewsBrief = styled.View`
    align-items : center;
    justify-content : center;
    width : ${(constants.width - 55) * 3 / 8};
    margin-right : 20;
`

const ReviewsRate = styled.Text`
    font-size : 25;
    margin-bottom : 10;
`

const ReviewsCount = styled.Text`
    font-size : 14.5;
`

const ReviewRateDetails = styled.View`
    width : ${(constants.width - 55) * 5 / 9};
`

const RateDetailRow = styled.View`
    flex-direction : row;
    align-items : center;
    justify-content : space-between;
    width : 170;
`

const GageBarBg = styled.View`
    position : absolute;
    top : 0;
    left : 0;
    width : 90;
    height : ${RATE_DETAIL_BAR_HEIGHT};
    background-color : #f2efef;
`

const GageBarFilled = styled.View`
    position : absolute;
    top : 0;
    left : 0;
    height : ${RATE_DETAIL_BAR_HEIGHT};
    background-color : ${styles.yellowColor};
`

const RateDetail = ({ point, count, total }) => (
    <RateDetailRow>
        <View style={{ flexDirection: 'row', alignItems: "center" }}>
            <FontAwesome name="star" size={12} color={styles.yellowColor} />
            <Text style={{ marginLeft: 5, opacity: 0.55, fontSize: 13 }}>{point}</Text>
        </View>
        <View style={{ height: RATE_DETAIL_BAR_HEIGHT, width: 90, marginHorizontal: 10 }}>
            <GageBarBg />
            <GageBarFilled style={{ width: 90 * count / total }} />
        </View>
        <Text style={{ opacity: 0.55, fontSize: 13, width: 30 }}>{count}</Text>
    </RateDetailRow>
)

const SortingMethod = ({ text, isSelected, onPress }) => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <Text style={{ opacity: isSelected ? 1 : 0.45, marginLeft: 15, fontWeight: "600" }}>{text}</Text>
    </TouchableOpacity>
)

const ReviewHeader = styled.View`
    flex-direction : row;
`

const ReviewUserImage = ({ uri, onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <Image source={{ uri }} style={{ width: USER_IMAGE_SIZE, height: USER_IMAGE_SIZE, borderRadius: USER_IMAGE_SIZE / 2, marginRight: 10 }} />
    </TouchableOpacity>
)

const ReviewUserName = ({ onPress, name }) => (
    <TouchableOpacity onPress={onPress}>
        <Text style={{ fontSize: 15.5, fontWeight: "600", marginRight: 5 }}>{name}</Text>
    </TouchableOpacity>
)

const ReviewDate = styled.Text`
    opacity : 0.45;
    font-size : 12.5;
`

const ReviewStars = ({ rate }) => (
    <View style={{ flexDirection: "row" }}>
        {[1, 2, 3, 4, 5].map(n =>
            rate >= n ? (
                <FontAwesome name="star" size={13} color={styles.yellowColor} />
            ) : (
                <FontAwesome name="star-o" size={13} color={styles.yellowColor} />
            )
        )}
    </View>
)
// const ReviewItem = ({item}) => 

export default ({ navigation }) => {
    const [sorting, setSorting] = useState("최신순");
    const restaurant = useRestaurant();
    const review = {
        user: {
            username: "콘요맘떼",
            avatar: "data:image/jpeg;base64,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"
        },
        rate: 3,
        createdAt: new Date(),
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfm9sAif4WuRMQ7p00JYQoIGlcbeHMBhX6Qg&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAFyiY-Pdf-VSaiUHnw-1o0yOYX6X_-81TmQ&usqp=CAU"
        ],
        content: "맛은 괜찮은데 가성비가 좀 .... 그리고 요청사항에 오뎅 조금만 넣어달라고 했는데 너무 많이 넣어주셔서 속상했어요 ㅠ"
    }
    return <View>
        <Section style={{ flexDirection: "row", justifyContent: "center", marginBottom: 5 }}>
            <ReviewsBrief>
                <ReviewsRate><FontAwesome name="star" size={23} color={styles.yellowColor} /> {restaurant.rate}</ReviewsRate>
                <ReviewsCount>(총 {restaurant.reviewCounts}개 리뷰)</ReviewsCount>
            </ReviewsBrief>
            <ReviewRateDetails>
                <RateDetail point={1} count={37} total={restaurant.reviewCounts} />
                <RateDetail point={2} count={4} total={restaurant.reviewCounts} />
                <RateDetail point={3} count={17} total={restaurant.reviewCounts} />
                <RateDetail point={4} count={33} total={restaurant.reviewCounts} />
                <RateDetail point={5} count={44} total={restaurant.reviewCounts} />
            </ReviewRateDetails>
        </Section>
        <Section>
            <View style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                borderBottomColor: "#e0d5d5",
                borderBottomWidth: 0.45,
                paddingBottom: 5,
            }}>
                {SORTING_METHODS_LIST.map(method => (
                    <SortingMethod
                        text={method}
                        isSelected={sorting === method}
                        onPress={() => setSorting(method)}
                    />
                ))}
            </View>
            <View style={{ paddingVertical: 20 }}>
                <ReviewHeader>
                    <ReviewUserImage uri={review.user.avatar}
                        onPress={() => 1}
                    />
                    <View>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 1 }}>
                            <ReviewUserName name={review.user.username} onPress={() => 1} />
                            <ReviewDate>{formatDateYYMMDD(review.createdAt)}</ReviewDate>
                        </View>
                        <ReviewStars rate={review.rate} />
                    </View>
                </ReviewHeader>
                {review.images.length && (
                    <View style={{ marginVertical: 10 }}>
                        {review.images.map(imageUri => (
                            <Image
                                source={{ uri: imageUri }}
                                style={{ width: constants.width - 40, height: constants.width - 40, marginBottom: 5 }}
                                key={imageUri}
                            />
                        ))}
                    </View>
                )}
            </View>
        </Section>
    </View>
}