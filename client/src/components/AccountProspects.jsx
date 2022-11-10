import { useQuery } from "@apollo/client";
import { Spinner, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { GET_PROSPECTS } from "../queries/prospectQueries";
import AccountProspectRow from "./AccountProspectRow";

const AccountProspects = ({ id }) => {
  const { loading, error, data } = useQuery(GET_PROSPECTS);
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

  if (loading) return <Spinner />
  if (error) return <p>Something went wrong...</p>

  return (
    <div className="w-1/3 h-2/3 border-black border-2 flex flex-col items-center justify-start pt-10">
      {!loading && !error && accountProspects && (
        <>
          <h1 className="font-bold mb-4 text-2xl">Prospects</h1>
          <Table striped={true}>
                <Table.Head>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Title</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {accountProspects.map(prospect => (
                        <AccountProspectRow key={prospect.id} prospect={prospect} />
                    ))}
                </Table.Body>
            </Table>
        </>
      )}
    </div>
  );
};

export default AccountProspects;
