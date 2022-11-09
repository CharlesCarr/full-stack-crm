import { gql } from "@apollo/client";

const GET_ACCOUNTS = gql`
  query getAccounts {
    accounts {
      id
      name
      size
      industry
      description
      notes
    }
  }
`;

export { GET_ACCOUNTS };