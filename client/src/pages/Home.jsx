import React from "react";
import AddClientModal from "../components/AddClientModal";
import Clients from "../components/Clients";
import Projects from "../components/Projects";

const Home = () => {
  return (
    <>
      <AddClientModal />
      <Projects />
      <Clients />
    </>
  );
};

export default Home;
