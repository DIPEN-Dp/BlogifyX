import React, { useState } from "react";
import authservice from "../Appwrite/auth_services";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { Button, Logo, Input } from "../components/index";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const { register, handleSubmit } = useForm();

  const signup = async (data) => {
    setError("");

    try {
      const userData = await authservice.createAccount(data);

      if (userData) {
        const currentUser = await authservice.getCurrentUser();

        if (currentUser) {
          dispatch(login(currentUser));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-lg rounded-xl border border-black bg-gray-100 p-10">
        
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-25">
            <Logo width="100%" />
          </span>
        </div>

        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create Account
        </h2>

        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>

        {error && (
          <p className="mt-4 text-center text-red-600">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(signup)} className="mt-6">
          
          <div className="space-y-5">

            <Input
              label="Full Name"
              placeholder="Enter your full name"
              {...register("fullname", {
                required: "Full name is required",
              })}
            />

            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) =>
                    /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm.test(
                      value
                    ) || "Please enter a valid email address",
                },
              })}
            />

            <Input
              type="password"
              label="Password"
              placeholder="Create your password"
              {...register("password", {
                required: "Password is required",
                validate: {
                  matchPattern: (value) =>
                    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm.test(
                      value
                    ) ||
                    "Password must be 8-16 characters and include uppercase, lowercase, number, and special character",
                },
              })}
            />

            <Button type="submit" className="w-full">
              Sign Up
            </Button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;