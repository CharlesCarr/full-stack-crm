import React from "react";
import AddClientModal from "../components/AddClientModal";
import AddProjectModal from "../components/AddProjectModal";
import Clients from "../components/Clients";
import Projects from "../components/Projects";

const Home = () => {
  return (
    <>
      <div className="w-full flex justify-center items-center">
        <AddClientModal />
        <AddProjectModal />
      </div>

      <Projects />
      <Clients />
    </>
  );
};

export default Home;
