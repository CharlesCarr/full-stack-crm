import { gql } from "@apollo/client";

const ADD_PROSPECT = gql`
  mutation addProspect($name: String!, $position: String!, $dmLevel: DMLevel!, $email: String!, $phone: String!, $accountId: ID!) {
    addProspect(name: $name, position: $position, dmLevel: $dmLevel, email: $email, phone: $phone, accountId: $accountId) {
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

const DELETE_PROSPECT = gql`
  mutation DeleteProspect($id: ID!) {
    deleteProspect(id: $id) {
      id
    }
  }
`;

const UPDATE_PROSPECT = gql`
  mutation updateProspect($id: ID!, $name: String!, $position: String!, $dmLevel: DMLevelUpdate!, $email: String!, $phone: String!) {
    updateProject(id: $id, name: $name, position: $position, dmLevel: $dmLevel, email: $email, phone: $phone) {
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

export { ADD_PROSPECT, DELETE_PROSPECT, UPDATE_PROSPECT };
