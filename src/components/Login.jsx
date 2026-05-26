import React from "react";
import { useState } from "react";
import { Button, Input, Logo } from "../components/index";
import authservice from "../Appwrite/auth_services";
import { data, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Login as authLogin, login } from "../../store/authSlice";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async () => {
    setError("");
    try {
      const session = await authservice.login(data);
      if (session) {
        const UserData = authservice.getCurrentUser();
      }
      if (UserData) {
        dispatch(authLogin(UserData));
        if(userData){
            dispatch(login(userData));
            navigate("/")
        }
      }
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-25">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-2xl font-bold">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                validate: {
                  matchpattern: (value) =>
                    /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm.test(
                      value,
                    ) || "Please enter a valid email address",
                },
              })}
            />
            <Input
              type="password"
              label="Password"
              placeholder="Enter your Password"
              {...register("password", {
                required: true,
                validate: {
                  matchpattern: (value) =>
                    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm.test(
                      value,
                    ) ||
                    "password must be 8-16 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character",
                },
              })}
            />
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
