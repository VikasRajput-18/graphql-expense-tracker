import { gql } from "@apollo/client"

export const SIGN_UP_USER = gql`
   mutation SignUp($input : SignUpInput!){
    signUp(input : $input){
        _id
        username
        name
    }
   }
`

export const LOGIN_USER = gql`
   mutation Login($input : LoginInput!){
     login(input : $input){
        _id
        username
        name
     }
   }
`


export const LOGOUT = gql`
    mutation Logout{
        logout {
            message
        }
    }
`