import { useQuery } from "@apollo/client";
import { Spinner } from "flowbite-react";
import { useParams, useNavigate } from "react-router-dom";
import Account from "../components/accounts/Account";
import AccountProspects from "../components/accounts/AccountProspects";
import { GET_ACCOUNT } from "../queries/accountQueries";

const AccountPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("id", id);

  const { loading, error, data } = useQuery(GET_ACCOUNT, { variables: { id } });
  console.log(data);

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong...</p>;

  return (
    <div className="w-full h-full flex justify-around items-center relative px-12">
      {!loading && !error && (
        <>
          <button
            className="absolute left-8 top-8 border border-black px-6 py-2 rounded-lg"
            onClick={() => navigate("/accounts")}
          >
            Back
          </button>

          <Account data={data} />

          <AccountProspects id={id} />
        </>
      )}
    </div>
  );
};

export default AccountPage;
