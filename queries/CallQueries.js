import { gql } from '@apollo/client';

export const CREATE_CALL = gql`
    mutation createCall($cart : String!, $latitude : Float!, $longitude : Float!, $address : String!, $requestToRes : String!, $requestToUser : String!, $timeLimit : Int!){
        createCall(cart : $cart, latitude : $latitude, longitude : $longitude, address : $address, requestToRes : $requestToRes, requestToUser : $requestToUser, timeLimit : $timeLimit){
            seq
            time_limit
            created_at
            restaurant{
                name
            }
        }
    }
`

export const GET_MY_CALL = gql`
    query getMyCall{
        getMyCall{
            seq
            time_limit
            created_at
            restaurant{
              name
            }
        }
    }
`

export const CANCEL_CALL = gql`
    mutation cancelCall($seq : Int!){
        cancelCall(seq : $seq)
    }
`