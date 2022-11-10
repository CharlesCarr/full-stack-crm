import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROSPECT } from "../queries/prospectQueries";
import { Spinner } from "flowbite-react";
import ProspectInfo from "../components/ProspectInfo";
import EditProspectModal from "../components/EditProspectModal";
import { useState } from "react";
import DeleteProspectButton from "../components/DeleteProspectButton";
// import ClientInfo from "../components/ClientInfo";
// import DeleteProjectButton from "../components/DeleteProjectButton";
// import EditProjectForm from "../components/EditProjectForm";

const ProspectPage = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  // TO DO: create this modal component for delete confirmation
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROSPECT, {
    variables: { id },
  });
  console.log("prospect ind", data);

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong...</p>;

  return (
    <div className="w-3/4 h-2/3 border border-black flex flex-col justify-start items-center py-12 px-14">
      {!loading && !error && (
        <>
          <EditProspectModal prospect={data} showEditModal={showEditModal} setShowEditModal={setShowEditModal}  />
          <ProspectInfo data={data} />

          <div className="w-full pt-6 flex flex-col items-center pb-6 border-b-2 border-black">
            <p className="font-bold">Interactions</p>
            <p>(insert table here)</p>
          </div>

          <div className="flex pt-6 justify-between items-end w-full">
            <button className="border border-black px-5 py-2 rounded-xl" onClick={() => setShowEditModal(true)}>
              Edit Prospect
            </button>
            <DeleteProspectButton prospectId={data.prospect.id} accountId={data.prospect.account.id} />
          </div>
        </>
      )}
    </div>
  );
};

export default ProspectPage;
