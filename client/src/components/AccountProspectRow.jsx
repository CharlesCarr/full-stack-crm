import { Table } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const AccountProspectRow = ({ prospect }) => {
  const navigate = useNavigate();

  return (
    <Table.Row>
      <Table.Cell
        className="cursor-pointer hover:underline"
        onClick={() => navigate(`/prospects/${prospect.id}`)}
      >
        {prospect.name}
      </Table.Cell>
      <Table.Cell>{prospect.position}</Table.Cell>
    </Table.Row>
  );
};

export default AccountProspectRow;
