import AddProspectModal from "../components/prospects/AddProspectModal";
import Prospects from "../components/prospects/Prospects";

const ProspectsPage = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-start items-center pt-20">
      <h1 className="font-bold text-4xl mb-8">Prospects Page</h1>
      <AddProspectModal />
      <Prospects />
    </div>
  );
};

export default ProspectsPage;
