import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { DELETE_PROSPECT } from "../../mutations/prospectMutations";
import { GET_PROSPECTS } from "../../queries/prospectQueries";
import { useMutation } from "@apollo/client";

const DeleteProspectButton = ({ prospectId, accountId }) => {
  const navigate = useNavigate();

  const [deleteProspect] = useMutation(DELETE_PROSPECT, {
    variables: { id: prospectId },
    onCompleted: () => navigate(`/accounts/${accountId}`),
    refetchQueries: [{ query: GET_PROSPECTS }],
  });

  return (
    <button
      onClick={deleteProspect}
      className="border border-red-600 text-red-600 px-5 py-2 rounded-xl flex items-center justify-center"
    >
      <FaTrash className="w-4 h-4 mr-2" />
      Delete Prospect
    </button>
  );
};

export default DeleteProspectButton;
