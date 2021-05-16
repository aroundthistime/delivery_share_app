import React, { Suspense, useEffect, useRef, useState } from "react";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Alert, Keyboard, Modal, ScrollView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components";
import Loader from "../../components/Loader";
import constants from "../../constants";
import { formatAmPm, getOpponent } from "../../utils";
import styles from "../../styles";
import Message from "../../components/Message";
import useInput from "../../Hooks/useInput";

const FONT_SIZE = 16;
const NUMBER_OF_LINES = 2;

const ChatNotice = styled.Text`
    text-align : center;
    align-self : center;
    padding-left : 10;
    padding-right : 10;
    padding-top : 5;
    padding-bottom : 5;
    border-radius : 10;
    font-size : 13;
    margin-bottom : 5;
    background-color : #c9cbcc;
    color : white;
`


const ChatInputContainer = styled.View`
    flex-direction : row;
    width : ${constants.width};
    position : absolute;
    bottom : 0;
    left : 0;
    background-color : ${styles.bgColor};
`

const ChatInput = styled.TextInput`
    padding-top : 5;
    padding-bottom : 5;
    padding-left : 15;
    padding-right : 15;
    flex : 1;
    font-size : ${FONT_SIZE}
`

const ChatInputScrollbar = styled.View`
    width : 5;
    background-color : #c2c3c4;
    position : absolute;
    right : 45;
    border-radius : 3;
`

const ChatSendBtn = styled.TouchableOpacity`
    justify-content : center;
    align-items : center;
    width : 40;
`

const ScrollBottomBtn = styled.TouchableOpacity`
    justify-content : center;
    align-items : center;
    position : absolute;
    bottom : 70;
    right : 20;
    width : 40;
    height : 40;
    border-radius : 20;
    background-color : rgba(0, 0, 0, 0.5);
`

const ModalCloseBtn = styled.TouchableOpacity`
    position : absolute;
    top : 10;
    right : 10;
    width : 25;
    height : 25;
    border-radius : 5;
    background-color : #E0E0E0;
    justify-content : center;
    align-items : center;
`

const ModalBackBtn = styled.TouchableOpacity`
    position : absolute;
    top : 10;
    left : 10;
    width : 25;
    height : 25;
`

const ModalTitle = styled.Text`
    font-size : 17.3;
`

const ModalOptions = styled.View`
    flex-direction : row;
    justify-content : space-between;
    width : 240;
    height : 110;
    background-color : #e8e3e3;
`

const ReportModalOptions = styled.View`
    margin-top :10;
    width : 240;
    height : 160;
    background-color : #e8e3e3;
    justify-content : space-between;
    padding-bottom : 1;
`

const ReportModalOption = styled.TouchableOpacity`
    width : 240;
    padding-top : 10;
    padding-bottom :10;
    padding-left : 10;
    background-color : ${styles.bgColor};
`

const ModalOption = styled.TouchableOpacity`
    align-items : center;
    padding-top : 20;
    justify-content : space-between;
    width : 119.2;
    background-color : ${styles.bgColor};
`

const DetailModalColumns = styled.View`
    margin-top : 20;
    width : 260;
`

const DetailModalColumn = styled.View`
    flex-direction: row;
    margin-bottom : 3;
`

const DetailModalColumnTitle = styled.Text`
    padding-top : 5;
    padding-bottom : 5;
    background-color : #c9cbcc;
    font-size : 15.5;
    text-align : center;
    text-align-vertical : center;
    opacity : 0.7;
    width : 75;
`

const DetailModalColumnContent = styled.Text`
    padding-top : 5;
    padding-bottom : 5;
    padding-left : 5;
    padding-right : 5;
    font-size : 15.5;
    opacity : 0.7;
    width : 185;
    border-width : 1;
    border-left-width : 0;
    border-color : #c9cbcc;
`

const ReportContentInput = styled.TextInput`
    padding-top : 5;
    padding-bottom : 5;
    padding-left : 5;
    padding-right : 5;
    width : 185;
    height : 120;
    opacity : 0.7;
    border-width : 1;
    border-left-width : 0;
    border-color : #c9cbcc;
    text-align-vertical : top;
`

const ReportSubmitBtn = styled.TouchableOpacity`
    margin-top : 7.5;
    justify-content : center;
    align-items : center;
    width : 85;
    height : 35;
    border-radius : 3;
`

