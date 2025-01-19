import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import axios from 'axios';
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);  // New state to track loading
  const {backendUrl} = useContext(AppContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);  // Disable the button when request starts

    try {
      const { data } = await axios.post(backendUrl + "/api/user/forgot-password", { email });
      toast.success("Reset password link sent to your email!");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);  // Re-enable the button after the request completes
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">Forgot Password</p>
        <p>Please enter your registered email to reset your password.</p>
        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <button 
          type="submit" 
          className="bg-primary text-white w-full py-2 rounded-md text-base" 
          disabled={loading} // Disable button when loading
        >
          {loading ? "Sending..." : "Send"}  {/* Change button text to indicate loading */}
        </button>
      </div>
    </form>
  );
};

export default ForgotPassword;
