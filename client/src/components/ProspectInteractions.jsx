import { useQuery } from "@apollo/client";
import { Spinner, Table } from "flowbite-react";
import React from "react";
import { GET_INTERACTIONS } from "../queries/interactionQueries";
import InteractionRow from "./InteractionRow";

const ProspectInteractions = ({ prospect }) => {
  const { loading, error, data } = useQuery(GET_INTERACTIONS);
  console.log('interaction data', data);

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong...</p>;

  return (
    <>
      {!loading && !error && (
        <Table striped={true}>
          <Table.Head>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Type</Table.HeadCell>
            <Table.HeadCell>Notes</Table.HeadCell>
            <Table.HeadCell>Outcome</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data.interactions.map((interaction) => (
              <InteractionRow key={interaction.id} interaction={interaction} />
            ))}
          </Table.Body>
        </Table>
      )}
    </>
  );
};

export default ProspectInteractions;
