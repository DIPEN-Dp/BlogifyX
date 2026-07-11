import React from "react";
import authservice from "../../Appwrite/auth_services";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authservice.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button
      onClick={logoutHandler}
      className="px-4 py-1.5 rounded-xl text-sm font-semibold text-red-400 border border-red-500/30 hover:bg-red-500/10 hover:border-red-500/60 transition-all duration-200 cursor-pointer"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
