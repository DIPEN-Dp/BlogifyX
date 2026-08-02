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
import { AlertCircle, ArrowRight } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginUser = async (data) => {
    setError("");
    setLoading(true);
    try {
      const session = await authservice.login(data.email, data.password);
      if (session) {
        const UserData = await authservice.getCurrentUser();
        if (UserData) {
          dispatch(authLogin({ userData: UserData }));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center w-full px-4 py-16"
      style={{ minHeight: '80vh', backgroundColor: '#0B0B0B' }}
    >
      <div
        className="w-full max-w-md relative overflow-hidden fade-in"
        style={{
          backgroundColor: '#111111',
          border: '1px solid #2B2B2B',
          borderRadius: '28px',
          padding: '2.5rem',
        }}
      >
        {/* Subtle top glow line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2"
          style={{
            width: '60%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(200,255,46,0.4), transparent)',
          }}
        />

        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Logo width="130px" />
        </div>

        <h2
          className="text-center text-2xl font-black mb-2 tracking-tight"
          style={{ color: '#FFFFFF', letterSpacing: '-0.03em' }}
        >
          Welcome back
        </h2>
        <p className="text-center text-sm mb-8" style={{ color: '#6B7280' }}>
          Don&apos;t have an account?{' '}
          <Link
            to="/signup"
            className="font-medium transition-colors duration-150"
            style={{ color: '#C8FF2E' }}
          >
            Sign Up
          </Link>
        </p>

        {error && (
          <div
            className="flex items-start gap-3 text-sm py-3 px-4 rounded-2xl mb-6"
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              color: '#EF4444',
            }}
          >
            <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(loginUser)} className="space-y-5">
          <div>
            <Input
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              {...register("email", {
                required: true,
                validate: {
                  matchpattern: (value) =>
                    /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/m.test(value) ||
                    "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-xs mt-1.5 pl-1" style={{ color: '#EF4444' }}>
                {errors.email.message || "Email is required"}
              </p>
            )}
          </div>

          <div>
            <Input
              type="password"
              label="Password"
              placeholder="••••••••"
              {...register("password", {
                required: true,
                validate: {
                  matchpattern: (value) =>
                    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/m.test(value) ||
                    "Password must be 8-16 characters with uppercase, lowercase, number, and special character",
                },
              })}
            />
            {errors.password && (
              <p className="text-xs mt-1.5 pl-1" style={{ color: '#EF4444' }}>
                {errors.password.message || "Password is required"}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center py-3 mt-2"
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Signing in...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Sign In <ArrowRight size={14} />
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
