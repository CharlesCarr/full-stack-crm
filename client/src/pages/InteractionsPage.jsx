import AddInteractionModal from "../components/interactions/AddInteractionModal";
import Interactions from "../components/interactions/Interactions";

const ProspectsPage = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-start items-center pt-20">
      <h1 className="font-bold text-4xl mb-8">Interactions Page</h1>
      <AddInteractionModal />
      <Interactions />
    </div>
  );
};

export default ProspectsPage;
