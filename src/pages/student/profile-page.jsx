import { Link } from "react-router-dom";
import images from "@/constants/images";
import { CircleArrowRight, LogOut } from "lucide-react";
import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import FineModal from "@/components/student/FineModal";

//TODO: extend this to more branches
const Branch = {
  cs: "CSE",
  ee: "EEE",
  mm: "MME",
  ce: "CEE",
  me: "ME",
  cb: "CBE",
};
const StudentProfile = () => {
  const [fines, setFines] = useState([]);
  const { accounts, instance } = useMsal();

  const accessTokenRequest = {
    account: accounts[0],
  };
  useEffect(() => {
    instance.acquireTokenSilent(accessTokenRequest).then((res) => {
      fetch("http://localhost:5000/student/fines", {
        method: "GET",
        headers: { "X-EZDues-IDToken": res.idToken },
      })
        .then((res) => res.json())
        .then((data) => {
          setFines(data);
        });
    });
  }, []);
  const rollno = accounts[0]?.username.match(/(\d{4}[a-zA-Z]{2}\d{2})/)[0];
  const branch = rollno?.match(/[a-zA-Z]+/)[0];
  return (
    <>
      <nav>
        <div className="mx-auto px-5 sm:px-20">
          <div className="flex justify-between h-16">
            <Link to={"/"} className="flex-shrink-0 flex items-center">
              <img
                loading="lazy"
                src={images.logo}
                alt="logo"
                className="h-4"
              />
            </Link>
            <div className="flex items-center">
              <div className="gap-x-3 flex items-center">
                <Link
                  to="/student"
                  className="text-black px-3 py-2 rounded-md text-md font-medium hover:bg-gray-200"
                >
                  Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-wrap items-center lg:justify-center max-[768px]:justify-center w-screen bg-white text-black font-heading mt-10 gap-x-10">
        <div className="flex flex-col items-center rounded-[45px] px-20 py-20 lg:px-15 lg:py-20 text-[#6d718b] bg-[#f4f4f7]">
          <div className="mb-5 w-24 h-24 flex items-center justify-center rounded-full border-2 border-blue-500">
            <div className="bg-slate-500 text-slate-100 w-[calc(100%-13px)] h-[calc(100%-13px)] flex items-center justify-center rounded-full">
              <p className="text-5xl">
                {console.log(accounts[0])}
                {accounts[0]?.name[0]?.toUpperCase()}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-medium text-black text-lg md:text-xl lg:text-3xl">
              {accounts[0]?.name}
            </p>
            <p className="lg:text-[25px]">{rollno.toUpperCase()}</p>
            <p className="lg:text-[15px]">B.Tech {Branch[branch]}</p>
            <p className="text-[14px] text-[#253D91] my-5">
              {accounts[0]?.username}
            </p>
            <button
              onClick={() => instance.logoutRedirect()}
              className="flex justify-center mt-10 text-[15px] text-black"
            >
              <LogOut /> <p className="ml-2">Logout</p>
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="max-[426px]:mt-5 text-2xl lg:text-4xl font-medium text-[#253d91]">
            Fines
          </div>
          <div className="flex-col lg:w-[500px] lg:md:w-[666px] overflow-y-auto max-h-[500px] box-content pr-5">
            {fines.map((fine, index) => (
              <div
                key={index}
                className="rounded-2xl bg-[#F4F4F7] my-4 py-5 text-3xl"
              >
                <div className="grid grid-cols-5 content-center">
                  <div className="col-span-4 mx-12 items-center">
                    <p>{fine.departmentDeptId}</p>
                  </div>
                  <div className="col-span-4 mx-12 items-center text-[18px] text-slate-500">
                    <p>Rs {fine.amount}</p>
                  </div>
                  <div
                    className="flex items-center justify-self-center cursor-pointer"
                    onClick={() => {}}
                  >
                    <CircleArrowRight
                      size={50}
                      fill="#00000050"
                      stroke="#F4F4F7"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentProfile;
/* vi: set et sw=2: */
