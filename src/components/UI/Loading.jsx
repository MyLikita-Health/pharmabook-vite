import React from "react";
import { Spinner } from "reactstrap";

export default function Loading({ size = "md" }) {
  return (
    <div className="d-flex bg-primary flex-direction-row align-items-center justify-content-center">
      <Spinner size={size} className="m-2" />
      Please wait...
    </div>
  );
}
