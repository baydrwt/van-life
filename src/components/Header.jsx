import React from "react";
import { Link, NavLink } from "react-router-dom";

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
        </div>
      </nav>
    </>
  );
}
