import React from "react";
import { Logo, logoutBtn, container } from "../index";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",       //URL slug for the home page
      active: true,
    },
    {
      name: "Login",
      slug: "/login",   //URL slug for the login page
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",   //URL slug for the signup page
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",  //URL slug for the all posts page  
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",   //URL slug for the add post page
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-gray-500">
      <nav className="flex">
        <div className="mr-4">
          <Link to="/">
            <Logo width="80px" />
          </Link>
        </div>
        <ul className="flex ml-auto">
          {navItems.map((item)=>
          item.active ? (
            <li key={item.name}>
              <button onClick={()=> navigate(item.slug)}
                className="inline-block px-6 py-2 duration-200 hover:bg-blue-200 rounded-full">
                    {item.name}
              </button>
            </li>
          ) : null
          )}
          {authStatus && (
            <li>
              <logoutBtn/>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
