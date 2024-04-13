import "./navbar.css";
import { Link } from "react-router-dom";
import { images } from "@/constants";
import { useMsal } from "@azure/msal-react";

const StudentNavbar = () => {
  const { accounts } = useMsal();
  return (
    <nav className="flex justify-between sticky mb-10">
      <Link to={"/"} className="flex-shrink-0 flex items-center">
        <img loading="lazy" src={images.logo} alt="logo" className="h-5" />
      </Link>
      <Link
        to={"/student/profile"}
        className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-blue-200 bg-slate-500"
      >
        <p className="text-3xl text-slate-300">
          {accounts[0]?.name[0]?.toUpperCase()}
        </p>
      </Link>
    </nav>
  );
};

export default StudentNavbar;
