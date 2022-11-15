import { gql } from "@apollo/client";

const GET_INTERACTIONS = gql`
  query getInteractions {
    interactions {
      id
      date
      notes
      type
      outcome
      prospect {
        id
        name
      }
    }
  }
`;

// TO DO: CREATE GET_PROSPECT_INTERACTIONS query 

const GET_INTERACTION = gql`
  query getInteraction($id: ID!) {
    interaction(id: $id) {
      id
      date
      notes
      type
      outcome
      prospect {
        id
      }
    }
  }
`;

export { GET_INTERACTIONS, GET_INTERACTION };
