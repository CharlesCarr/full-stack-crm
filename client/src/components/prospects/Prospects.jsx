import { useQuery } from "@apollo/client";
import { GET_PROSPECTS } from "../../queries/prospectQueries";
import { Table, Spinner } from "flowbite-react";
import ProspectRow from "./ProspectRow";
import { useState } from "react";

const Prospects = () => {
  const { loading, error, data } = useQuery(GET_PROSPECTS);
  const [rowFull] = useState(true);

  if (loading) return <Spinner />
  if (error) return <p>Something went wrong...</p>

  return (
    <div className="w-full flex justify-center items-center">
        { !loading && !error && (
            <Table striped={true}>
                <Table.Head>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Title</Table.HeadCell>
                        <Table.HeadCell>DM Level</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Phone</Table.HeadCell>
                        <Table.HeadCell></Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {data.prospects.map(prospect => (
                        <ProspectRow key={prospect.id} prospect={prospect} rowFull={rowFull} />
                    ))}
                </Table.Body>
            </Table>
        )}
    </div>
  );
};

export default Prospects;
