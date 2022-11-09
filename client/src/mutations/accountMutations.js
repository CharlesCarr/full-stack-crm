import { gql } from "@apollo/client";

const ADD_ACCOUNT = gql`
  mutation addAccount($name: String!, $size: String!, $industry: String!, $description: String!, $notes: String!) {
    addAccount(name: $name, size: $size, industry: $industry, description: $description, notes: $notes) {
      id
      name
      size
      industry
      description
      notes
    }
  }
`;

const DELETE_ACCOUNT = gql`
  mutation deleteAccount($id: ID!) {
    deleteAccount(id: $id) {
      id
      name
      size
      industry
      description
      notes
    }
  }
`;

export { DELETE_ACCOUNT, ADD_ACCOUNT };
