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
    <button className="inline-block px-6 py-2 hover:bg-blue-200 duration-200 rounded-full ">
      Logout
    </button>
  );
}

export default LogoutBtn;
