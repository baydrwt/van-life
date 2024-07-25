import React from "react";
import { useOutletContext } from "react-router-dom";

export default function HostVanPricing() {
  const { currentVan } = useOutletContext();

  return (
    <>
      <p>${currentVan.price}/day</p>
    </>
  );
}