export default ({ navigation, route }) => {
    const [messageValue, setMessageValue] = useState("");
    // const reportContentInput = useInput("");
    const [reportContentValue, setReportContentValue] = useState("");
    const scrollViewRef = useRef();
    const [viewScrollBottomBtn, setViewScrollBottomBtn] = useState(false);
    // const [sendMessageMutation] = useMutation(SEND_MESSAGE);
    const [messages, setMessages] = useState([]);
    const [opponent, setOpponent] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [reportModalVisible, setReportModalVisible] = useState(false);
    const [reportDetailModalVisible, setReportDetailModalVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(true);
    const [reportReason, setReportReason] = useState();
    const [chatInputScroll, setChatInputScroll] = useState({
        showing: false,
        top: 0
    })
    const [chatInputContentSize, setChatInputContentSize] = useState();
    // const [readMessageMutation] = useMutation(READ_MESSAGE);
    // const [quitChatMutation] = useMutation(QUIT_CHAT);
    // const [reportUserMutation] = useMutation(REPORT_USER);
    // const userObj = getUserObj();
    const userObj = {
        id: 1
    }
    const {
        params: { chatId, opponentName }
    } = route;
    navigation.setOptions({ title: opponentName });
    // const { data: newMessageData, loading } = useSubscription(
    //     NEW_MESSAGE_FROM_CHAT,
    //     {
    //         variables: {
    //             id: chatId
    //         }
    //     }
    // );
    // const { data: messageReadData } = useSubscription(
    //     DETECT_MESSAGE_READ,
    //     {
    //         variables: { chatId }
    //     }
    // );
    const scrollToBottom = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd();
        }
    }
    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 200;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };
    // const { data, error, refetch } = useQuery(GET_CHAT, {
    //     suspend: true,
    //     variables: {
    //         id: chatId
    //     }
    // });
    const data = {
        getChat: {
            messages: [
                {
                    from: {
                        id: 2,
                        avatar: "data:image/jpeg;base64,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"
                    },
                    to: {
                        id: 1,
                        avatar: "https://blog.kakaocdn.net/dn/bD47H0/btqK83X5qWz/cwP9qA8R3r2BnJOaTtZXrK/img.jpg"
                    },
                    text: "안녕하세요",
                    isChecked: true,
                    createdAt: new Date()
                },
                {
                    from: {
                        id: 1,
                        avatar: "https://blog.kakaocdn.net/dn/bD47H0/btqK83X5qWz/cwP9qA8R3r2BnJOaTtZXrK/img.jpg"
                    },
                    to: {
                        id: 2,
                        avatar: "data:image/jpeg;base64,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"
                    },
                    text: "네넹 안녕하세요",
                    isChecked: true,
                    createdAt: new Date()
                }
            ],
            participants: [
                {
                    id: 1,
                    username: "이지금",
                    avatar: "https://blog.kakaocdn.net/dn/bD47H0/btqK83X5qWz/cwP9qA8R3r2BnJOaTtZXrK/img.jpg",
                    isBanned: false,
                },
                {
                    id: 2,
                    username: "콘요맘떼",
                    avatar: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFRgVFRUYGRgYHBgZGBgaGBgYGhkaGRgZGhkYGhkcIS4lHB4rIRwZJjgmKy8xNTU1GiQ7QDszPy40NTEBDAwMEA8QHhISHjQhJCQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDE0P//AABEIANUA7AMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAQMEBQYCB//EADoQAAEDAQUFBwIFBAIDAQAAAAEAAhEDBBIhMUEFUWFxgQYikaGxwfBC0RMyUuHxFGJygiOSM8Lysv/EABgBAAMBAQAAAAAAAAAAAAAAAAABAgME/8QAHxEBAQACAgIDAQAAAAAAAAAAAAECESExA0ESIjIT/9oADAMBAAIRAxEAPwD0dCAlQZEqEIAQlQgEQlQmQARCVCAEISEpAqRQbTtajTwfUY07i4T4Jultqi6S17XAYmNBxRuHpZIWcZ2voF5ZBAEd9xABxjAZnwUl/aag1wYXS45Mpg1HzuIaM+Uo3BpdIVKztNRmHh9PSalN7B1JEAcTAVwx4cJBkIlJ0khKhMEQlSIAQhCDIhKkQCISpEAIQhIOkIQgghCVACEJUAiVCEAIQqntDtplmZJxe6bjN5/UdzRvQcmz21tsUrO2XugnJoxceQ9zgvO9sdrq1WWsP4bNzSbxHF2qpto259V7nvJc5xxO/wDtA0AUB7vHVTbariFqVt8k+aRtRwyJHGdNeaZnXw4oI6k/PBEK0+a2GOJRTfuwOuJBHgmGDjPopX4bfHHhyTSkHaFQi6aryNxe4jwJKuNidp61nAZg9gyBwLRuad3BZ+Bv9Y81w6NHHwSqpXs2yds067L7HcDoQTo4aFWgK8T2VtJ9B4ex2OTm6ObqCNV61snaDarGvYe67xa7VpTlFiyQlQqSRIlSIAQUIQCISpEGRCVIih0hKhIBCEqCCEIQAhCEAzbLS2mxz3mGtBJPtz06ryTbO0X16jqjvqwA/S0ZN+akrWdvtpfloNP97/8A1B9fBYV2J8lN5VODDt/RRyJ+/wA1UioJMbky5vz50HgiCmwNeg+csUtyZ3evzcnLkDicvc+KkUqWQStGjVCyE5BW9l2a4fnyOW/HVW2ytmmAY+eyu/6EdeSzuVa44Ri7TsXVpVZX2W9vEL0R1jG5Rn7OEZJTOw745Xm5ABiTO6Fp+yO3DQeWOJuPwcP0n9Ue/wDCj9oNjQC9uYVFSqzDsjrwIWsy+U2ys+N1XvtmqB7Q4GQRmNeKdWM7BbVvt/CccQJbvwwI5YD4Vs1c5TYEiVCZOUJUIBEIQgEQlQgFQlQkAhCEAIQhAKE3aKwYxz3ZNBJ6J1ZrtvbLlEMGbz5BF4OMBtG1OqPe9xm8SfPADgobcJO71P8AK7edOv2+6bc2SG8MfU+ynR005uHP0+QuA2SnX5oo58gThvIz9fJMGyMZ3QBz/iPEb1dbGsBc5t7UknlH3I81V2aleeBxx5/zh/qt7saytYJjE5/ZY5X01wx3ysLNZw0ZJ4tQ+q1v5nAcz7JoWph+oeKTR05ibLE7fByKSEjUu1qEtK85tNK5Uc3Q4j3XqVvEgrzvtDTu1Gu4/dVh2y8s3NpXZe3GnWYZ+oeBC9mY+QCNQCvBrM+64HcfGMV7bsWtfosMz3YnfGEraMr0nFCEKkkQlSIBEJUiAEIQgOkIQkAhCEwF0uV0gBefdt7RfrBg+hoHVxk+QC39SoGtLjk0EnkBJXkO07SXve85uJPj9gpyqohME/7HynAeCSMCdTl1MA+ngnHCBhpJ8AVy1uQ+YBAMVsB5D3K4s+TjpIHufTzS2k4/Nf2B8kU2wwDfePU4D2Soi02JQkgra2Zj4hpDRvzPQLPbCowAtO9jg2WgE7phc95rqxmohWnZTSDL3nfiBPVQDsikDgThxlMbVpWgtLnOJN4dxhLRcxvQR3icsBGExio+yrMW2e+9xFW+SxpeXEthvdc3EgEzniJ6KpjxvaflPlrTRWWzARiVMrOuiVH2YS7GDiBnniJxRtYwAFKvaot9N7xDXEcVkNvWJzGy596CDjmMVb7X2rUNT8ClIIcGnCb7iAYHDGMNx4Ko7XAseWBxLTETGBnESrxl4ZZ2XcV1EzC9g7H171EA5iDp9WeXELx6y4x1Xo/YK1z3Zx3cCBB8R5rXfLLXDdIXS5VpCEIQCJEpQgEQhCA6ShIhACELpIBAQEqYUPa+23KBYM393pr84rzaqMuJnp8labtZa/xH4ZZN3Rv65+G5ZuqQSOHz3Kzt5X6MPyXcZ8BH3XdRmLd0SfBckYc8UWiRCqNJcPm/7ea6YMhxASxiTuBjwEfdc0z3hwcptVJy2+x6eAWhp0pCpNk/lCvqRWcdFM1aaif0olWT2ymiITIWajGSY2rQvNndipNKoF1aGS3mj0FD+C1wxAMrLdrdmA0y5oAu4rZU6cS3cq/brR+E+f0u9ClLospuPN7Djjw+FaDYltdRcx7cbuYykaj5uVLs9vdPAD0Ks9ngGWnI5HcTPkrt5Yzp7LZLS2oxr2GWvEg/NRl0Tq8/7K7WdZaxs1fBj3dxxyZUOhOjXevVegLaXcZ2aCEITIJEqEAiRKkQHS6XK6QAhCAgFUDbFpuUzjBdgPUnwnyU9ZrtG8vqMpjIAudrrA5an/VLK8HGO2zWN/HDAEaQ0iRhphj4KqJlwHyTP3CldoKs13jSSANIGnkollxM65/YeKiKqZVbJ+fNyj1HZkch91NEBuOZwHTXwVdaXwIGWfMnIKao2ciBoAPGJ8lzZIc7mUzaalxpE4kSfnUI2aYd86pWcHjeW+2RkFf0ln9lOwC0FErON6fITFRPymXqqUMMc5s3QCTlooDX2hjDfc2o/OQAxo4CBl581Y1rSxglxjdvPIKptG1GSSJhKqmOV6h2yuJxdnqcpPAblSdsbRdoOH64b/2wPlKuLPWDmyFie21rvVKdMaS93o3/ANvBGPNRndRV2HI9VabCZfqhn6i3HdiCquyHMc/RWGx6gZVY45S2eUxKu9sZ01e1tjfjX2HB7Wy05DAkDofI8CrXsXt51QGzVz/z0hEnN7BhP+QwB5g71ZOo3rr8nODhwywB8As92g2Q8kWmzi5XpO8RA7p0JxI4jDVaThFblCqOzW3GWulfAuvb3ajP0u4bwdFbq0hCEIAQhCA6QhcoDpEIhAQAVl/xA6pVq53TDP8AWWtHV5qeAWgt1QtYYzODeZWR7QP/AAab2NOLrgbxgEHxJk8MSpyVGGtLy5738TE781Is7brRv+FNUmZaxjzOp8VKb+YDx9SolVpxaqsODeY6wZVe54xcTllzKKlWXknR0+ajW0EPI0GA+w+bkE5HeknL+J85UuwMx5n2BUaC0BvAk8zgPdPU6l1zOZPQCPc+CWXSpOWy2a+7ErTWapIWasQD2AhT7NaiwwclhLp0NAHKNXBIIBhdUqodqu3MVbLpRVdjA4uc953l0HywVRaNltExfHAOPsVsH0sFXVqIElFa4+W4zSrsDPw2OLnGMTjHdA/heb2u2/jV31NHHug6NGDfLHqVou2m14H9Ow4uxedzdG8z6c1lLC3Fa4Y8bcnmz+WWlpQfDp5KY3An5qfuq4Zxv9lYTiOOfUBFhSvV9j2i/Qpv1Abe3EtN05ZZk9VYVqEy5ueo/UBoeKyvYC1Sx9N2bcQN4yPh3fELahu9aY8xGXbAbVDrDaW2uk0mm/u1mAYZ6/3bjvHEreWaux7GvY4FrgHNI1BUS32Fr2uaWh7XYPYfqGUjcePBZ/s7UdY6v9I8k0qjibM8iIdm6k/c7X+UdE16EIVEChCEB0hCEAJYUepWLMSCRvHuE1T2nSdN14MZgESOclLYd2nE8GgnrB+dVhu2VoF+4DjHe4DuwOseS01q21SYHEvb9UgG87DuiWsmMAvObXbHVXF0EkySYgb45D2UZZLxgIDGAk4kzd9Cfsm6Tvzvd9IMLm0Uje7zrxwk47p1RbnRTDBPe3CTG4DU5eKiLUYfe8/P4VYVheDXf6n/ACbA9PRRLM0Eg5NyH3PFTWECW6HDroVVREeocY8fFR6j5fO6B0H7ynq2AO9RWt1RIdrb7Bqy0eiunsBCyGw7RGE6zxWwpvkSsLNV0Y3ccUnuYe6ehUxm1W/Vh6KM5qoO0drNOk9wOMEN5nAIkFsk207ts0XZVGH/AHb91Q7d7U0KbCGPa9+jGkOx/uIwaPNeVtZvC7pNW/8AOOb+1vUOVqjnuc95lziSTvJ9k/Zm+ybYzFP0mq6idnnuh7DopzxlxEddPJQa7ZjhP3UqiCWDePZRVxsew1YiuAdQf/zHq1i9MBXlnZL/AMzCM4M/9mleotxVY9Fl2Uqv2rstldjmO1jHiMWuB0cDiHDEHfiDYoVpUtk2oWMuWiRUYbuAH/IPpqN0xGe48C2bajVa9oc0yD8hZ3tQ8PN0EAsBIdufBwO8ZYc0z2Y20wMLKmD5kNH1CMS0nMeaz+X201/n9d+2qQuaVQPAc0yCuloydIQhADhO/oSPMKHaNmUX4vYHkZF8vjlfJhTUFAYrb9kZRa5rKFMNxIcGgRwJjAYjDXBZ6jS77L2+DrngfnFel2+y32ua4i68XXAicNDErA7Q2c6k8sdPdxaRqIMOGcflErLKaaY1RPbJO6cTvTNUh7nbmtgcCRnzjDqn7R+X5iob6ou5xjP3kqYqo1UhuA6bh9yh2h0iZTNSsOfFMPtV7ujLQ7zuO5XpFukhz5Jn4MlwxsOIKZpOxxPzJPuOPHIoLtKsTyxwO70yW3sFWWrCU3Yg7/hWo2PWwHDDofgWWcbeO+l49+Cw/bKqSGsG/FbCs7ArD9oTee0cCUsP0fk6Zty7s4SuZI8EtNvlmun05dcn2DLn7hdswJ6pKbsRzHsnQzE8UlaOOZIBGmfspdFkNn/KB0Cj0gWgf9SN53Ka14cADhcDzpJcYgeQUKjV9hKQdVcT9LRd4OP/AMlejMyWL7DWS6ajh9NxvVpeXcswORC2wVYzgsryFG2jWLKbnDPIcz+0nopSqNtv/Izm4+g908rqDCbyZ6qwvN3TN067gu6wkhjAL2pIkNHLU7hwUS32p1N8ty+rCY4qRTe2mwvm852OeJJXP27NcLOjajSDRfJjQx3pzwCvP6yn+tvmsTStTWi/UxfjlJEf2jTqp9C0yJuSJMHeNCqmVjPLxytehCF0OUoQhN1GTkYPzAoDsqj25ss1B3fzCY64xy4eqtS6oNGu4g3fIqPaPxSQG3Wk64uIG/DDDr7qbyc4eY1QSLp6DpHrKorTReJOcTpuXsNm7O0AHX2l7nOJvEuaYJOrYg46QmtpdnKD2XGtAAyxM+JUzGxfyjw+0zEqLfLdOa3+2OxVVgLqQvj9OTug/dZEbIql5aWEEYODgWlvMESE+kWb6RqVSc8eOfiny8x8xC6dZGtEXhIwIUR9Q5fPFHY67TaFbfoQQtPsZ/nPiBI91i6L4MLYbApktHBw8yP3WWcbeO7aO0t7uCx+3LOT3x9Potq5ktVLbLPgZCjG6rXKbjD1qcYjI++ijNfBkGDmFOtTSx5bm3dvCYdQacRO+Nf3XRK5LOXLRexAgiJAyOQkD2UikyTJMA6apynRZdLQx5eSLpEzxBbGPMKPUY5sXhEid+fwYI7E4TahBiMgSft7+KutnWOT3iA4XQQ4SA2HVH35GHda4CBMhUVkeLwJywJHst72Q2a6q+88Esb3nk5OLi113dJLRI/S4g5hTrlW2i2Fsz8Om0CpUpvdL3shhaC7ENDXtd+UQ2WnRXdGk8fmqFw/xa30CkNRC00nZVQ7aP8AyDg0epV8qHbP/k6BTn0rD9Ki20bzSoDLNgIHActyuntkJgUoWFnLql4MU6QwnHgpTGwIhdMpgDFW9i2ewsBe2Scemn36qpNlllpaIQhdDjCVIhAKBOCfayB7rmk2BOp9E7CcCNUUWo1WUAmCFXVqd1xAyRTR70KPb9n06rYc2HR3XjBw4TqOCmOppstI08MVNmzleUbd7N1qby4sYWnIg92euvBZ+tZXA4tPgPWF7uGtcC1wDgcCCJHULObY7ItMvoid7Dif9SfQ/soss6OavbyZtA7luOz1Lu3tMucZevoqulsh76kXHNgwQ4Q6dZ/T7LY2GwXGAbvBZ5XbXHHTtrcFFtFCVYFiaexQ028+7RWQtMxgc+HEKjIcdMN+mWvkvUrTZWvEOAIVLadjXZuNEHTLqFeOXGmWWG7uMhZKrmkGeU+oK1H4F+kGPo1HnC6Qxry0T9DgZAx13pKmziwNcBLmxhvAzHzctZspoc1rhzBVTLaLjpj9m9mXufLmlrB9LnC+eEQvStlOFNoa1sNA/Lp/PFcluM66pWq5Erpjw4SF0qulUIMhWFKqHc932VbJ2qLbY74/xHqVfLNbSqXqruBujph6ypzvCvHPsbCLq6DVw9yxdMp+xUL74+kYu5buq0KjWChcYBqcXfbon1thjqObPLddIQuVaHSVjZIC4T9nbmenigHRmgpUhTAZmoVpPeKmsVfVdLiimVuK4c5dtyTIKQdtAOi6ewsxGIXNMYqW9shAQa9nZUxIh36hn13hVtezOZgRhoRkfsrQNXRxEHEaqMsZVY5WKJzUy9itq9h1Z4H2KgPYRgRB3LLLGxrMpekJzFxcUp7E1CjS0d9CV3sptx9w5OMt4O1HXPmOKfDVxVpSI8xmNxB0ITl1yVm17SZewOeibLIMFR9m2y/g499n5h+pujx8z6K0ewOE6jzC3l2wymqjNC6AIxC6a1dgJpSqFS8OIzWV/EvOc7eSfEytBUqXGPduYfE5eZWfs7Vn5L018U7qS1PWOkHVGjQYnp+8JlgU/ZLe888APE/sljN2KyupVoUIXK3c7pCEIAUml+UeKVCIClI5CEzI7BpVbqhCVDt2SaahCKDtPNTAhCAg1R3l2xCEArwmXsDm94T83oQpCsttAMiMjpu6qA9KhY2ct505YU6hCiLQbbLYqNMOZi0+oI1B3LSbMtJcxj4iQDGmIyQhaYd1nn0mV2AHDVcBIhbMUTbRiiY+pzQeWJ9lV0BghCxz/Tfx/k+FY7HyfzA8B+6EJ4dln+VikQhbMH//2Q==",
                    isBanned: false
                }
            ]
        }
    }
    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", scrollToBottom);
        setMessages(data.getChat.messages); // -> 나중에 지우기
        return () => {
            Keyboard.removeListener("keyboardDidShow", scrollToBottom);
            navigation.addListener("focus", () => setIsFocused(true));
            navigation.addListener("blur", () => setIsFocused(false));
        }
    }, []);
    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', async () => {
    //         await refetch();
    //     });
    //     return unsubscribe;
    // }, [navigation]);
    // useEffect(() => {
    //     if (newMessageData && newMessageData.newMessageFromChat) {
    //         setMessages([...messages, newMessageData.newMessageFromChat])
    //     }
    // }, [newMessageData]);
    // useEffect(() => {
    //     if (messageReadData && messageReadData.detectMessageRead) {
    //         const readMessage = messageReadData.detectMessageRead.message;
    //         const updatedMessages = messages.map(message => {
    //             if (message.id === readMessage.id && message.from.id === userObj.id) {
    //                 return ({
    //                     ...message,
    //                     isChecked: true
    //                 })
    //             } else {
    //                 return message
    //             }
    //         });
    //         setMessages(updatedMessages);
    //     }
    // }, [messageReadData]);
    useEffect(() => {
        if (data && data.getChat) {
            setMessages(data.getChat.messages);
            setOpponent(getOpponent(data.getChat.participants, userObj.id))
        }
    }, []); //data 리스트 안에 넣어야됨
    useEffect(() => {
        if (route.params && route.params.showModal) {
            setModalVisible(true);
            navigation.setParams({
                ...route.params,
                showModal: false
            })
        }
    }, [route])
    // if (isFocused && messages.length > 0 && messages[messages.length - 1].from.id !== userObj.id) {
    //     readMessageMutation({
    //         variables: {
    //             messageId: messages[messages.length - 1].id
    //         }
    //     })
    // }
    const formatToFullDate = (time) => {
        const date = new Date(time);
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
    }
    const checkSameDate = (timeStr1, timeStr2) => {
        const time1 = new Date(timeStr1);
        const time2 = new Date(timeStr2);
        return time1.getDate() === time2.getDate();
    }
    const checkSameTime = (timeStr1, timeStr2) => {
        const time1 = new Date(timeStr1);
        const time2 = new Date(timeStr2);
        const sameMinute = time1.getDate() === time2.getDate()
            && (time1.getHours() === time2.getHours())
            && (time1.getMinutes() === time2.getMinutes());
        return sameMinute;
    }
    const sendMessage = async () => {
        if (messageValue === "") {
            return
        }
    }
    // const sendMessage = async () => {
    //     if (messageValue === "") {
    //         return
    //     }
    //     try {
    //         sendMessageMutation({
    //             variables: {
    //                 chatId,
    //                 opponentId: opponent.id,
    //                 text: messageValue
    //             },
    //         });
    //         setMessageValue("");
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    // const quitChat = async () => {
    //     const { data: { quitChat: quitChatSuccess } } = await quitChatMutation({
    //         variables: {
    //             id: chatId
    //         }
    //     });
    //     if (quitChatSuccess) {
    //         navigation.pop();
    //     } else {
    //         Alert.alert("오류가 발생하였습니다. 다시 시도해주시길 바랍니다.")
    //     }
    // }
    // const reportUser = async (reason) => {
    //     try {
    //         const { data: { reportUser: reportUserSuccess } } = await reportUserMutation({
    //             variables: {
    //                 id: opponent.id,
    //                 chatId,
    //                 reason
    //             }
    //         });
    //         if (reportUserSuccess) {
    //             Alert.alert("해당 유저에 대한 신고가 완료되었습니다")
    //             navigation.pop();
    //         } else {
    //             Alert.alert("오류가 발생하였습니다. 다시 시도해주시길 바랍니다.")
    //         }
    //     } catch {
    //         quitChat();
    //     }
    // }
    const confirmReportUser = (reason) => (
        Alert.alert(
            `${opponentName}님을 '${reason}'으로 신고하시겠습니까?`,
            "신고시 더 이상 해당 유저로부터 메시지가 수신되지 않으며 채팅목록에서 삭제됩니다.",
            [
                {
                    text: "확인",
                    // onPress: () => { reportUser(reason); }
                    onPress: () => 1
                },
                {
                    text: "취소",
                    onPress: () => 1
                },
            ],
            { cancelable: false }
        )
    )
    const confirmQuitChat = () => (
        Alert.alert(
            `정말로 ${opponentName}님과의 채팅을 종료하시겠습니까?`,
            "",
            [
                {
                    text: "확인",
                    // onPress: () => { quitChat() }
                    onPress: () => 1
                },
                {
                    text: "취소",
                    onPress: () => 1
                },
            ],
            { cancelable: false }
        )
    )
    const canSubmitReport = () => reportReason !== "기타" || reportContentValue !== ""
    const submitReport = () => {
        setReportDetailModalVisible(false);
        // reportContentValue, reason, 현재 유저 정보, 상대 유저 정보 전송(id)
    }
    return (
        <Suspense fallback={<Loader />}>
            {data && data.getChat ? (
                <>
                    <KeyboardAwareScrollView
                        style={{ flex: 1, paddingBottom: FONT_SIZE * NUMBER_OF_LINES + 30 }}
                        ref={scrollViewRef}
                        // contentContainerStyle={{flexGrow: 1}}
                        onScroll={({ nativeEvent }) => {
                            if (isCloseToBottom(nativeEvent)) {
                                setViewScrollBottomBtn(false);
                            } else {
                                setViewScrollBottomBtn(true);
                            }
                        }}
                    >
                        <ScrollView
                            style={{ paddingBottom: FONT_SIZE * NUMBER_OF_LINES + 25, paddingHorizontal: 15, paddingTop: 20 }}
                            ref={scrollViewRef}
                            onContentSizeChange={() => scrollViewRef.current.scrollToEnd()}
                        >
                            {messages.map((message, index, array) => {
                                let isChecked = false;
                                let createdAt = "";
                                const fromMe = userObj.id === message.from.id;
                                if (fromMe && index === array.length - 1) {
                                    isChecked = message.isChecked;
                                }
                                if (index === 0) {
                                    if (array.length === 1 || !checkSameTime(array[1].createdAt, message.createdAt) || array[1].from.id !== message.from.id) {
                                        createdAt = formatAmPm(`${message.createdAt.getHours()}:${message.createdAt.getMinutes()}`);
                                    }
                                    return (
                                        <>
                                            <ChatNotice>{formatToFullDate(message.createdAt)}</ChatNotice>
                                            <Message
                                                fromMe={fromMe}
                                                isMyFirst={true}
                                                avatar={fromMe ? undefined : opponent.avatar}
                                                text={message.text}
                                                createdAt={createdAt}
                                                isChecked={isChecked}
                                            />
                                        </>
                                    )
                                } else {
                                    let avatar;
                                    let isMyFirst = false;
                                    if (array[index - 1].from.id !== message.from.id) {
                                        if (fromMe) {
                                            isMyFirst = true;
                                        } else {
                                            avatar = opponent.avatar;
                                        }
                                    }
                                    if (index === array.length - 1 || !checkSameTime(message.createdAt, array[index + 1].createdAt) || (message.from.id !== array[index + 1].from.id)) {
                                        createdAt = formatAmPm(`${message.createdAt.getHours()}:${message.createdAt.getMinutes()}`);
                                    }
                                    if (checkSameDate(message.createdAt, array[index - 1].createdAt)) {
                                        return (
                                            <>
                                                <Message
                                                    fromMe={fromMe}
                                                    avatar={avatar}
                                                    text={message.text}
                                                    createdAt={createdAt}
                                                    isMyFirst={isMyFirst}
                                                    isChecked={isChecked}
                                                />
                                            </>
                                        )
                                    } else {
                                        return (
                                            <>
                                                <ChatNotice>{formatToFullDate(message.createdAt)}</ChatNotice>
                                                <Message
                                                    fromMe={fromMe}
                                                    avatar={opponent.avatar}
                                                    text={message.text}
                                                    createdAt={createdAt}
                                                    isMyFirst={isMyFirst}
                                                    isChecked={isChecked}
                                                />
                                            </>
                                        )
                                    }
                                }
                            })}
                            {data.getChat.participants.length < 2 && <ChatNotice style={{ marginTop: 30, marginBottom: 20 }}>상대방이 대화를 종료하였습니다.</ChatNotice>}
                            {data.getChat.participants.length === 2 && opponent && opponent.isBanned && (
                                <ChatNotice style={{ marginTop: 30, marginBottom: 20 }}>상대방의 계정이 규정위반으로 정지되었습니다</ChatNotice>
                            )}
                            {data.getChat.participants.length === 2 && opponent && !opponent.isBanned && opponent.isDeactivated && (
                                <ChatNotice style={{ marginTop: 30, marginBottom: 20 }}>상대방의 계정이 비활성화되었습니다</ChatNotice>
                            )}
                        </ScrollView>
                    </KeyboardAwareScrollView>
                    <ChatInputContainer>
                        <ChatInput
                            value={messageValue}
                            onChangeText={text => setMessageValue(text)}
                            multiline
                            numberOfLines={NUMBER_OF_LINES}
                            placeholder="메시지를 입력하세요"
                            maxHeight={FONT_SIZE * 4 + 28}
                            scrollEnabled
                            onScroll={(e) => {
                                setChatInputScroll({
                                    ...chatInputScroll,
                                    top: 82 * (e.nativeEvent.contentOffset.y / chatInputContentSize) + 5
                                })
                            }}
                            onLayout={e => {
                                if (e.nativeEvent.layout.height === 92) {
                                    setChatInputScroll({
                                        ...chatInputScroll,
                                        showing: true
                                    })
                                } else {
                                    setChatInputScroll({
                                        ...chatInputScroll,
                                        showing: false
                                    })
                                }
                            }}
                            onContentSizeChange={e => setChatInputContentSize(e.nativeEvent.contentSize.height)}
                            editable={data.getChat.participants.length > 1 && !data.getChat.participants.some(participant => participant.isBanned || participant.isDeactivated)}
                        />
                        {chatInputScroll.showing && <ChatInputScrollbar style={{ height: 87 * 87 / chatInputContentSize, top: chatInputScroll.top }} />}
                        <ChatSendBtn onPress={() => sendMessage()}>
                            <Ionicons name="paper-plane-sharp" size={24} color="black" />
                        </ChatSendBtn>
                    </ChatInputContainer>
                    {viewScrollBottomBtn && (
                        <ScrollBottomBtn onPress={scrollToBottom}>
                            <FontAwesome name="angle-down" size={24} color="white" />
                        </ScrollBottomBtn>
                    )}
                    <Modal
                        animationType="none"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={{
                            flex: 1, justifyContent: "center", alignItems: "center"
                        }}>
                            <View style={{
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2
                                },
                                width: 300,
                                height: 250,
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                                justifyContent: "space-between",
                                paddingVertical: 45,
                                alignItems: "center",
                                backgroundColor: styles.bgColor,
                            }}>
                                <ModalCloseBtn onPress={() => setModalVisible(false)}>
                                    <Ionicons name="close" size={22} color="#fcfcfc" />
                                </ModalCloseBtn>
                                <ModalTitle>원하는 행동을 선택하세요</ModalTitle>
                                <ModalOptions>
                                    <ModalOption onPress={() => { confirmQuitChat(); setModalVisible(false); }}>
                                        <Ionicons name="exit-outline" size={50} color="#a8a8a8" style={{ marginLeft: 10 }} />
                                        <Text>채팅 종료</Text>
                                    </ModalOption>
                                    <ModalOption onPress={() => { setModalVisible(false), setReportModalVisible(true) }}>
                                        <Feather name="alert-triangle" size={50} color="#a8a8a8" />
                                        <Text>신고하기</Text>
                                    </ModalOption>
                                </ModalOptions>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType="none"
                        transparent={true}
                        visible={reportModalVisible}
                        onRequestClose={() => setReportModalVisible(false)}
                    >
                        <View style={{
                            flex: 1, justifyContent: "center", alignItems: "center"
                        }}>
                            <View style={{
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2
                                },
                                width: 300,
                                height: 250,
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                                justifyContent: "space-between",
                                paddingVertical: 30,
                                alignItems: "center",
                                backgroundColor: styles.bgColor,
                            }}>
                                <ModalCloseBtn onPress={() => setReportModalVisible(false)}>
                                    <Ionicons name="close" size={22} color="#fcfcfc" />
                                </ModalCloseBtn>
                                <ModalTitle>신고 사유를 선택해주세요</ModalTitle>
                                <ReportModalOptions>
                                    {constants.reportReasons.map(reason => (
                                        <ReportModalOption onPress={() => {
                                            setReportModalVisible(false);
                                            setReportReason(reason);
                                            setReportDetailModalVisible(true);
                                        }}>
                                            <Text>{reason}</Text>
                                        </ReportModalOption>
                                    ))}
                                </ReportModalOptions>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType="none"
                        transparent={true}
                        visible={reportDetailModalVisible}
                        onRequestClose={() => setReportDetailModalVisible(false)}
                    >
                        <View style={{
                            flex: 1, justifyContent: "center", alignItems: "center"
                        }}>
                            <View style={{
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2
                                },
                                width: 300,
                                height: 300,
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                                paddingVertical: 30,
                                alignItems: "center",
                                backgroundColor: styles.bgColor,
                            }}>
                                <ModalBackBtn onPress={() => { setReportModalVisible(true); setReportDetailModalVisible(false) }}>
                                    <Ionicons name="arrow-back-outline" size={25} color="#E0E0E0" />
                                </ModalBackBtn>
                                <ModalCloseBtn onPress={() => setReportDetailModalVisible(false)}>
                                    <Ionicons name="close" size={22} color="#fcfcfc" />
                                </ModalCloseBtn>
                                <ModalTitle style={{
                                    position: "absolute",
                                    top: 15,
                                    opacity: 0.7
                                }}>유저 신고</ModalTitle>
                                <DetailModalColumns>
                                    <DetailModalColumn>
                                        <DetailModalColumnTitle>유저명</DetailModalColumnTitle>
                                        <DetailModalColumnContent>{opponentName}</DetailModalColumnContent>
                                    </DetailModalColumn>
                                    <DetailModalColumn>
                                        <DetailModalColumnTitle>신고사유</DetailModalColumnTitle>
                                        <DetailModalColumnContent>{reportReason}</DetailModalColumnContent>
                                    </DetailModalColumn>
                                    <DetailModalColumn>
                                        <DetailModalColumnTitle>내용</DetailModalColumnTitle>
                                        <ReportContentInput
                                            value={reportContentValue}
                                            onChangeText={setReportContentValue}
                                            multiline
                                            maxHeight={120}
                                            scrollEnabled
                                            placeholder={"구체적인 내용을 입력해주세요. (신고사유 기타 선택시 필수 작성)"}
                                        />
                                    </DetailModalColumn>
                                </DetailModalColumns>
                                <ReportSubmitBtn
                                    style={{ backgroundColor: canSubmitReport() ? styles.themeColor : styles.lightThemeColor }}
                                    activeOpacity={canSubmitReport() ? 0.2 : 1}
                                    onPress={submitReport}
                                >
                                    <Text style={{ color: "white", fontSize: 14 }}>
                                        신고 제출
                                    </Text>
                                </ReportSubmitBtn>
                            </View>
                        </View>
                    </Modal>
                </>
            ) : (
                <Loader />
            )}
        </Suspense>
    )
};
