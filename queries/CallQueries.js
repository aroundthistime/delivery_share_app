import { gql } from '@apollo/client';

export const CREATE_CALL = gql`
    mutation createCall($cart : String!, $latitude : String!, $longitude : String!, $address : String!, $requestToUser : String!, $requestToRestaurant : String!, $timeLimit : Int!){
        createCall(cart : $cart, latitude : $latitude, longitude : $longitude, address : $address, requestToUser : $requestToUser, requestToRestaurant : $requestToRestaurant, timeLimit : $timeLimit)
    }
`

// export const 