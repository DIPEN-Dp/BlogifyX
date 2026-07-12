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
      className="px-4 py-1.5 rounded-lg text-sm font-semibold text-neutral-black-800 border border-neutral-black-200 hover:text-brand-orange-600 hover:border-brand-orange-500 hover:bg-brand-orange-50/20 transition-all duration-150 cursor-pointer"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
