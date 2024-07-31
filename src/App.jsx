import React from "react";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Login, { loader as loginLoader, action as loginAction } from "./pages/Login";
import Vans, { loader as vansLoader } from "./pages/Vans/Vans";
import VanDetail, { loader as vanDetailLoader } from "./pages/Vans/VanDetail";
import Layout from "./components/Layout";
import Dashboard, { loader as dashboardLoader } from "./pages/Host/Dashboard";
import Income from "./pages/Host/Income";
import Reviews from "./pages/Host/Reviews";
import HostLayout from "./components/HostLayout";
import HostVans, { loader as hostVansLoader } from "./pages/Host/HostVans";
import HostVanDetail, { loader as hostVanDetailLoader } from "./pages/Host/HostVanDetail";
import HostVanInfo from "./components/HostVanInfo";
import HostVanPricing from "./components/HostVanPricing";
import HostVanPhoto from "./components/HostVanPhoto";
import NotFound from "./pages/NotFound";
import Error from "./components/Error";
import { requireAuth } from "./utils";
// localStorage.clear();

import "./server";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="vans" element={<Vans />} errorElement={<Error />} loader={vansLoader} />
      <Route path="login" element={<Login />} loader={loginLoader} action={loginAction} />
      <Route path="vans/:id" element={<VanDetail />} errorElement={<Error />} loader={vanDetailLoader} />

      <Route path="host" element={<HostLayout />}>
        <Route index element={<Dashboard />} loader={dashboardLoader} />
        <Route path="income" element={<Income />} loader={async ({ request }) => await requireAuth(request)} />
        <Route path="reviews" element={<Reviews />} loader={async ({ request }) => await requireAuth(request)} />
        <Route path="vans" element={<HostVans />} errorElement={<Error />} loader={hostVansLoader} />
        <Route path="vans/:id" element={<HostVanDetail />} errorElement={<Error />} loader={hostVanDetailLoader}>
          <Route index element={<HostVanInfo />} loader={async ({ request }) => await requireAuth(request)} />
          <Route path="pricing" element={<HostVanPricing />} loader={async ({ request }) => await requireAuth(request)} />
          <Route path="photos" element={<HostVanPhoto />} loader={async ({ request }) => await requireAuth(request)} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
