import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { loginUser } from "../Redux/auuuthSlice";
import requestHandler from "../common/requestHandler";
import { login } from "../Redux/authSlice";

interface User {
  id: number; // or string, depending on your user ID type
  email: string;
  // Add other user fields as necessary
}

interface AuthResponse {
  auth: boolean;
  user: User;
}

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    let result: AuthResponse;

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      result = await response.json();
    } catch (error) {
      toast.error("Login failed. Please try again.", {});
      return;
    }

    console.log(result);

    if (result.auth) {
      toast.success("Login Successfully", {});
      setTimeout(() => {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", JSON.stringify(result.auth));
        navigate("/");
      }, 1000);
    } else {
      toast.error("Wrong Details", {});
    }
  };



// const handleLogin = (e:React.FormEvent)=>{
//   e.preventDefault();
//   dispatch(loginUser({email,password}));
// };



// const handleLogin = async (formData: any) => {
//   await requestHandler(dispatch, login, formData, null, null);
//   toast.success("Login Successfully", {});
//       setTimeout(() => {
//         navigate("/");
//       }, 1000);
// };



  useEffect(() => {
    const auth = localStorage.getItem("user");
    console.log(auth);
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
     
      <h1 className="font-bold text-xl mt-40 mb-4 animate-bounce">Login 👇</h1>
      <div
        className={`flex justify-center items-center dark:bg-black ${
          !email && "animate-pulse"
        }`}
      >
        <div className="rounded-sm max-w-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form
            className="max-w-md p-4 sm:p-12.5 xl:p-17.5"
            onSubmit={handleLogin}
          >
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
                Login
                <ToastContainer />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
