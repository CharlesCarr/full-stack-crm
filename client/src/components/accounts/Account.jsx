import React from "react";

const Account = ({ data }) => {
  return (
    <div className="w-1/3 h-2/3 border-black border-2 flex flex-col items-center justify-center">
      <h1>{`Account Name: ${data.account.name}`}</h1>
      <p>{`Account Industry: ${data.account.industry}`}</p>
      <p>{`Account Size: ${data.account.size}`}</p>
      <p>{`Account Description: ${data.account.description}`}</p>
      <p>{`Account Notes: ${data.account.notes}`}</p>
    </div>
  );
};

export default Account;
