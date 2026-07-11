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
    <div className="min-h-screen relative overflow-x-hidden" style={{background: "linear-gradient(135deg, #0a0a0f 0%, #0f0a1e 40%, #0a0f1e 100%)"}}>
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="blob-1 absolute top-[-20%] left-[-10%] w-96 h-96 rounded-full opacity-20"
          style={{background: "radial-gradient(circle, #8B5CF6, transparent 70%)"}} />
        <div className="blob-2 absolute top-[40%] right-[-10%] w-80 h-80 rounded-full opacity-15"
          style={{background: "radial-gradient(circle, #3B82F6, transparent 70%)"}} />
        <div className="blob-3 absolute bottom-[-10%] left-[30%] w-72 h-72 rounded-full opacity-10"
          style={{background: "radial-gradient(circle, #6366F1, transparent 70%)"}} />
      </div>

      {/* App layout */}
      <div className="relative z-10 w-full flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pt-20">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center" style={{background: "#0a0a0f"}}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
        <p className="text-slate-400 text-sm">Loading...</p>
      </div>
    </div>
  );
}

export default App;
