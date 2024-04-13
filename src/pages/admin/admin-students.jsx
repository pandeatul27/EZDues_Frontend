import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import images from "@/constants/images";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const AdminStudents = () => {
  const [searchStudent, setSearchStudent] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [studentDetails, setStudentDetails] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try {
      fetch("http://localhost:5000/admin/get-students", {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          setLoaded(true);
          data.department = data.branch;
          delete data.branch;
          setStudentDetails(data);
          // console.log(finesData);
        });
    } catch (err) {
      console.error(err);
      alert("Error fetching data. Please Try Again Later");
      return <>{"ERROR! Please try again later"}</>;
    }
  }, [loaded]);

  const handleSearch = (event) => {
    event.preventDefault();
    const results = studentDetails.filter(
      (student) =>
        student.name.toLowerCase().includes(searchStudent.toLowerCase()) ||
        student.rollNumber
          .toLowerCase()
          .includes(searchStudent.toLowerCase()) ||
        student.branch.toLowerCase().includes(searchStudent.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleChange = (event) => {
    setSearchStudent(event.target.value);
    const searchTerm = event.target.value.toLowerCase();

    const results = studentDetails.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm) ||
        student.rollNumber.toLowerCase().includes(searchTerm) ||
        student.branch.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch(event);
    }
  };

  const detailHandler = (event) => {
    // To-Do: Fetch and view the details of fines using API
  };

  const sortedStudentNames =
    searchResults.length === 0
      ? studentDetails.map((student) => student.name).sort()
      : searchResults.map((student) => student.name);

  return (
    <>
      <div className="flex flex-col justify-start h-full">
        <div className="w-full flex flex-col md:flex-row justify-between items-center py-4">
          <div className="w-full md:w-3/5 flex flex-row justify-center mb-4 md:mb-0">
            <form
              onSubmit={handleSearch}
              className="flex items-center relative w-full"
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                className="rounded-[33px] p-3 pl-12 border border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                type="text"
                placeholder="Name, Roll No, Branch, ..."
                value={searchStudent}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
              />
            </form>
          </div>
          <NavLink
            to="/admin/add-student"
            className="w-full md:w-auto mx-auto lg:mx-0"
          >
            <Button
              variant="ezDues"
              className="w-full md:w-auto text-lg py-6 px-7"
            >
              + Register Students
            </Button>
          </NavLink>
        </div>
        <div className="w-full pb-5 flex-col flex-wrap">
          {sortedStudentNames.map((studentName, index) => {
            const studentDetail = studentDetails.find(
              (student) => student.name === studentName
            );
            return (
              <div
                key={index}
                className="w-full p-5 h-auto md:min-h-[107px] rounded-[20px] flex flex-col md:flex-row bg-[#fff] justify-center items-center text-center md:text-left md:justify-evenly flex-wrap mb-3"
              >
                <div
                  className="w-[54.874px] h-[54.874px] ml-0 md:ml-2 mb-2 rounded-full border-2  flex justify-center items-center text-3xl font-regular text-gray-400 bg-gray-200"
                  alt="profile"
                >
                  {studentDetail.name[0].toUpperCase()}
                </div>
                <div className="flex flex-row justify-start items-center basis-1/3">
                  <div className="md:ml-[30px] font-medium md:text-[20px] text-[12px]">
                    {studentDetail.name}
                    <br />
                    <div className="md:text-[20px] text-[12px] font-light">
                      {studentDetail.rollNumber}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-start text-center items-center text-[12px] lg:text-[20px] font-light basis-1/3">
                  <div className="px-2  md:mr-[27px]">{studentDetail.role}</div>
                  {/* <div className="mr-4 md:mr-[27px]">
                    {studentDetail.department}
                  </div> */}
                  <div className="px-2 md:mr-[27px]">{studentDetail.batch}</div>
                </div>
                <div className="flex flex-row justify-center items-center w-full md:w-[150px]">
                  <Button
                    variant="ezdues"
                    className={`${" border-[1px] border-[#538ff8] text-[#538ff8] hover:bg-[#538ff81f]"} w-auto h-3/5 mb-2 md:mb-0 flex-1 shrink text-[12px] md:text-[20px] font-light p-3`}
                    onClick={detailHandler}
                  >
                    Details
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AdminStudents;
