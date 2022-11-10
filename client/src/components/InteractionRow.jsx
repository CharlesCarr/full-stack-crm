import { Table } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const InteractionRow = ({ interaction }) => {
  const navigate = useNavigate();

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
      {/* <Table.Cell>
        <button onClick={deleteAccount}>
          <IoMdTrash className="text-black" />
        </button>
      </Table.Cell> */}
    </Table.Row>
  );
};

export default InteractionRow;
