import AddInteractionModal from "../components/interactions/AddInteractionModal";
import Interactions from "../components/interactions/Interactions";

const ProspectsPage = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-start items-center pt-12 px-20">
      <div className="w-full flex items-center justify-between mb-2">
        <h1 className="text-4xl w-1/2">Interactions</h1>
        <AddInteractionModal />
      </div>

      <Interactions />
    </div>
  );
};

export default ProspectsPage;
