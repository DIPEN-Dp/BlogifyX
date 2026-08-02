import React from "react";
import authservice from "../../Appwrite/auth_services";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/authSlice";
import { LogOut } from "lucide-react";

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
      className="btn-secondary flex items-center gap-1.5 text-sm"
      style={{ padding: '0.45rem 1rem' }}
    >
      <LogOut size={14} />
      Logout
    </button>
  );
}

export default LogoutBtn;
