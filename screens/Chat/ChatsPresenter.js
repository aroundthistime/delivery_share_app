import { useMutation, useSubscription } from "@apollo/client";
import React, { useState } from "react";
import { Alert } from "react-native";
import styled from "styled-components";
import { NEW_CHAT, NEW_MESSAGE, QUIT_CHAT } from "../../queries/ChatQueries";
import styles from "../../styles";

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

export default ({
    chatsList,
    refetch,
    navigation
}) => {
    const chatsSortFunc = (chat1, chat2) => {
        let chat1Date;
        let chat2Date;
        if (chat1.lastMessage) {
            chat1Date = new Date(chat1.lastMessage.createdAt);
        } else {
            chat1Date = new Date(chat1.createdAt)
        }
        if (chat2.lastMessage) {
            chat2Date = new Date(chat2.lastMessage.createdAt);
        } else {
            chat2Date = new Date(chat2.createdAt)
        }
        return chat2Date - chat1Date;
    }
    const [chats, setChats] = useState(chatsList);
    const sortedChats = [...chats].sort(chatsSortFunc);
    const userObj = {
        id: 1
    }
    const [quitChatMutation] = useMutation(QUIT_CHAT);
    const { data: newMessageData } = useSubscription(
        NEW_MESSAGE,
        {
            variables: { id: userObj.id }
        }
    );
    const { data: newChatData } = useSubscription(
        NEW_CHAT,
        {
            variables: { id: userObj.id }
        }
    )
    useEffect(() => {
        if (newMessageData && newMessageData.newMessage) {
            const updatedChats = chats.map(chat => {
                if (chat.id === newMessageData.newMessage.chat.id) {
                    return ({
                        ...chat,
                        lastMessage: newMessageData.newMessage
                    })
                } else {
                    return chat
                }
            });
            setChats(updatedChats);
        }
    }, [newMessageData]);
    useEffect(() => {
        if (newChatData && newChatData.newChat) {
            setChats([...chats, newChatData.newChat])
        }
    }, [newChatData])
    const quitChat = async (chatId, opponentName) => {
        const { data: { quitChat } } = await quitChatMutation({
            variables: {
                id: chatId
            }
        });
        if (quitChat) {
            Alert.alert(`${opponentName}님과의 채팅을 종료하였습니다`)
            await refetch();
        } else {
            Alert.alert("오류가 발생했습니다. 나중에 다시 시도해주십시오")
        }
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
                                    <ChatAvatar source={{ uri: opponent.thumbnail }} />
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