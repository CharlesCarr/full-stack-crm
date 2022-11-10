import { gql } from "@apollo/client";

const ADD_INTERACTION = gql`
  mutation addInteraction($date: String!, $type: String!, $notes: String!, $outcome: String!) {
    addInteraction(date: $date, type: $type, notes: $notes, outcome: $outcome) {
      id
      date
      type
      notes
      outcome
    }
  }
`;

const DELETE_INTERACTION = gql`
  mutation deleteInteraction($id: ID!) {
    deleteInteraction(id: $id) {
      id
      date
      type
      notes
      outcome
    }
  }
`;

export { ADD_INTERACTION, DELETE_INTERACTION };