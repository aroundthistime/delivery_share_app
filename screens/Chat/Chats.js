import React, { useEffect } from "react";
import { Alert } from "react-native";
import ScreenHeader from "../../components/ScreenHeader";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CHATS, QUIT_CHAT } from "../../queries/ChatQueries";
import Loader from "../../components/Loader";
import ChatsPresenter from "./ChatsPresenter";



export default ({ navigation }) => {
    const { loading, data, refetch, error } = useQuery(GET_CHATS, {
        fetchPolicy: "network-only",
        notifyOnNetworkStatusChange: true
    });
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            await refetch();
        });
        return unsubscribe;
    }, [navigation]);
    return (
        <>
            <ScreenHeader title={"채팅"} />
            {!loading && data && data.allChats ? (
                <ChatsPresenter chatsList={data.allChats} refetch={refetch} navigation={navigation} />
            ) : (
                <Loader />
            )}
        </>
    )
}