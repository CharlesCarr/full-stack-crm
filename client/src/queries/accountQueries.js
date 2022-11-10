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

const GET_ACCOUNT = gql`
  query getAccount($id: ID!) {
    account(id: $id) {
      id
      name
      size
      industry
      description
      notes
    }
  }
`;

export { GET_ACCOUNTS, GET_ACCOUNT };