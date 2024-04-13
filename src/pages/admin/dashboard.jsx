import { Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const InfoCard = ({ departmentName }) => {
  return (
    <div className="md:w-80 w-auto h-50 p-10 flex flex-col justify-center items-center bg-white rounded-3xl m-5 transition duration-300 ease-in-out transform hover:scale-105">
      <div className="flex flex-col items-center">
        <Landmark className="mb-4" size={40} style={{ strokeWidth: 1.3 }} />
        <h1
          className="text-lg font-normal text-center"
          style={{ color: "black" }}
        >
          {departmentName}
        </h1>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [departments, setDepartments] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try {
      fetch("http://localhost:5000/admin/get-departments", {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          setDepartments(data);
        });
    } catch (err) {
      console.error(err);
      alert("Error fetching departments. Please Try Again Later");
      return <>{"Error, Kindly try again later"}</>;
    }
  }, [loaded]);

  return (
    <div className="flex flex-wrap justify-end items-center">
      <NavLink to="/admin/add-department" className="mx-auto lg:mx-7">
        <Button variant="ezDues" className="text-lg py-6 px-7">
          + Add Department
        </Button>
      </NavLink>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 grid-flow-row-dense">
        {departments.map((department, index) => (
          <InfoCard key={index} departmentName={department.deptId} />
        ))}
        {/* 
        <InfoCard departmentName="Department Of Computer Science And Engineering" />
        <InfoCard departmentName="Department Of Electrical Engineering" />
        <InfoCard departmentName="Department Of Mechanical Engineering" />

        <InfoCard departmentName="Department Of Metallurgical Engineering" />
        <InfoCard departmentName="Department Of Mathematics and Computing" />
        <InfoCard departmentName="Department Of Computer Science And Engineering" />

        <InfoCard departmentName="Department Of Computer Science And Engineering" />
        <InfoCard departmentName="Department Of Computer Science And Engineering" />
        <InfoCard departmentName="Department Of Computer Science And Engineering" /> */}
      </div>
    </div>
  );
};

export default AdminDashboard;
