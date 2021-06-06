import { gql } from "@apollo/client";

export const GET_NEAR_CALLINGS = gql`
  query getNearCalls($latitude: Float, $longitude: Float) {
    getNearCalls(latitude: $latitude, longitude: $longitude) {
      seq
      distance
      callLocation {
        latitude
        longitude
        place
      }
      restaurant {
        seq
        name
        category
        thumbnail
        introduction
        rate
        min_order
        delivery_tip
      }
      price
      user {
        seq
        ID
        created_at
        thumbnail
        orderCounts
        rate
        reviews {
          content
          rate
          user {
            ID
            thumbnail
          }
          created_at
        }
      }
      request_call
      status
      time_limit
      cart {
        request
        selected_menu {
          menu {
            name
            price
          }
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query getUser($seq: Long!) {
    getUser(seq: $seq) {
      orderCounts
      rate
      reviews {
        content
        rate
        user {
          ID
          thumbnail
        }
        created_at
      }
    }
  }
`;
