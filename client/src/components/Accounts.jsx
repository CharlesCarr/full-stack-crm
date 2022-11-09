import { useQuery } from "@apollo/client";
import AccountRow from "./AccountRow";
import { GET_ACCOUNTS } from "../queries/accountQueries";
import Spinner from "./Spinner";

const Clients = () => {
  const { loading, error, data } = useQuery(GET_ACCOUNTS);

  if (loading) return <Spinner />
  if (error) return <p>Something went wrong...</p>


  return (
    <div className="w-full flex justify-center items-center">
        { !loading && !error && (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.accounts.map(account => (
                        <AccountRow key={account.id} account={account} />
                    ))}
                </tbody>
            </table>
        )}
    </div>
  );
};

export default Clients;
