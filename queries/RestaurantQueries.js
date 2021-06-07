import { gql } from "@apollo/client";

export const GET_RESTAURANTS = gql`
    query getRestaurants ($category : String!, $si : String!, $dong : String!){
        getRestaurants(category: $category, si: $si, dong: $dong){
            name
            rate
            min_order
            thumbnail
            seq
            rate1count
            rate2count
            rate3count
            rate4count
            rate5count
            isopen
            bestmenus{
                name
            }
        }
    }
`

export const GET_RESTAURANT = gql`
    query getRestaurant ($seq : Int!){
        getRestaurant(seq : $seq){
            seq
            name
            thumbnail
            dayoff
            rate
            min_order
            rate1count
            rate2count
            rate3count
            rate4count
            rate5count
            likescount
            isLiked
            isopen
            runtime{
              day
              open
              close
            }
            deliveryloc{
              dong
            }
            introduction
            delivery_tip
            seperatable
            menus{
              seq
              name
              thumbnail
              description
              isAvailable
              isSeperatable
              price
              isBestmenu
              options {
                category
                isRequired
                isMultiple
                optionItems {
                  content
                  price
                }
              }
            }
        }
    }
`

export const TOGGLE_LIKE_RESTAURANT = gql`
    mutation toggleLikeRestaurant($resseq : Int!, $isLiked : Boolean!){
        toggleLikeRestaurant(resseq : $resseq, isLiked : $isLiked)
    }
`

export const GET_RESTAURANT_REVIEWS = gql`
    query getRestaurantReviews ($resseq : Int!){
        getResReviews(resseq : $resseq) {
            reviews{
                seq
                createdAt
                rate
                content
                images{
                    image
                }
                user{
                    seq
                    name
                    thumbnail
                }
                reply{
                    content
                }
            }
        }
    }
`

export const GET_MENU = gql`
    query getMenu($seq : Int!){
        Menu(seq : $seq){
            seq
            name
            thumbnail
            price
            description
            isAvailable
            isSeperatable
            options{
                category
                isRequired
                isMultiple
                optionItems {
                  price
                  content
                }
              }
        }
    }
`

export const GET_LIKED_RESTAURANTS = gql`
    query getLikedRestaurants {
        getLikedRestaurants{
            name
            rate
            min_order
            thumbnail
            seq
            rate1count
            rate2count
            rate3count
            rate4count
            rate5count
            isopen
            bestmenus{
                name
            }
        }
    }
`

export const SEARCH_RESTAURANT = gql`
    query searchRestaurant($si : String!, $dong : String!, $keyword : String!){
        searchRestaurant(si : $si, dong : $dong, keyword : $keyword){
            name
            rate
            min_order
            thumbnail
            seq
            rate1count
            rate2count
            rate3count
            rate4count
            rate5count
            isopen
            bestmenus{
                name
            }
        }
    }
`