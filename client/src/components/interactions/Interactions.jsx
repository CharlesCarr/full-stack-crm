import { useQuery } from "@apollo/client";
import { GET_INTERACTIONS } from "../../queries/interactionQueries";
import { Spinner } from "flowbite-react";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Interactions = () => {
  const { loading, error, data } = useQuery(GET_INTERACTIONS);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [interactions, setInteractions] = useState([]);

  useEffect(() => {
    if (data) {
      setInteractions(data.interactions);
    }
  }, [data]);

  const columns = [
    { name: "id", header: "Id", defaultVisible: false, defaultWidth: 100 },
    {
      name: "prospect",
      header: "Prospect",
      defaultFlex: 1,
      minWidth: 150,
      render: ({value}) => value.name,
    },
    { name: "date", header: "Date", defaultFlex: 1, minWidth: 150 },
    {
      name: "type",
      header: "Type",
      defaultWidth: 100,
    },
    { name: "notes", header: "Notes", defaultFlex: 1, minWidth: 150 },
    {
      name: "outcome",
      header: "Outcome",
      defaultFlex: 1,
      minWidth: 150,
    },
  ];

  const gridStyle = { minHeight: 350, border: "none" };

  // const onSelectionChange = useCallback(({ selected }) => {
  //   setSelected(selected);
  //   navigate(`/interactions/${selected}`);
  //   console.log(selected);
  // }, []);

  const onSearchChange = ({ target: { value } }) => {
    setSearch(value);
    const lowerSearch = value.toLowerCase();
    const filteredListItems = data.interactions.filter((int) =>
      int.prospect.name.toLowerCase().includes(lowerSearch)
    );
    setInteractions(filteredListItems);
  };

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong...</p>;

  return (
    <div className="w-full flex flex-col justify-center items-center">
      {!loading && !error && (
        <>
          <div className="flex w-full justify-between items-center mb-6">
            <input
              placeholder="Search By Prospect"
              value={search}
              onChange={onSearchChange}
              className="border rounded-lg pl-3 py-px text-sm"
            />
            <p>
              <span className="font-bold">Total Interactions: </span>
              {interactions.length}
            </p>
          </div>

          <div className="w-full flex justify-center items-center rounded-xl p-1 shadow-3xl">
            <ReactDataGrid
              idProperty="id"
              selected={selected}
              // onSelectionChange={onSelectionChange}
              style={gridStyle}
              columns={columns}
              dataSource={interactions}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Interactions;
