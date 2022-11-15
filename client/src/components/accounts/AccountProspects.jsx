import { useQuery } from "@apollo/client";
import { Spinner } from "flowbite-react";
import React, { useCallback, useEffect, useState } from "react";
import { GET_PROSPECTS } from "../../queries/prospectQueries";
import AddProspectModal from "../prospects/AddProspectModal";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import { useNavigate } from "react-router-dom";

const AccountProspects = ({ id }) => {
  const { loading, error, data } = useQuery(GET_PROSPECTS);
  console.log(data);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const [accountProspects, setAccountProspects] = useState(null);
  console.log(accountProspects);

  useEffect(() => {
    if (data) {
      setAccountProspects(getAccountProspects(id));
    }
  }, [data]);

  const getAccountProspects = (id) => {
    const filteredProspects = data.prospects.filter((prospect) => {
      return prospect.account.id === id;
    });
    console.log("filtered prospects", filteredProspects);
    return filteredProspects;
  };

  const columns = [
    { name: "id", header: "Id", defaultVisible: false, defaultWidth: 100 },
    { name: "name", header: "Name", defaultFlex: 1, minWidth: 100 },
    {
      name: "position",
      header: "Title",
      defaultFlex: 1,
      minWidth: 100,
    },
  ];

  const onSelectionChange = useCallback(({ selected }) => {
    setSelected(selected);
    navigate(`/prospects/${selected}`);
    console.log(selected);
  }, []);

  // const gridStyle = { minHeight: 150, maxWidth: 1000 };

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong...</p>;

  return (
    <div className="w-1/3 h-2/3 shadow-3xl rounded-2xl flex flex-col items-center justify-start pt-10">
      {!loading && !error && accountProspects && (
        <>
          <h1 className="font-bold mb-4 text-2xl">Prospects</h1>
          <AddProspectModal />
          {accountProspects.length > 0 ? (
            <div className="w-full flex justify-center items-center mt-5 px-6">
              <ReactDataGrid
                idProperty="id"
                selected={selected}
                onSelectionChange={onSelectionChange}
                // gridStyle={gridStyle}
                columns={columns}
                dataSource={accountProspects}
              />
            </div>
          ) : (
            <p className="text-sm font-light">No Prospects Added</p>
          )}
        </>
      )}
    </div>
  );
};

export default AccountProspects;
