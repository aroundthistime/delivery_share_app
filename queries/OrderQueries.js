import { gql } from "@apollo/client";

export const GET_ORDERS = gql`
    query getOrders{
        allOrders{
            seq
            created_at
            status
            delivery_time
            canWriteUserReview
            canWriteRestaurantReview
            call{
              restaurant{
                seq
                name
                thumbnail
              }
              cart{
                user{
                  seq
                  name
                }
                selected_menu{
                  menu{
                    name
                  }
                }
              }
            }
        }
    }
`

export const GET_ORDER = gql`
    query Order($seq : Int!){
      Order(seq : $seq){
        seq
        created_at
        status
        delivery_time
        call{
          seq
          callLocation{
            latitude
            longitude
            place
          }
          request_call
          cart{
            user{
              seq
              name
              thumbnail
            }
            request
            selected_menu{
              menu{
                seq
                name
                price
              }
              price
              isSeperated
              count
              selected_option{
                option_item{
                  content
                }
              }
            }
            total_cost
          }
        }
      }
    }
`