import { useState } from "react";
import "./home.css";
import { Filter } from "lucide-react";
import StudentCard from "@/components/student/card.jsx";
import StudentNavbar from "@/components/student/navbar";
import { Button } from "@/components/ui/button";
import Form from "react-bootstrap/Form";
import { Search } from "lucide-react";

const StudentHome = () => {
  const studentData = [
    { dept: "Hostel", status: "Initiate Request" },
    { dept: "Department of CSE", status: "Initiate Request" },
    { dept: "Department of EEE", status: "Initiate Request" },
    { dept: "Department of MME", status: "Initiate Request" },
    { dept: "Library", status: "Initiate Request" },
    { dept: "Student Gymkhana", status: "Initiate Request" },
    { dept: "Sports", status: "Initiate Request" },
    { dept: "Academic section", status: "Initiate Request" },
    { dept: "Civil Workshop", status: "Initiate Request" },
    { dept: "Electrical Workshop", status: "Initiate Request" },
    { dept: "Mechanical Workshop", status: "Initiate Request" },
    { dept: "Admin section", status: "Initiate Request" },
    { dept: "Accounts Section", status: "Initiate Request" },
    { dept: "Computer Centre", status: "Initiate Request" },
    { dept: "TPC", status: "Initiate Request" },
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const handleFilterClick = (status) => {
    if (status === filterStatus) {
      setFilterStatus("All");
    } else {
      setFilterStatus(status);
    }
  };

  const filteredStudentData = studentData.filter((student) => {
    const matchesSearch = student.dept
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    if (filterStatus === "All") {
      return matchesSearch;
    } else {
      return student.status === filterStatus && matchesSearch;
    }
  });

  return (
    <div className="pb-10 pt-5 px-[5%] bg-[#fafafc] min-h-[100vh]">
      <StudentNavbar />
      <div className="search-panel">
        <div className="flex flex-wrap justify-start items-center">
          <Form className="flex">
            <div className="search-box shadow-md">
              <div className="search-icon">
                <Search size={25} color="#A7AABD" />
              </div>
              <Form.Control
                type="search"
                placeholder="Search....."
                className="me-2 search-inp"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </Form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 grid-flow-row-dense mt-5">
          {filteredStudentData.map((student, index) => (
            <StudentCard
              key={index}
              dept={student.dept}
              status={student.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
