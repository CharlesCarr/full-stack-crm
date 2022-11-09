import { IoMdTrash } from "react-icons/io";
import { useMutation } from "@apollo/client";
import { DELETE_ACCOUNT } from "../mutations/accountMutations";
import { GET_ACCOUNTS } from "../queries/accountQueries";
// import { GET_PROJECTS } from "../queries/projectQueries";

const AccountRow = ({ account }) => {
  const [deleteAccount] = useMutation(DELETE_ACCOUNT, {
    variables: { id: account.id },
    //  { query: GET_PROSPECTS },
    refetchQueries: [{ query: GET_ACCOUNTS }],
  });

  return (
    <tr>
      <td>{account.name}</td>
      <td>{account.size}</td>
      <td>{account.industry}</td>
      <td>
        <button onClick={deleteAccount}>
          <IoMdTrash className="text-black" />
        </button>
      </td>
    </tr>
  );
};

export default AccountRow;
