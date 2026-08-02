import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authservice from "./Appwrite/auth_services";
import { login, logout } from "../store/authSlice";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authservice
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen relative overflow-x-hidden" style={{ backgroundColor: '#0B0B0B', color: '#FFFFFF' }}>
      <div className="relative z-10 w-full flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pt-20 pb-12">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0B0B0B' }}>
      <div className="flex flex-col items-center gap-4">
        <div className="spinner-lime" />
        <p className="text-sm font-medium" style={{ color: '#6B7280' }}>Loading BlogifyX...</p>
      </div>
    </div>
  );
}

export default App;
