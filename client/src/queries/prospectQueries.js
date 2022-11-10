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
    }
  }
`;

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
