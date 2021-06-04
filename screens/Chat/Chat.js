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
import { DETECT_MESSAGE_READ, GET_CHAT, NEW_MESSAGE_FROM_CHAT, QUIT_CHAT, READ_MESSAGE, REPORT_USER, SEND_MESSAGE } from "../../queries/ChatQueries";
import { useMutation, useQuery, useSubscription } from "@apollo/client";

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
    const {
        params: { chatId, opponentName }
    } = route;
    navigation.setOptions({ title: opponentName });
    const [messageValue, setMessageValue] = useState("");
    const [reportContentValue, setReportContentValue] = useState("");
    const scrollViewRef = useRef();
    const [viewScrollBottomBtn, setViewScrollBottomBtn] = useState(false);
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
    const [sendMessageMutation] = useMutation(SEND_MESSAGE);
    const [readMessageMutation] = useMutation(READ_MESSAGE);
    const [quitChatMutation] = useMutation(QUIT_CHAT);
    const [reportUserMutation] = useMutation(REPORT_USER);
    const userObj = {
        id: 1
    }
    const { data: newMessageData, loading } = useSubscription(
        NEW_MESSAGE_FROM_CHAT,
        {
            variables: {
                id: chatId
            }
        }
    );
    const { data: messageReadData } = useSubscription(
        DETECT_MESSAGE_READ,
        {
            variables: { chatId }
        }
    );
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
    const { data, error, refetch } = useQuery(GET_CHAT, {
        suspend: true,
        variables: {
            id: chatId
        }
    });
    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", scrollToBottom);
        return () => {
            Keyboard.removeListener("keyboardDidShow", scrollToBottom);
            navigation.addListener("focus", () => setIsFocused(true));
            navigation.addListener("blur", () => setIsFocused(false));
        }
    }, []);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            await refetch();
        });
        return unsubscribe;
    }, [navigation]);
    useEffect(() => {
        if (newMessageData && newMessageData.newMessageFromChat) {
            setMessages([...messages, newMessageData.newMessageFromChat])
        }
    }, [newMessageData]);
    useEffect(() => {
        if (messageReadData && messageReadData.detectMessageRead) {
            const readMessage = messageReadData.detectMessageRead.message;
            const updatedMessages = messages.map(message => {
                if (message.id === readMessage.id && message.from.id === userObj.id) {
                    return ({
                        ...message,
                        isChecked: true
                    })
                } else {
                    return message
                }
            });
            setMessages(updatedMessages);
        }
    }, [messageReadData]);
    useEffect(() => {
        if (data && data.getChat) {
            setMessages(data.getChat.messages);
            setOpponent(getOpponent(data.getChat.participants, userObj.id))
        }
    }, [data]); //data 리스트 안에 넣어야됨
    useEffect(() => {
        if (route.params && route.params.showModal) {
            setModalVisible(true);
            navigation.setParams({
                ...route.params,
                showModal: false
            })
        }
    }, [route])
    if (isFocused && messages.length > 0 && messages[messages.length - 1].from.id !== userObj.id) {
        readMessageMutation({
            variables: {
                messageId: messages[messages.length - 1].id
            }
        })
    }
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
        try {
            sendMessageMutation({
                variables: {
                    chatId,
                    opponentId: opponent.id,
                    text: messageValue
                },
            });
            setMessageValue("");
        } catch (error) {
            console.log(error);
        }
    }
    const quitChat = async () => {
        const { data: { quitChat: quitChatSuccess } } = await quitChatMutation({
            variables: {
                id: chatId
            }
        });
        if (quitChatSuccess) {
            navigation.pop();
        } else {
            Alert.alert("오류가 발생하였습니다. 다시 시도해주시길 바랍니다.")
        }
    }
    const confirmQuitChat = () => (
        Alert.alert(
            `정말로 ${opponentName}님과의 채팅을 종료하시겠습니까?`,
            "",
            [
                {
                    text: "확인",
                    onPress: () => { quitChat() }
                },
                {
                    text: "취소",
                    onPress: () => 1
                },
            ],
            { cancelable: false }
        )
    )
    const canSubmitReport = () => reportReason !== "기타" || reportContentValue.replace(/\s|\n/g, "") !== ""
    const submitReport = async () => {
        setReportDetailModalVisible(false);
        try {
            if (reportContentValue) {
                const { data: { reportUser: reportUserSuccess } } = await reportUserMutation({
                    variables: {
                        id: opponent.id,
                        chatId,
                        reason: reportReason,
                        content: reportContentValue
                    }
                });
                if (reportUserSuccess) {
                    Alert.alert("해당 유저에 대한 신고가 완료되었습니다")
                    navigation.pop();
                } else {
                    Alert.alert("오류가 발생하였습니다. 다시 시도해주시길 바랍니다.")
                }
            } else {
                const { data: { reportUser: reportUserSuccess } } = await reportUserMutation({
                    variables: {
                        id: opponent.id,
                        chatId,
                        reason: reportReason,
                    }
                });
                if (reportUserSuccess) {
                    Alert.alert("해당 유저에 대한 신고가 완료되었습니다")
                    navigation.pop();
                } else {
                    Alert.alert("오류가 발생하였습니다. 다시 시도해주시길 바랍니다.")
                }
            }
        } catch {
            quitChat();
        }
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
                                                avatar={fromMe ? undefined : opponent.thumbnail}
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
                                            avatar = opponent.thumbnail;
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
                                                    avatar={opponent.thumbnail}
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
                                    onPress={() => {
                                        if (canSubmitReport()) {
                                            submitReport()
                                        }
                                    }}
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
