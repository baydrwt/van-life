import React, { Suspense } from "react";
import { Link, useSearchParams, useLoaderData, defer, Await } from "react-router-dom";
import { getVans } from "../../api";

export function loader() {
  return defer({ vans: getVans() });
}

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");
  const dataPromise = useLoaderData();

  function renderVanElements(vans) {
    const displayedVans = typeFilter ? vans.filter((van) => van.type === typeFilter) : vans;

    const vanElements = displayedVans.map((van) => (
      <div key={van.id} className="van-tile">
        <Link to={`${van.id}`} state={{ search: `?${searchParams.toString()}`, type: typeFilter }} aria-label={`View details for ${van.name}, priced at $${van.price} per day`}>
          <img src={van.imageUrl} alt={`Image of ${van.name}`} />
          <div className="van-info">
            <h3>{van.name}</h3>
            <p>
              ${van.price}
              <span>/day</span>
            </p>
          </div>
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
        </Link>
      </div>
    ));
    return (
      <>
        <div className="filter">
          <button onClick={() => setSearchParams({ type: "simple" })} className={`van-type simple ${typeFilter === "simple" ? "selected" : ""}`}>
            SIMPLE
          </button>
          <button onClick={() => setSearchParams({ type: "luxury" })} className={`van-type luxury ${typeFilter === "luxury" ? "selected" : ""}`}>
            LUXURY
          </button>
          <button onClick={() => setSearchParams({ type: "rugged" })} className={`van-type rugged ${typeFilter === "rugged" ? "selected" : ""}`}>
            RUGGED
          </button>
          {typeFilter ? (
            <button onClick={() => setSearchParams({})} className="van-type clear-filters">
              Clear Filters
            </button>
          ) : null}
        </div>
        <div className="van-list">{vanElements}</div>
      </>
    );
  }

  return (
    <>
      <main className="main-vanlist-page">
        <h1>Explore our van options</h1>
        <Suspense fallback={<h2>Loading Vans...</h2>}>
          <Await resolve={dataPromise.vans}>{renderVanElements}</Await>
        </Suspense>
      </main>
    </>
  );
}
