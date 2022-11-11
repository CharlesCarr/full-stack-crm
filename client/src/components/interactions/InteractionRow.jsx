import { useMutation } from "@apollo/client";
import { Table } from "flowbite-react";
import React from "react";
import { IoMdTrash } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { GET_INTERACTIONS } from "../../queries/interactionQueries";
import { DELETE_INTERACTION } from "../../mutations/interactionMutations";

const InteractionRow = ({ interaction }) => {
  const navigate = useNavigate();

  const [deleteInteraction] = useMutation(DELETE_INTERACTION, {
    variables: { id: interaction.id },
    refetchQueries: [{ query: GET_INTERACTIONS }],
  });

  return (
    <Table.Row>
      <Table.Cell
        className="cursor-pointer hover:underline"
        onClick={() => navigate(`/interactions/${interaction.id}`)}
      >
        {interaction.date}
      </Table.Cell>
      <Table.Cell>{interaction.type}</Table.Cell>
      <Table.Cell>{interaction.notes}</Table.Cell>
      <Table.Cell>{interaction.outcome}</Table.Cell>
      <Table.Cell>
        <button onClick={deleteInteraction}>
          <IoMdTrash className="text-black" />
        </button>
      </Table.Cell>
    </Table.Row>
  );
};

export default InteractionRow;
