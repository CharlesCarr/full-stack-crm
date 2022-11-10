import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { DELETE_PROJECT } from "../mutations/projectMutations";
import { GET_PROSPECTS } from "../queries/prospectQueries";
import { useMutation } from "@apollo/client";

const DeleteProjectButton = ({ projectId }) => {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_PROSPECTS }],
  });

  return (
    <div>
      <button onClick={deleteProject}>
        <FaTrash /> Delete Project
      </button>
    </div>
  );
};

export default DeleteProjectButton;
