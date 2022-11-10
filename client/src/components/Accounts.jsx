import { useQuery } from "@apollo/client";
import AccountRow from "./AccountRow";
import { GET_ACCOUNTS } from "../queries/accountQueries";
import Spinner from "./Spinner";
import { Table } from "flowbite-react";

const Clients = () => {
  const { loading, error, data } = useQuery(GET_ACCOUNTS);

  if (loading) return <Spinner />
  if (error) return <p>Something went wrong...</p>

  return (
    <div className="w-full flex justify-center items-center mt-10">
        { !loading && !error && (
            <Table striped={true}>
                <Table.Head>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Size</Table.HeadCell>
                        <Table.HeadCell>Industry</Table.HeadCell>
                        <Table.HeadCell>Description</Table.HeadCell>
                        <Table.HeadCell>Notes</Table.HeadCell>
                        <Table.HeadCell></Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {data.accounts.map(account => (
                        <AccountRow key={account.id} account={account} />
                    ))}
                </Table.Body>
            </Table>
        )}
    </div>
  );
};

export default Clients;
