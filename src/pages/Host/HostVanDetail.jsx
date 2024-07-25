import React from "react";
import { useParams, NavLink, Link, Outlet } from "react-router-dom";

export default function HostVanDetail() {
  const [currentVan, setCurrentVan] = React.useState(null);
  const { id } = useParams();

  React.useState(() => {
    async function getCurrentVan() {
      const res = await fetch(`/api/host/vans/${id}`);
      const data = await res.json();
      setCurrentVan(data.vans);
    }
    getCurrentVan();
  }, [id]);

  if (!currentVan) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <section>
        <Link to=".." relative="path" className="back-button">
          &larr; <span>Back to all vans</span>
        </Link>
        <div className="host-van-detail-layout-container">
          <div className="host-van-detail">
            <img src={currentVan.imageUrl} />
            <div className="host-van-detail-info-text">
              <i className={`van-type van-type-${currentVan.type}`}>{currentVan.type}</i>
              <h3>{currentVan.name}</h3>
              <h4>${currentVan.price}/day</h4>
            </div>
          </div>
          <nav className="host-van-detail-nav">
            <NavLink to={"."} className={({ isActive }) => (isActive ? "active" : null)} end>
              Details
            </NavLink>
            <NavLink to={"pricing"} className={({ isActive }) => (isActive ? "active" : null)}>
              Price
            </NavLink>
            <NavLink to={"photos"} className={({ isActive }) => (isActive ? "active" : null)}>
              Photos
            </NavLink>
          </nav>
          <Outlet context={{ currentVan }} />
        </div>
      </section>
    </>
  );
}
