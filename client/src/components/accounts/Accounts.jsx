import { useQuery } from "@apollo/client";
import { GET_ACCOUNTS } from "../../queries/accountQueries";
import { Spinner } from "flowbite-react";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const Accounts = () => {
  const { loading, error, data } = useQuery(GET_ACCOUNTS);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const columns = [
    { name: "id", header: "Id", defaultVisible: false, defaultWidth: 100 },
    { name: "name", header: "Name", defaultFlex: 1, minWidth: 150 },
    { name: "size", header: "Size", defaultFlex: 1, minWidth: 150 },
    { name: "industry", header: "Industry", defaultFlex: 1, minWidth: 150 },
    {
      name: "description",
      header: "Description",
      defaultFlex: 1,
      minWidth: 150,
    },
    { name: "notes", header: "Notes", defaultFlex: 1, minWidth: 150 },
  ];

  const gridStyle = { minHeight: 550, maxWidth: 1000 };

  const onSelectionChange = useCallback(({selected}) => {
    setSelected(selected);
    navigate(`/accounts/${selected}`)
    console.log(selected);
  }, []);

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong...</p>;

  console.log(data);

  return (
    <div className="w-full flex justify-center items-center">
      {!loading && !error && (
        <ReactDataGrid
          idProperty="id"
          selected={selected}
          onSelectionChange={onSelectionChange}
          style={gridStyle}
          columns={columns}
          dataSource={data.accounts}
        />
      )}
    </div>
  );
};

export default Accounts;
