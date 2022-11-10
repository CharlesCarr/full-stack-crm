import { gql } from "@apollo/client";

const GET_PROSPECTS = gql`
  query getProspects {
    prospects {
      id
      name
      position
      dmLevel
      email
      phone
      account {
        id
        name
      }
    }
  }
`;

// TO DO: CREATE GET_ACCOUNT_PROSPECTS query 

const GET_PROSPECT = gql`
  query getProspect($id: ID!) {
    prospect(id: $id) {
      id
      name
      position
      dmLevel
      email
      phone
      account {
        id
        name
      }
    }
  }
`;

export { GET_PROSPECTS, GET_PROSPECT };
