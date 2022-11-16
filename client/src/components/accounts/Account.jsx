import React from "react";

const Account = ({ data }) => {
  return (
    <div className="w-1/2 h-2/3 shadow-3xl rounded-2xl flex flex-col items-center justify-center px-6">
      <div className="flex w-full h-1/3 border-b-2 border-black justify-between items-end pb-3">
        <div>
          <h1 className="text-2xl font-bold mb-2 border-b-2 border-black">{data.account.name}</h1>
          <p className="font-bold mb-1 ml-1">Industry:{" "}<span className="font-light">{data.account.industry}</span></p>
          <p className="font-bold ml-1">Employee Count:{" "}<span className="font-light">{data.account.size}</span></p>
        </div>
        {/* TO DO: add icons for account stage and edit account btn */}
        {/* <div className="flex justify-end items-start">
          <p>B</p>
          <p>E</p>
        </div> */}
      </div>

      <div className="h-1/3 w-full border-b-2 border-black pt-1">
        <p className="font-bold text-lg h-8">Description</p>
        <p className="font-light text-sm border h-20 p-2 rounded-xl">{data.account.description}</p>
      </div>

      <div className="h-1/3 w-full pt-1">
        <p className="font-bold text-lg h-8">Notes</p>
        <p className="font-light text-sm border h-20 p-2 rounded-xl">{data.account.notes}</p>
      </div>
    </div>
  );
};

export default Account;
