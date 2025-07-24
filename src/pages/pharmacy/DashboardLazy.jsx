import React, { Suspense } from "react";
// import DashboardView from "../pages/pharmacy/Dashboardiew"
const DashboardView = React.lazy(() => import("../pages/pharmacy/Dashboardiew"));

export default function DashboardLazy() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardView />
      </Suspense> 
    </div>
  );
}
     