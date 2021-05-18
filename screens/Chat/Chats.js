import React from "react";
import { Alert, Platform, ScrollView, Text, View } from "react-native";
import styled from "styled-components";
import { Ionicons } from '@expo/vector-icons';
import ViewContainer from "../../components/ViewContainer";
import styles from "../../styles";
import { getTimeStamp, getOpponent } from "../../utils";
import ScreenHeader from "../../components/ScreenHeader";

const ChatTabsContainer = styled.View`
    background-color : rgba(0, 0, 0, 0.1);
`


const ChatTab = styled.TouchableOpacity`
    height : 70;
    flex-direction : row;
    align-items : center;
    padding-left : 20;
    padding-right : 10;
    padding-top : 10;
    padding-bottom : 10;
    margin-bottom : 1px;
    background-color : ${styles.bgColor};
    flex-direction : row;
    align-items : center;
`
const ChatAvatar = styled.Image`
    width : 50;
    height : 50;
    border-radius : 15;
    margin-right : 18;
`

const ChatInfoMain = styled.View`
    height : 45;
    flex : 1;
    margin-right : 25;
`
const OpponentName = styled.Text`
    font-size : 16;
    margin-bottom : 5;
`

const ChatPreview = styled.Text`
    opacity : 0.5;
    overflow : hidden;
`

const ChatInfoSub = styled.View`
    width : 45;
    height : 50;
`

const ChatTimestamp = styled.Text`
    opacity : 0.3;
    font-size : 11.5;
    position : absolute;
    width : 95;
    top : 2;
    right : 0;
    text-align : right;
`

const ChatUnreadMark = styled.View`
    background-color : ${styles.themeColor};
    width : 12;
    height : 12;
    border-radius : 6;
    position : absolute;
    bottom : 7;
    right : 5;
`

const NoChatMessage = styled.Text`
    font-size : 17;
    color : #7c7b7b;
`

export default ({ navigation }) => {
    const userObj = {
        id: 1
    }
    const sortedChats = [
        {
            id: "1",
            lastMessage: {
                from: {
                    id: 2,
                },
                text: "안녕하세요",
                createdAt: new Date(),
                isChecked: false
            },
            participants: [
                {
                    id: 1,
                    name: "콘요맘떼",
                    avatar: "https://blog.kakaocdn.net/dn/bD47H0/btqK83X5qWz/cwP9qA8R3r2BnJOaTtZXrK/img.jpg"
                },
                {
                    id: 2,
                    name: "이지금",
                    avatar: "data:image/jpeg;base64,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"
                }
            ]
        }
    ]
    const quitChat = async (chatId, opponentName) => {
        // const { data : {quitChat}} = await quitChatMutation({
        //     variables : {
        //         id : chatId
        //     }
        // });
        // if (quitChat){
        //     Alert.alert(`${opponentName}님과의 채팅을 종료하였습니다`)
        //     await refetch();
        // } else{
        //     Alert.alert("오류가 발생했습니다. 나중에 다시 시도해주십시오")
        // }
    }
    const confirmQuitChat = (chatId, opponentName) => (
        Alert.alert(
            `${opponentName}님과의 채팅을 종료하시겠습니까?`,
            "",
            [
                {
                    text: "확인",
                    onPress: () => { quitChat(chatId, opponentName) }
                },
                {
                    text: "취소",
                    onPress: () => 1
                },
            ],
            { cancelable: false }
        )
    )
    return (
        <>
            <ScreenHeader title={"채팅"} />
            {sortedChats.length > 0 ? (
                <ScrollView style={{ flex: 1, backgroundColor: styles.bgColor }}>
                    <ChatTabsContainer>
                        {sortedChats.map((chat) => {
                            const opponent = getOpponent(chat.participants, userObj.id);
                            return (
                                <ChatTab key={chat.id}
                                    onPress={() => navigation.navigate("Chat", { chatId: chat.id, opponentName: opponent.name })}
                                    onLongPress={() => { confirmQuitChat(chat.id, opponent.name) }}
                                >
                                    <ChatAvatar source={{ uri: opponent.avatar }} />
                                    <ChatInfoMain>
                                        <OpponentName>{opponent.name}</OpponentName>
                                        <ChatPreview numberOfLines={1}>{chat.lastMessage.text}</ChatPreview>
                                    </ChatInfoMain>
                                    <ChatInfoSub>
                                        <ChatTimestamp>{getTimeStamp(chat.lastMessage.createdAt)}</ChatTimestamp>
                                        {!chat.lastMessage.isChecked && chat.lastMessage.from.id !== userObj.id && <ChatUnreadMark />}
                                    </ChatInfoSub>
                                </ChatTab>
                            )
                        })}
                    </ChatTabsContainer>
                </ScrollView>
            ) : (
                <ViewContainer>
                    <Ionicons name="chatbox-ellipses-outline" size={100} color="#afaeae" style={{ marginBottom: 10 }} />
                    <NoChatMessage>참여중인 채팅이 없습니다.</NoChatMessage>
                </ViewContainer>
            )}
        </>
    )
}