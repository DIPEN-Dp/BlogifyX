import React, { useState } from "react";
import authservice from "../Appwrite/auth_services";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import Button from "./Button";
import Logo from "./Logo";
import Input from "./Input";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();

  const signup = async (data) => {
    setError("");
    try {
      const userData = await authservice.createAccount(data.email, data.password, data.fullname);
      if (userData) {
        const currentUser = await authservice.getCurrentUser();
        if (currentUser) {
          dispatch(login({userData: currentUser}));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-[75vh] px-4">
      <div className="w-full max-w-md glass rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="mb-6 flex justify-center">
          <span className="inline-block">
            <Logo width="100%" />
          </span>
        </div>

        <h2 className="text-center text-2xl font-bold leading-tight text-white mb-2">
          Create Account
        </h2>

        <p className="text-center text-sm text-slate-400 mb-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-purple-400 hover:text-purple-300 transition-colors duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>

        {error && (
          <div className="bg-red-500/15 border border-red-500/30 text-red-400 text-sm py-3 px-4 rounded-xl mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(signup)} className="space-y-5">
          <div>
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              {...register("fullname", {
                required: "Full name is required",
              })}
            />
            {errors.fullname && (
              <p className="text-red-400 text-xs mt-1 pl-1">{errors.fullname.message}</p>
            )}
          </div>

          <div>
            <Input
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) =>
                    /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/m.test(
                      value
                    ) || "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1 pl-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Input
              type="password"
              label="Password"
              placeholder="Create your password"
              {...register("password", {
                required: "Password is required",
                validate: {
                  matchPattern: (value) =>
                    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/m.test(
                      value
                    ) ||
                    "Password must be 8-16 characters and include uppercase, lowercase, number, and special character",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1 pl-1">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full py-3 mt-6">
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;