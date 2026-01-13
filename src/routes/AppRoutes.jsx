import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../components/Home";
import Services from "../components/Services";
import ServiceDetail from "../components/ServicesPage/ServiceDetail";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}> 
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:serviceId" element={<ServiceDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
