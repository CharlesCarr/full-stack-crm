import React from "react";
import AddAccountModal from "../components/AddAccountModal";
// import AddProjectModal from "../components/AddProjectModal";
import Accounts from "../components/Accounts";
// import Projects from "../components/Projects";

const Home = () => {
  return (
    <>
      <div className="w-full flex justify-center items-center">
        <AddAccountModal />
        {/* <AddProjectModal /> */}
      </div>

      {/* <Projects /> */}
      <Accounts />
    </>
  );
};

export default Home;
