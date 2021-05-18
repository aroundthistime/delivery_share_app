// import { gql } from '@apollo/client';

// export const GET_CHAT = gql`
//     query getChat($id : String!){
//         getChat(id : $id){
//             id
//             participants{
//                 id
//                 name
//                 avatar
//                 isBanned
//                 isDeactivated
//             }
//             messages{
//                 id
//                 text
//                 from{
//                     id
//                 }
//                 createdAt
//                 isChecked
//             }
//         }
//     }
// `

// const {data, error, refetch} = useQuery(GET_CHAT, { //얘네는 screen component에서 사용
//     suspend : true,
//     variables : {
//         id : chatId
//     }
// });

// {data && data.getChat ? (
//     data.getChat.messages.map(message => ~~)
// ) : (
//     <Loader />
// )}