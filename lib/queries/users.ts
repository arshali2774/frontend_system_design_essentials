import { gql } from "graphql-request";

export const GET_USERS = gql`
  query GetUsers {
    usersCollection {
      edges {
        node {
          id
          name
          email
          avatar
        }
      }
    }
  }
`;
