import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav>
        <Link to="/">#VANLIFE</Link>
        <div className="menu">
          <Link to="/about">About</Link>
          <Link to="/vans">Vans</Link>
        </div>
      </nav>
    </>
  );
}
