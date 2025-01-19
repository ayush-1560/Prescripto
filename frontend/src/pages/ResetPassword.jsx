import React, { useContext, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../Context/AppContext";

const ResetPassword = () => {
  const { token } = useParams();
  const {backendUrl} = useContext(AppContext);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
  
    try {
      const { data } = await axios.post(backendUrl + "/api/user/reset-password", { token, newPassword: password });
      if (data.success) {
        toast.success("Password reset successful! Please log in.");
        navigate("/login"); // Redirect to login after successful reset
      } else {
        toast.error(data.message || "Failed to reset password.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">Reset Password</p>
        <p>Please enter and confirm your new password</p>

        <div className="w-full">
          <p>New Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1 pr-10"
            type={showPassword ? "text" : "password"} // Toggle password visibility
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="w-full relative">
          <p>Confirm Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1 pr-10"
            type={showPassword ? "text" : "password"} // Toggle password visibility
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {/* Eye Icon for toggling password visibility */}
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
          Reset Password
        </button>
      </div>
    </form>
  );
};

export default ResetPassword;
