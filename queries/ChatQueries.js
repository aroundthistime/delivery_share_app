import { gql } from '@apollo/client';

export const GET_CHATS = gql`
    query getChats{
        allChats{
            seq
            participant1{
                seq
                name
                thumbnail
            }
            participant2{
                seq
                name
                thumbnail
            }
            lastMessage{
                text
                from{
                    seq
                }
                is_read
                created_at
            }
            created_at
        }
    }
`

export const NEW_MESSAGE = gql`
    subscription newMessage($seq : String!) {
        newMessage(seq : $seq){
            seq
            text
            from{
                seq
            }
            created_at
            chat{
                seq
            }
        }
    }
`

export const NEW_CHAT = gql`
    subscription newChat($seq : String!){
        newChat(seq : $seq){
            seq
            participant1{
                seq
                name
                thumbnail
            }
            participant2{
                seq
                name
                thumbnail
            }
            lastMessage{
                text
                from{
                    seq
                }
                is_read
                created_at
            }
            created_at
        }
    }
`


export const QUIT_CHAT = gql`
    mutation quitChat($seq : String!){
        quitChat(seq : $seq)
    }
`

export const GET_CHAT = gql`
    query getChat($seq : Int!){
        Chat(seq : $seq){
            seq
            participant1{
                seq
                name
                thumbnail
            }
            participant2{
                seq
                name
                thumbnail
            }
            is_active
            messages{
                seq
                text
                from{
                    seq
                }
                created_at
                is_read
            }
        }
    }
`

export const SEND_MESSAGE = gql`
    mutation sendMessage($chat_seq : Int!, $toseq : Int!, $text : String!){
        sendMessage(chat_seq : $chat_seq, toseq : $toseq, text : $text){
            seq
            text
        }
    }
`

export const NEW_MESSAGE_FROM_CHAT = gql`
    subscription newMessageFromChat($seq : String!) {
        newMessageFromChat(seq : $seq){
            seq
            text
            from{
                seq
            }
            created_at
        }
    }
`

export const READ_MESSAGE = gql`
    mutation readMessage($message_seq : String!){
        readMessage(message_seq : $message_seq)
    }
`

export const DETECT_MESSAGE_READ = gql`
    subscription detectMessageRead($chatId : String!){
        detectMessageRead(chatId : $chatId){
            message{
                seq
            }
        }
    }
`

export const REPORT_USER = gql`
    mutation reportUser($userId : String!, $chatId : String, $reason : String!, $content : String){
        reportUser(userId : $userId, chatId : $chatId, reason : $reason, content : $content)
    }
`