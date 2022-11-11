import { useQuery } from "@apollo/client";
import { GET_INTERACTIONS } from "../../queries/interactionQueries";
import { Table, Spinner } from "flowbite-react";
import InteractionRow from "./InteractionRow";

const Interactions = () => {
  const { loading, error, data } = useQuery(GET_INTERACTIONS);

  if (loading) return <Spinner />
  if (error) return <p>Something went wrong...</p>

  return (
    <div className="w-full flex justify-center items-center">
        { !loading && !error && (
            <Table striped={true}>
                <Table.Head>
                        <Table.HeadCell>Date</Table.HeadCell>
                        <Table.HeadCell>Type</Table.HeadCell>
                        <Table.HeadCell>Notes</Table.HeadCell>
                        <Table.HeadCell>Outcome</Table.HeadCell>
                        {/* <Table.HeadCell>ID</Table.HeadCell> */}
                        <Table.HeadCell></Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {data.interactions.map(interaction => (
                        <InteractionRow key={interaction.id} interaction={interaction} />
                    ))}
                </Table.Body>
            </Table>
        )}
    </div>
  );
};

export default Interactions;