import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const [state, setState] = useState("Sign Up");
  const [email, SetEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Account created successfully!");
        } else {
          if (data.message === 'E11000 duplicate key error collection: prescripto.users index: email_1 dup key: { email: "ayush88843@gmail.com" }')
          toast.error("User Already Exists!Login");
          else toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Logged in successfully!");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>Please {state === "Sign Up" ? "Sign Up" : "Login"} to book appointment</p>
        {state === "Sign Up" ? (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              required
            />
          </div>
        ) : (
          ""
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => {
              SetEmail(e.target.value);
            }}
            value={email}
            required
          />
        </div>
        <div className="w-full relative">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1 pr-10"
            type={showPassword ? "text" : "password"} // Toggle between text and password
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            required
          />
          {/* Eye Icon */}
          <span
            className="absolute top-9 right-3 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.177.64-.413 1.252-.71 1.818M15.228 16.858A9.956 9.956 0 0112 17c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.73-3.182m3.725 3.718A3 3 0 1115 12m6 7-6-7"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5C7.305 4.5 3.265 7.305 2.011 11.184c-.193.64-.193 1.292 0 1.932C3.265 16.695 7.305 19.5 12 19.5c4.695 0 8.735-2.805 9.989-6.684.193-.64.193-1.292 0-1.932C20.735 7.305 16.695 4.5 12 4.5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
                />
              </svg>
            )}
          </span>
        </div>
        <button type="submit" className="bg-primary text-white w-full py-2 rounded-md text-base">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span onClick={() => setState("Login")} className="text-primary underline cursor-pointer">
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span onClick={() => setState("Sign Up")} className="text-primary underline cursor-pointer">
              Click Here
            </span>
            <p className="mt-5">Forgot Password? <span className="text-primary underline cursor-pointer" onClick={()=>navigate('/forgot-password')} >Click Here</span></p>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
