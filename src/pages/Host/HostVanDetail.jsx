import React, { Suspense } from "react";
import { NavLink, Link, Outlet, useLoaderData, defer, Await } from "react-router-dom";
import { getVan } from "../../api";
import { requireAuth } from "../../utils";

export async function loader({ params, request }) {
  await requireAuth(request);
  return defer({ currentVan: getVan(params.id) });
}

export default function HostVanDetail() {
  const dataPromise = useLoaderData();

  function renderVanElements(currentVan) {
    return (
      <>
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
      </>
    );
  }
  return (
    <>
      <section>
        <Link to=".." relative="path" className="back-button">
          &larr; <span>Back to all vans</span>
        </Link>
        <div className="host-van-detail-layout-container">
          <Suspense fallback={<h2>Loading Van...</h2>}>
            <Await resolve={dataPromise.currentVan}>{renderVanElements}</Await>
          </Suspense>
        </div>
      </section>
    </>
  );
}
