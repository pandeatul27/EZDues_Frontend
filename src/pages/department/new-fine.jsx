// import React from "react";
import {
  UserRound,
  BookUser,
  Mail,
  IndianRupee,
  Calendar,
  AlignJustify,
} from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import images from "@/constants/images";

const NewFine = () => {
  const navigator = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  let [name, setName] = useState(searchParams.get("name") || "");
  let [rollno, setRollno] = useState(searchParams.get("rollno") || "");
  let [mail, setMail] = useState(searchParams.get("mail") || "");

  const addFine = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    let data = Object.fromEntries(formData.entries());
    data.damageProof = "proof";
    data.amount = parseInt(data.amount);
    data.deadline = new Date(data.deadline).toISOString();
    delete data["name"];

    console.log(data);
    fetch("http://localhost:5000/department/add-fine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status == 201) {
        alert("Fine Added Successfully!");
        navigator("/department/");
      } else {
        alert("Failed to add fine");
      }
    });
  };

  return (
    <>
      <form onSubmit={addFine}>
        <h1 className="text-3xl font-medium mb-8 text-blue-500">Add Fine</h1>
        <div className="flex flex-col md:flex-row mb-8">
          <div className="flex items-center mb-4 md:mb-0 md:mr-8 w-full md:w-auto">
            <UserRound
              className="mr-2"
              size={30}
              style={{ strokeWidth: 1.7 }}
            />
            <input
              name="name"
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
              name="studentRollNumber"
              className="border-b-2 border-black border-opacity-50 px-3 py-2 focus:outline-none bg-transparent w-full"
              type="text"
              placeholder="Roll Number"
              value={rollno}
              onChange={(e) => setRollno(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center mb-8">
          <Mail className="mr-2" size={30} style={{ strokeWidth: 1.7 }} />
          <input
            name="studentEmail"
            className="border-b-2 border-black border-opacity-50 px-3 py-2 focus:outline-none bg-transparent w-full"
            type="text"
            placeholder="Web-mail"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
        </div>
        <div className="flex flex-col md:flex-row mb-8">
          <div className="flex items-center mb-4 md:mb-0 md:mr-8 w-full md:w-auto">
            <IndianRupee
              className="mr-2"
              size={30}
              style={{ strokeWidth: 1.7 }}
            />
            <input
              name="amount"
              className="border-b-2 border-black border-opacity-50 px-3 py-2 focus:outline-none bg-transparent w-full"
              type="text"
              placeholder="Amount"
            />
          </div>
          <div className="flex items-center w-full md:w-auto">
            <div className="text-slate-500 ml-5 mr-2">Deadline:</div>
            <Calendar className="mr-2" size={30} style={{ strokeWidth: 1.7 }} />
            <input
              name="deadline"
              className="border-b-2 border-black border-opacity-50 px-3 py-2 focus:outline-none bg-transparent w-full"
              type="date"
              placeholder="Due Date"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>
        <div className="flex items-center mb-8">
          <AlignJustify
            className="mr-2"
            size={30}
            style={{ strokeWidth: 1.7 }}
          />
          <input
            name="reason"
            className="border-b-2 border-black border-opacity-50 px-3 py-2 focus:outline-none bg-transparent w-full"
            type="text"
            placeholder="Reason"
          />
        </div>
        <div className="flex flex-col items-center mb-8 ">
          <h1 className="font-md text-xl mb-4">Attach the proof</h1>
          <div className="bg-gray-300 p-4 rounded-md flex items-center space-x-4">
            <label htmlFor="upload" className="cursor-pointer">
              <img src={images.DropBox} className="w-16 h-16" alt="Upload" />
              <input
                name="damageProof"
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
        <div className="flex justify-end mb-8">
          <Button
            variant="ezDues"
            className="text-lg py-6 px-7 flex items-center gap-2"
            type="submit"
          >
            + Add
          </Button>
        </div>
      </form>
    </>
  );
};

export default NewFine;
