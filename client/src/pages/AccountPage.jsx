import { useQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { GET_ACCOUNT } from "../queries/accountQueries";

const AccountPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("id", id);

  const { loading, error, data } = useQuery(GET_ACCOUNT, { variables: { id } });

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong...</p>;

  return (
    <div className="w-full h-full flex flex-col justify-center items-center relative">
      {!loading && !error && (
        <>
          <button
            className="absolute left-8 top-8 border border-black px-6 py-2 rounded-lg"
            onClick={() => navigate("/accounts")}
          >
            Back
          </button>
          <h1>{`Account Name: ${data.account.name}`}</h1>
          <p>{`Account Industry: ${data.account.industry}`}</p>
          <p>{`Account Size: ${data.account.size}`}</p>
          <p>{`Account Description: ${data.account.description}`}</p>
          <p>{`Account Notes: ${data.account.notes}`}</p>
        </>
      )}
    </div>
  );
};

export default AccountPage;
