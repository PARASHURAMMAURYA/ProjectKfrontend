import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface User {
  id: number;   
  email: string;
   
}

interface AuthResponse {
  auth: boolean;
  user: User;
}

function SignUp() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };
  
  
    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/signup", {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
            headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();

        if (response.ok) {
            localStorage.setItem("user", JSON.stringify(result));
            toast.success("SignUp Successfully");
            clearForm();
            setTimeout(() => {
                navigate("/");
            }, 3000);
        } else {
            toast.error(result.message || "SignUp Failed");
        }
    };



 

  useEffect(() => {
    const auth = localStorage.getItem("user");
    console.log(auth);
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <h1 className="font-bold text-xl mt-40 mb-4 animate-bounce">SignUp 👇</h1>
      <div
        className={`flex justify-center items-center dark:bg-black ${
          !name && "animate-pulse"
        }`}
      >
        <div className="rounded-sm max-w-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form
            className="max-w-md p-4 sm:p-12.5 xl:p-17.5"
            onSubmit={handleSignUp}
          >
            <TextField
              id="filled-basic"
              required
              type="text"
              label="Name"
              variant="filled"
              fullWidth
              className="mb-4 border border-gray-300 rounded-md"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <TextField
              id="filled-basic"
              required
              type="email"
              label="Email"
              variant="filled"
              fullWidth
              className="mb-4 border border-gray-300 rounded-md"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <TextField
              id="filled-basic"
              required
              type="password"
              label="Password"
              variant="filled"
              fullWidth
              className="w-1/2 mb-4 border border-gray-300 rounded-md"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <div className="mt-2">
              <Button
                variant="outlined"
                fullWidth
                className="border-gray-300"
                type="submit"
              >
                SignUp
                <ToastContainer />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
