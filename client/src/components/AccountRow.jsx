import { IoMdTrash } from "react-icons/io";
// import { useMutation } from "@apollo/client";
// import { DELETE_CLIENT } from "../mutations/clientMutations";
// import { GET_CLIENTS } from "../queries/accountQueries";
// import { GET_PROJECTS } from "../queries/projectQueries";

const AccountRow = ({ account }) => {
  // const [deleteClient] = useMutation(DELETE_CLIENT, {
  //   variables: { id: client.id },
  //   refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }, ],
  // });

  return (
    <tr>
      <td>{account.name}</td>
      <td>{account.size}</td>
      <td>{account.industry}</td>
      <td>
        {/* onClick={deleteClient} */}
        <button>
          <IoMdTrash className="text-black" />
        </button>
      </td>
    </tr>
  );
};

export default AccountRow;
