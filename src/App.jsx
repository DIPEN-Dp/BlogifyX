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
          dispatch(login({userData}));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen relative overflow-x-hidden bg-white text-neutral-black-800">
      {/* App layout */}
      <div className="relative z-10 w-full flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pt-24 pb-12">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-brand-orange-500 border-t-transparent animate-spin" />
        <p className="text-neutral-black-500 text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
}

export default App;
