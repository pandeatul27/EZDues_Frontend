// import React from 'react';
import { UserRound, BookUser, Mail, UserRoundCog } from "lucide-react";
// import { NavLink, createRoutesFromChildren } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import images from "@/constants/images";
import { Upload } from "lucide-react";
import { useEffect, useState } from "react";

const CreateStudentAdmin = () => {
  const [name, setName] = useState("");
  const [batch, setBatch] = useState("");
  const [email, setEmail] = useState("");
  const [branch, setBranch] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [role, setRole] = useState("BTech");
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (file) {
      handleUpload();
    }
  }, [file]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    // Check for CSV file
    if (selectedFile.type !== "text/csv") {
      setErrorMessage("Please upload a valid CSV file.");
      return;
    }

    // If the file is valid, update the state
    setFile(selectedFile);
  };
  const handleUpload = () => {
    console.log("uploading file", file);
    if (!file) {
      setErrorMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    fetch("http://localhost:5000/admin/bulk-registration", {
      method: "POST",
      body: formData,

      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to upload file.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("File uploaded successfully:", data);
        alert("Students Registered successfully");
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        alert("Error uploading file");
      });
  };

  const detailHandler = async () => {
    const studentData = {
      name: name,
      rollNumber: rollNumber,
      email: email,
      branch: branch,
      batch: parseInt(batch),
      role: role,
    };
    fetch("http://localhost:5000/admin/register-students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(studentData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Failed to register student for the ezdues platform "
          );
        }
        // Reset
        setName("");
        setRole("BTech");
        setBranch("");
        setBatch("");
        setEmail("");
        setRollNumber("");
        setErrorMessage("");
      })
      .catch((error) => {
        // Handle error
        setErrorMessage("Error creating student");
        console.error(error);
      });
  };
  return (
    <>
      <h1 className="text-3xl font-medium mb-8 text-blue-500">Add Student</h1>
      <div className="flex flex-col md:flex-row mb-8">
        <div className="flex items-center mb-4 md:mb-0 md:mr-8 w-full md:w-auto">
          <UserRound className="mr-2" size={30} style={{ strokeWidth: 1.7 }} />
          <input
            className="border-b-2 border-black border-opacity-50 px-3 py-2 focus:outline-none bg-transparent w-full"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex items-center w-full md:w-auto">
          <BookUser className="mr-2" size={30} style={{ strokeWidth: 1.7 }} />
          <input
            className="border-b-2 border-black border-opacity-50 px-3 py-2 focus:outline-none bg-transparent w-full"
            type="text"
            placeholder="Roll Number"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row mb-8">
        <div className="flex items-center mb-4 md:mb-0 md:mr-8 w-full md:w-auto">
          <Mail className="mr-2" size={30} style={{ strokeWidth: 1.7 }} />
          <input
            className="border-b-2 border-black border-opacity-50 px-3 py-2 focus:outline-none bg-transparent w-full"
            type="text"
            placeholder="Web-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex items-center mb-4 md:mb-0 md:mr-8 w-full md:w-auto">
          <UserRoundCog
            className="mr-2"
            size={30}
            style={{ strokeWidth: 1.7 }}
          />
          <input
            className="border-b-2 border-black border-opacity-50 px-3 py-2 focus:outline-none bg-transparent w-full"
            type="text"
            placeholder="Branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center mb-8 w-full md:w-1/2">
        <div className="flex items-center mb-4 md:mb-0 md:mr-8 w-full md:w-auto">
          <input
            className="border-b-2 border-black border-opacity-50 px-3 py-2 focus:outline-none bg-transparent w-full"
            type="number"
            placeholder="Batch"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center mb-8 w-full md:w-auto">
        <UserRoundCog className="mr-2" size={30} style={{ strokeWidth: 1.7 }} />
        <select
          className="border-none border-b-2 border-gray-300 px-3 py-2 focus:outline-none bg-transparent w-30"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="BTech" key="BTech">
            BTech
          </option>
          <option value="MTech" key="MTech">
            MTech
          </option>
          <option value="PhD" key="PhD">
            PhD
          </option>
        </select>
      </div>
      <div className="flex flex-col items-center mb-8 w-full md:w-auto">
        <h1 className="font-md text-xl mb-4">Upload Image</h1>
        <div className="bg-gray-300 p-4 rounded-md flex items-center space-x-4">
          <label htmlFor="upload" className="cursor-pointer">
            <img src={images.DropBox} className="w-16 h-16" alt="Upload" />
            <input
              type="file"
              id="upload"
              accept="image/*"
              className="hidden"
            />
          </label>
          <label
            htmlFor="upload"
            className="text-black font-md py-2 px-4 rounded cursor-pointer border border-gray-300"
          >
            Drop or Select File
          </label>
        </div>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <div className="flex justify-end mb-8">
        <Button
          className={`w-full md:w-auto w-249 h-74 px-12 py-3 text-14 md:text-14 font-md mr-2 md:mr-4 border border-solid bg-[#538ff8] text-white rounded-md flex items-center gap-2 hover:bg-[#535ff5] hover:text-white hover:border-[#538ff8]`}
          onClick={detailHandler}
        >
          + Add
        </Button>
      </div>

      <div className="hr-theme-slash-2 flex mb-8">
        <div className="hr-line w-full relative border-b-2 border-black"></div>
        <div className="hr-icon px-2 relative top-3 text-black-600">OR</div>
        <div className="hr-line w-full relative border-b-2 border-black"></div>
      </div>

      <div className="flex items-center justify-center mb-8 w-full md:w-auto">
        {/* File upload button */}
        <Button
          variant="ezDues"
          className="text-lg py-6 px-7 flex items-center gap-2 w-full md:w-auto"
        >
          <label
            htmlFor="bulk"
            className="flex w-full h-full justify-center items-center gap-5"
          >
            <input
              id="bulk"
              name="bulk"
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleFileChange}
            />
            <Upload className="w-6 h-6" />
            Bulk Upload
          </label>
        </Button>

        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </>
  );
};

export default CreateStudentAdmin;
