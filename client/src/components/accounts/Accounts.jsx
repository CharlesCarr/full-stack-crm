import { useQuery } from "@apollo/client";
import { GET_ACCOUNTS } from "../../queries/accountQueries";
import { Spinner } from "flowbite-react";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Accounts = () => {
  const { loading, error, data } = useQuery(GET_ACCOUNTS);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (data) {
      setAccounts(data.accounts);
    }
  }, [data]);

  const columns = [
    { name: "id", header: "Id", defaultVisible: false, defaultWidth: 100 },
    { name: "name", header: "Name", defaultFlex: 1, minWidth: 150 },
    {
      name: "size",
      header: "Size",
      defaultWidth: 100,
      resizable: false,
      render: ({ value }) => parseInt(value),
      type: 'number',
    },
    { name: "industry", header: "Industry", defaultFlex: 1, minWidth: 150 },
    {
      name: "description",
      header: "Description",
      defaultFlex: 2,
      minWidth: 150,
    },
    { name: "notes", header: "Notes", defaultFlex: 2, minWidth: 150 },
  ];

  const gridStyle = { minHeight: 350, border: "none" };

  const onSelectionChange = useCallback(({ selected }) => {
    setSelected(selected);
    navigate(`/accounts/${selected}`);
    console.log(selected);
  }, []);

  const onSearchChange = ({ target: { value } }) => {
    setSearch(value);
    const lowerSearch = value.toLowerCase();
    const filteredListItems = data.accounts.filter((acct) =>
      acct.name.toLowerCase().includes(lowerSearch)
    );
    setAccounts(filteredListItems);
  };

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong...</p>;

  console.log(data);

  return (
    <div className="w-full flex flex-col justify-center items-start">
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
              <span className="font-bold">Total Accounts: </span>
              {accounts.length}
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
              dataSource={accounts}
              className="test"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Accounts;
