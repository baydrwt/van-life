import React from "react";
import { useOutletContext } from "react-router-dom";

export default function HostVanDetail() {
  const { currentVan } = useOutletContext();

  return (
    <>
      <p>{currentVan.name}</p>
      <p>{currentVan.description}</p>
    </>
  );
}
