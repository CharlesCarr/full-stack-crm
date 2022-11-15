import AddProspectModal from "../components/prospects/AddProspectModal";
import Prospects from "../components/prospects/Prospects";

const ProspectsPage = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-start items-center pt-12 px-20">
      <div className="w-full flex items-center justify-between mb-2">
        <h1 className="text-4xl w-1/2">Prospects</h1>
        <AddProspectModal />
      </div>

      <Prospects />
    </div>
  );
};

export default ProspectsPage;
