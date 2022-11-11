import { gql } from "@apollo/client";

const ADD_INTERACTION = gql`
  mutation addInteraction($date: String!, $notes: String!, $type: Type!, $outcome: String!, $prospectId: ID!) {
    addInteraction(date: $date, notes: $notes, type: $type, outcome: $outcome, prospectId: $prospectId) {
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

const DELETE_INTERACTION = gql`
  mutation deleteInteraction($id: ID!) {
    deleteInteraction(id: $id) {
      id
      date
      notes
      type
      outcome
    }
  }
`;

export { ADD_INTERACTION, DELETE_INTERACTION };