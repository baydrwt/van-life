import { React } from "react";
import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  return (
    <>
      <h1>
        {error.status} {error.statusText} {error.message}
      </h1>
    </>
  );
}
