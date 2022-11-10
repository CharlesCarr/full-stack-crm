import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-1/6 shadow-inner flex flex-col items-center justify-between py-10">
      <div>
        <p className="font-bold text-4xl">CRM</p>
      </div>

      <div className="flex flex-col justify-between items-center h-1/2 font-bold">
        {/* Dashboard Icon */}
        <Link to="/">DASHBOARD</Link>
        {/* Accounts Icon */}
        <Link to="/accounts">ACCOUNTS</Link>
        {/* Prospects Icon */}
        <Link to="/prospects">PROSPECTS</Link>
        {/* Interactions Icon */}
        <Link to="/interactions">INTERACTIONS</Link>
      </div>

      <div>
        {/* Settings Icon or User Profile Icon */}
        <p>S</p>
      </div>
    </div>
  );
};

export default Header;
