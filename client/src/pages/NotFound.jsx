import { Link } from "react-router-dom";
import { AiFillWarning } from "react-icons/ai";

const NotFound = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center mt-10">
      <AiFillWarning className="w-20 h-20 text-red-600 mb-5" />
      <p>Sorry this page does not exist.</p>
      <Link to="/" className="border-2 border-black rounded py-2 px-6">Go Back</Link>
    </div>
  );
};

export default NotFound;
