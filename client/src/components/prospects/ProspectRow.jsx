import { useMutation } from "@apollo/client";
import { Table } from "flowbite-react";
import { IoMdTrash } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { DELETE_PROSPECT } from "../../mutations/prospectMutations";
import { GET_PROSPECTS } from "../../queries/prospectQueries";

const ProspectRow = ({ prospect, rowFull }) => {
  const navigate = useNavigate();

  const [deleteProspect] = useMutation(DELETE_PROSPECT, {
    variables: { id: prospect.id },
    refetchQueries: [{ query: GET_PROSPECTS }],
  });

  return (
    <Table.Row>
      <Table.Cell
        className="cursor-pointer hover:underline"
        onClick={() => navigate(`/prospects/${prospect.id}`)}
      >
        {prospect.name}
      </Table.Cell>
      <Table.Cell>{prospect.position}</Table.Cell>
      {rowFull ? (
        <>
          <Table.Cell>{prospect.dmLevel}</Table.Cell>
          <Table.Cell>{prospect.email}</Table.Cell>
          <Table.Cell>{prospect.phone}</Table.Cell>
          {/* will have to get name of account to replace this below */}
          <Table.Cell>{prospect.accountId}</Table.Cell>
          <Table.Cell>
            <button onClick={deleteProspect}>
              <IoMdTrash className="text-black" />
            </button>
          </Table.Cell>
        </>
      ) : null}
    </Table.Row>
  );
};

export default ProspectRow;
