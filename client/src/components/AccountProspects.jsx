import { useQuery } from "@apollo/client";
import { Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { GET_PROSPECTS } from "../queries/prospectQueries";

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
    <div className="w-1/3 h-2/3 border-black border-2 flex flex-col items-center justify-center">
      {!loading && !error && accountProspects && (
        <>
          <h1>Prospects</h1>
          {accountProspects.map((prospect) => (<p key={prospect.id}>{prospect.name}</p>))}
        </>
      )}
    </div>
  );
};

export default AccountProspects;
