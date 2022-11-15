import { useQuery } from "@apollo/client";
import { GET_PROSPECTS } from "../../queries/prospectQueries";
import { Table, Spinner } from "flowbite-react";
import ProspectRow from "./ProspectRow";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";

const Prospects = () => {
  const { loading, error, data } = useQuery(GET_PROSPECTS);
  //   const [rowFull] = useState(true);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [prospects, setProspects] = useState([]);

  useEffect(() => {
    if (data) {
      setProspects(data.prospects);
    }
  }, [data]);

  const columns = [
    { name: "id", header: "Id", defaultVisible: false, defaultWidth: 100 },
    { name: "name", header: "Name", defaultFlex: 1, minWidth: 150 },
    {
      name: "position",
      header: "Title",
      defaultWidth: 100,
    },
    { name: "dmLevel", header: "DM Level", defaultFlex: 1, minWidth: 150 },
    {
      name: "email",
      header: "Email",
      defaultFlex: 1,
      minWidth: 150,
    },
    { name: "phone", header: "Phone", defaultFlex: 1, minWidth: 150 },
  ];

  const gridStyle = { minHeight: 350, border: "none" };

  const onSelectionChange = useCallback(({ selected }) => {
    setSelected(selected);
    navigate(`/prospects/${selected}`);
    console.log(selected);
  }, []);

  const onSearchChange = ({ target: { value } }) => {
    setSearch(value);
    const lowerSearch = value.toLowerCase();
    const filteredListItems = data.prospects.filter((pros) =>
      pros.name.toLowerCase().includes(lowerSearch)
    );
    setProspects(filteredListItems);
  };

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong...</p>;

  return (
    <div className="w-full flex flex-col justify-center items-center">
      {!loading && !error && (
        <>
          <div className="flex w-full justify-between items-center mb-6">
            <input
              placeholder="Search By Name"
              value={search}
              onChange={onSearchChange}
              className="border rounded-lg pl-3 py-px text-sm"
            />
            <p>
              <span className="font-bold">Total Prospects: </span>
              {prospects.length}
            </p>
          </div>

          {/* border border-black  */}
          <div className="w-full flex justify-center items-center rounded-xl p-1 shadow-3xl">
            <ReactDataGrid
              idProperty="id"
              selected={selected}
              onSelectionChange={onSelectionChange}
              style={gridStyle}
              columns={columns}
              dataSource={prospects}
              className="test"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Prospects;
