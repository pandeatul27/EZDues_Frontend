import { useState, useEffect } from "react";
import { Search, CheckCheck } from "lucide-react";
// import images from "@/constants/images";
import { Switch } from "@/components/ui/switch";

const Clear = () => {
  return <div className="md:text-[16px] text-[10px]">All Clear</div>;
};

const Pending = () => {
  return (
    <div className="md:text-[16px] text-[10px] text-[#ff5c00]">
      Dues Pending
    </div>
  );
};

const NoDuesRequests = () => {
  const [searchStudent, setSearchStudent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(5);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [autoApprove, setAutoApprove] = useState(false);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchStudent(value);
    setCurrentPage(1);
    const results = requestsData.filter(
      (student) =>
        student.name.toLowerCase().includes(value.toLowerCase()) ||
        student.studentRollNumber.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredStudents(results);
  };

  const handleAutoApprove = () => {
    // Handle auto approve API
    fetch(
      `http://localhost:5000/department/request-approval/set-auto-approve`,
      {
        method: "post",
        credentials: "include",
      }
    )
      .then((res) => {
        if (res.status == 200) {
          setAutoApprove(!autoApprove);
          console.log("auto approve toggled successfully");
          location.reload();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    // Handle auto approve API
    fetch(
      `http://localhost:5000/department/request-approval/get-auto-approve`,
      {
        method: "get",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAutoApprove(data.autoApprove);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleApprove = (e) => {
    fetch(
      `http://localhost:5000/department/request-approval/${e.target.getAttribute(
        "data-rollno"
      )}/${e.target.getAttribute("data-reqid")}`,
      { method: "put", credentials: "include" }
    )
      .then((res) => {
        if (res.status == 200) {
          location.reload();
        } else if (res.status == 405) {
          alert("All fines for this student are not cleared yet");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const completeData = async (data) => {
    try {
      for (let i = 0; i < data.length; i++) {
        const request = data[i];
        const studentDetail = await fetch(
          `http://localhost:5000/department/get-students/${encodeURIComponent(
            request.studentEmail
          )}`,
          { method: "GET", credentials: "include" }
        ).then((resStudent) => resStudent.json());

        data[i].name = studentDetail.name;
      }
      return new Promise((resolve) => {
        resolve(data);
      });
    } catch (e) {
      console.log(e);
      return new Promise((resolve, reject) => {
        reject();
      });
    }
  };
  const [requestsData, setRequestsData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/department/get-requests", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        completeData(data).then((completeData) => {
          console.log(completeData);
          setRequestsData(completeData);
        });
      });
  }, []);

  const studentsToDisplay = searchStudent ? filteredStudents : requestsData;
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = studentsToDisplay.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(studentsToDisplay.length / studentsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="flex flex-col justify-start h-full">
        <div className="w-full h-1/5 flex flex-row justify-between py-4 flex-wrap">
          <div className="w-full md:w-3/5 flex flex-row justify-center">
            <form className="flex items-center relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                className="rounded-[33px] p-3 pl-12 border border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                type="text"
                placeholder="Search..."
                value={searchStudent}
                onChange={handleSearch}
              />
            </form>
          </div>
          <div className="p-3 flex flex-row justify-evenly">
            <div className="md:text-[20px] text-xs mr-10 md:pt-2 ">
              Auto Approve
            </div>
            <div>
              <Switch
                className="bg-[#538ff8]"
                onClick={handleAutoApprove}
                checked={autoApprove}
              ></Switch>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4 mb-4">
          <ul className="flex">
            {pageNumbers.map((number) => (
              <li key={number}>
                <button
                  className={`mr-1 border px-1 py-1 ${
                    currentPage === number ? "text-red-500" : ""
                  }`}
                  onClick={() => setCurrentPage(number)}
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full pb-5 flex-col flex-wrap">
          {currentStudents.map((studentDetail, index) => (
            <div
              key={index}
              className="w-full p-2 px-5 h-auto md:min-h-[107px] rounded-[20px] flex flex-col lg:flex-row bg-[#fff] flex-wrap"
              style={{ marginBottom: "0.5rem" }}
            >
              <div className="flex flex-row justify-start items-center md:basis-1/3">
                <div
                  className="w-[54.874px] h-[54.874px] ml-2 mb-2 rounded-full border-2 flex justify-center items-center text-3xl font-regular text-gray-400 bg-gray-200"
                  alt="profile"
                >
                  {studentDetail.name[0].toUpperCase()}
                </div>
                <div className="ml-[30px] font-medium md:text-[20px] text-[12px]">
                  {studentDetail.name}
                  <br />
                  <div className="md:text-[20px] text-[12px] font-light">
                    {studentDetail.studentRollNumber}
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-start items-center md:basis-1/3 ">
                <div>{studentDetail.pendingDues ? <Pending /> : <Clear />}</div>
              </div>
              <div className="w-full md:w-auto flex flex-row justify-end items-center md:basis-1/3">
                <button
                  className="flex md:w-[264px] w-full md:h-[55px] h-2/3 px-[33px] py-2 md:py-5 my-5 md:my-1 justify-center items-center gap-[10px] flex-shrink-0 rounded-[10px] bg-[#2bc9ac] text-white"
                  data-rollno={studentDetail.studentRollNumber}
                  data-reqid={studentDetail.requestId}
                  onClick={handleApprove}
                >
                  <CheckCheck /> Approve No Dues
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NoDuesRequests;
