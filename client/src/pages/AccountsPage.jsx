import React from "react";
import AddAccountModal from "../components/AddAccountModal";
// import AddProjectModal from "../components/AddProjectModal";
import Accounts from "../components/Accounts";
// import Projects from "../components/Projects";

const AccountsPage = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-start items-center pt-20">
      <h1 className="font-bold text-4xl mb-8">Accounts Page</h1>
      <AddAccountModal />
      {/* <AddProjectModal /> */}
      {/* <Projects /> */}
      <Accounts />
    </div>
  );
};

export default AccountsPage;
