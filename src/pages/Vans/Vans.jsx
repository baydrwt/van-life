import React from "react";
import { Link } from "react-router-dom";

export default function Vans() {
  const [filters, setFilters] = React.useState([]);
  const [vans, setVans] = React.useState([]);

  React.useEffect(() => {
    async function getVans() {
      const res = await fetch("/api/vans");
      const data = await res.json();
      setVans(data.vans);
    }
    getVans();
  }, []);

  function toggleFilter(value) {
    setFilters((prevFilters) => (prevFilters.includes(value) ? prevFilters.filter((filter) => filter !== value) : [...prevFilters, value]));
  }

  const vanElements = vans.map((van) => (
    <div key={van.id} className="van-tile">
      <Link to={`/vans/${van.id}`} aria-label={`View details for ${van.name}, priced at $${van.price} per day`}>
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
      <main className="main-vanlist-page">
        <h1>Explore our van options</h1>
        <div className="filter">
          <div className="filter-option">
            <div className="simple">
              <input type="checkbox" name="simple" value="simple" id="simple" checked={filters.includes("simple")} onChange={(e) => toggleFilter(e.target.value)} />
              <label htmlFor="simple">Simple</label>
            </div>
            <div className="luxury">
              <input type="checkbox" name="luxury" value="luxury" id="luxury" checked={filters.includes("luxury")} onChange={(e) => toggleFilter(e.target.value)} />
              <label htmlFor="luxury">Luxury</label>
            </div>
            <div className="rugged">
              <input type="checkbox" name="rugged" value="rugged" id="rugged" checked={filters.includes("rugged")} onChange={(e) => toggleFilter(e.target.value)} />
              <label htmlFor="rugged">Rugged</label>
            </div>
          </div>
          <a href="" onClick={() => setFilters({ value: "", isChoose: false })}>
            Clear Filter
          </a>
        </div>
        <div className="van-list">{vanElements}</div>
      </main>
    </>
  );
}
