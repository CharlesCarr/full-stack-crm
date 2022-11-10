import { IoMdTrash } from "react-icons/io";
import { useMutation } from "@apollo/client";
import { DELETE_ACCOUNT } from "../mutations/accountMutations";
import { GET_ACCOUNTS } from "../queries/accountQueries";
import { Table } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const AccountRow = ({ account }) => {
  const navigate = useNavigate();

  const [deleteAccount] = useMutation(DELETE_ACCOUNT, {
    variables: { id: account.id },
    refetchQueries: [{ query: GET_ACCOUNTS }],
  });

  return (
    <Table.Row>
      <Table.Cell
        className="cursor-pointer hover:underline"
        onClick={() => navigate(`/accounts/${account.id}`)}
      >
        {account.name}
      </Table.Cell>
      <Table.Cell>{account.size}</Table.Cell>
      <Table.Cell>{account.industry}</Table.Cell>
      <Table.Cell>{account.description}</Table.Cell>
      <Table.Cell>{account.notes}</Table.Cell>
      <Table.Cell>
        <button onClick={deleteAccount}>
          <IoMdTrash className="text-black" />
        </button>
      </Table.Cell>
    </Table.Row>
  );
};

export default AccountRow;
