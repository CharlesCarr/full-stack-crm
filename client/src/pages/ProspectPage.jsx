import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROSPECT } from "../queries/prospectQueries";
import { Spinner } from "flowbite-react";
// import ClientInfo from "../components/ClientInfo";
// import DeleteProjectButton from "../components/DeleteProjectButton";
// import EditProjectForm from "../components/EditProjectForm";

const ProspectPage = () => {
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
          <div className="w-full flex justify-between items-start pb-6 border-b-2 border-black">
            <div>
              <h1 className="font-bold text-2xl">{`${data.prospect.name} @ ${data.prospect.account.name}`}</h1>
              <p>{`${data.prospect.position} | ${data.prospect.dmLevel}`}</p>
            </div>

            <div className="flex flex-col items-center">
              <p className="font-bold">Contact Info</p>
              <p className="text-sm">{data.prospect.email}</p>
              <p className="text-sm">{data.prospect.phone}</p>
            </div>
          </div>

          <div className="w-full pt-6 flex flex-col items-center pb-6 border-b-2 border-black">
            <p className="font-bold">Interactions</p>
            <p>(insert table here)</p>
          </div>

          <div className="flex pt-6 justify-between items-end w-full">
            <button className="border border-black px-5 py-2 rounded-xl">Delete Prospect</button>
            <button className="border border-black px-5 py-2 rounded-xl">Edit Prospect</button>
          </div>
        </>
      )}

      {/* <p>{data.project.description}</p>

          <p>Project Status</p>
          <p>{data.project.status}</p>

          <ClientInfo client={data.project.client} />

          <EditProjectForm project={data.project} />

          <DeleteProjectButton projectId={data.project.id} /> */}
    </div>
  );
};

export default ProspectPage;
