import AddAccountModal from "../components/accounts/AddAccountModal";
import Accounts from "../components/accounts/Accounts";

const AccountsPage = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-start items-center pt-12 px-20">
      <div className="w-full flex items-center justify-between mb-2">
        <h1 className="font-bold text-4xl w-1/2 tracking-wide">Accounts</h1>
        <AddAccountModal />
      </div>

      <Accounts />
    </div>
  );
};

export default AccountsPage;
