import React from "react";
import { Outlet, Link, NavLink } from "react-router-dom";

export default function HostLayout() {
  const activeStyle = {
    fontWeight: "bolder",
    textDecoration: "underline",
    color: "#161616",
  };

  return (
    <>
      <nav className="host-nav">
        <NavLink style={({ isActive }) => (isActive ? activeStyle : null)} to="." end>
          Dashboard
        </NavLink>
        <NavLink style={({ isActive }) => (isActive ? activeStyle : null)} to="reviews">
          Reviews
        </NavLink>
        <NavLink style={({ isActive }) => (isActive ? activeStyle : null)} to="income">
          Income
        </NavLink>
        <NavLink style={({ isActive }) => (isActive ? activeStyle : null)} to="vans">
          Vans
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}
