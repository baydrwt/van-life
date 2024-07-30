import React from "react";
import { Link, NavLink } from "react-router-dom";
import imageUrl from "../assets/profile.png";

export default function Header() {
  return (
    <>
      <nav className="navbar">
        <Link to="/">#VANLIFE</Link>
        <div className="menu">
          <NavLink className={({ isActive }) => (isActive ? "active" : null)} to="/host">
            Host
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? "active" : null)} to="/about">
            About
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? "active" : null)} to="/vans">
            Vans
          </NavLink>
          <Link to="login" className="login-link">
            <img src={imageUrl} width={30} className="login-icon" />
          </Link>
        </div>
      </nav>
    </>
  );
}
