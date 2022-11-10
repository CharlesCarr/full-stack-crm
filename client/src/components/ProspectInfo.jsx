
import { FaEnvelope, FaIdBadge, FaPhone } from "react-icons/fa";

const ProspectInfo = ({ data }) => {
  return (
    <div className="w-full flex justify-between items-start pb-6 border-b-2 border-black">
      <div>
        <h1 className="font-bold text-2xl">{`${data.prospect.name} @ ${data.prospect.account.name}`}</h1>
        <p>{`${data.prospect.position} | ${data.prospect.dmLevel}`}</p>
      </div>

      <div className="flex flex-col items-center">
        <p className="font-bold">Contact Info</p>
        <p className="text-sm">{data.prospect.email}</p>
        <p className="text-sm">{data.prospect.phone}</p>
      </div>
    </div>
  );
};

export default ProspectInfo;
