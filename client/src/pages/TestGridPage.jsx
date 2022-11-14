import { useQuery } from "@apollo/client";
import { Button, Spinner, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { GET_PROSPECTS } from "../queries/prospectQueries";
// import ProspectRow from "../prospects/ProspectRow";
// import AddProspectModal from "../prospects/AddProspectModal";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";

const TestGridPage = () => {
  const { loading, error, data } = useQuery(GET_PROSPECTS);
  const id = "636c31a79cecf41163872000";
  console.log(data);

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

  const testColumns = [
    { name: "id", header: "Id", defaultVisible: false, defaultWidth: 100 },
    { name: "name", header: "Name", defaultFlex: 1, minWidth: 150 },
    { name: "size", header: "Size", defaultFlex: 1, minWidth: 150 },
  ];

  const testData = [
    {
      id: "636c31a79cecf41163872000",
      name: "test",
      size: "test2",
      notes: 'test',
    },
    {
      id: "636c3d378bf7a349955e43de",
      name: "testTest",
      size: "testTest2",
      notes: 'test',
    },
  ];

  const gridStyle = { minHeight: 550, maxWidth: 1000 };

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong...</p>;

  return (
    // *** FOUND BUG - cannot have 'flex-col' prop on container!!
    <div className="w-full border flex  items-center justify-start">
      {/* {!loading && !error && accountProspects && ( */}
      <ReactDataGrid
        idProperty="id"
        gridStyle={gridStyle}
        columns={columns}
        dataSource={accountProspects}
      />
      {/* )} */}
    </div>
  );
};

export default TestGridPage;
