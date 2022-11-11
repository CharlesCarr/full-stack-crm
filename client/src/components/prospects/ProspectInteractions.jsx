import { useQuery } from "@apollo/client";
import { Spinner, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { GET_INTERACTIONS } from "../../queries/interactionQueries";
import InteractionRow from "../interactions/InteractionRow";

const ProspectInteractions = ({ prospect }) => {
  const { loading, error, data } = useQuery(GET_INTERACTIONS);
  console.log("interaction data", data);

  const [prospectInteractions, setProspectInteractions] = useState([]);
  console.log(prospectInteractions);

  console.log(prospect.id);

  useEffect(() => {
    if (data && prospect) {
      setProspectInteractions(getProspectInteractions(prospect.id));
    }
  }, [data]);

  const getProspectInteractions = (id) => {
    const filteredInteractions = data.interactions.filter((interaction) => {
      return interaction.prospect.id === id;
    });
    console.log("filtered interactions", filteredInteractions);
    return filteredInteractions;
  };

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong...</p>;
  if (prospectInteractions.length < 1) return <p>No Interactions for this Prospect</p>

  return (
    <>
      {!loading && !error && (prospectInteractions.length > 0) && (
        <Table striped={true}>
          <Table.Head>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Type</Table.HeadCell>
            <Table.HeadCell>Notes</Table.HeadCell>
            <Table.HeadCell>Outcome</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {prospectInteractions.map((interaction) => (
              <InteractionRow key={interaction.id} interaction={interaction} />
            ))}
          </Table.Body>
        </Table>
      )}
    </>
  );
};

export default ProspectInteractions;
