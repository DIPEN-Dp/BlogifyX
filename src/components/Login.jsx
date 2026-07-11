import React from "react";
import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import Logo from "./Logo";
import authservice from "../Appwrite/auth_services";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../../store/authSlice";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");

  const loginUser = async (data) => {
    setError("");
    try {
      const session = await authservice.login(data.email, data.password);
      if (session) {
        const UserData = await authservice.getCurrentUser();
        if (UserData) {
          dispatch(authLogin({userData: UserData}));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-[70vh] px-4">
      <div
        className="w-full max-w-md bg-white rounded-xl p-8 md:p-10 border border-neutral-black-200 shadow-sm relative overflow-hidden"
      >
        <div className="mb-6 flex justify-center">
          <span className="inline-block">
            <Logo width="100%" />
          </span>
        </div>
        
        <h2 className="text-center font-heading text-2xl font-bold leading-tight text-neutral-black-950 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-neutral-black-500 mb-8">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-brand-orange-500 hover:text-brand-orange-600 transition-colors duration-150 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm py-3 px-4 rounded-lg mb-6 text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(loginUser)} className="space-y-6">
          <Input
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            {...register("email", {
              required: true,
              validate: {
                matchpattern: (value) =>
                  /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/m.test(
                    value,
                  ) || "Please enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1 pl-1">
              {errors.email.message || "Email is required"}
            </p>
          )}

          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            {...register("password", {
              required: true,
              validate: {
                matchpattern: (value) =>
                  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/m.test(
                    value,
                  ) ||
                  "Password must be 8-16 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-400 text-xs mt-1 pl-1">
              {errors.password.message || "Password is required"}
            </p>
          )}

          <Button type="submit" className="w-full py-3 mt-4">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
