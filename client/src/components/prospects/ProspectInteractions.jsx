import { useQuery } from "@apollo/client";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import { Spinner } from "flowbite-react";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GET_INTERACTIONS } from "../../queries/interactionQueries";

const ProspectInteractions = ({ prospect }) => {
  const { loading, error, data } = useQuery(GET_INTERACTIONS);
  console.log("interaction data", data);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

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

  const columns = [
    { name: "id", header: "Id", defaultVisible: false, defaultWidth: 100 },
    { name: "date", header: "Date", defaultFlex: 1, minWidth: 100 },
    { name: "type", header: "Type", defaultFlex: 1, minWidth: 100 },
    { name: "notes", header: "Notes", defaultFlex: 1, minWidth: 100 },
    { name: "outcome", header: "Outcome", defaultFlex: 1, minWidth: 100 },
  ];

  const onSelectionChange = useCallback(({ selected }) => {
    setSelected(selected);
    navigate(`/interactions/${selected}`);
    console.log(selected);
  }, []);

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong...</p>;
  if (prospectInteractions.length < 1)
    return <p>No Interactions for this Prospect</p>;

  return (
    <div className="w-full flex justify-center items-center">
      {!loading && !error && prospectInteractions.length > 0 && (
        <ReactDataGrid
          idProperty="id"
          selected={selected}
          onSelectionChange={onSelectionChange}
          // gridStyle={gridStyle}
          columns={columns}
          dataSource={prospectInteractions}
        />
      )}
    </div>
  );
};

export default ProspectInteractions;
