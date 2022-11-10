import { IoMdTrash } from "react-icons/io";
import { useMutation } from "@apollo/client";
import { DELETE_ACCOUNT } from "../mutations/accountMutations";
import { GET_ACCOUNTS } from "../queries/accountQueries";
import { Table } from "flowbite-react";
// import { GET_PROJECTS } from "../queries/projectQueries";

const AccountRow = ({ account }) => {
  const [deleteAccount] = useMutation(DELETE_ACCOUNT, {
    variables: { id: account.id },
    //  { query: GET_PROSPECTS },
    refetchQueries: [{ query: GET_ACCOUNTS }],
  });

  return (
    <Table.Row className="cursor-pointer">
      <Table.Cell>{account.name}</Table.Cell>
      <Table.Cell>{account.size}</Table.Cell>
      <Table.Cell>{account.industry}</Table.Cell>
      <Table.Cell>
        <button onClick={deleteAccount}>
          <IoMdTrash className="text-black" />
        </button>
      </Table.Cell>
    </Table.Row>
  );
};

export default AccountRow;
